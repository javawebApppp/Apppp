const mongoose = require('mongoose');
const Core = require('./core');
const Task = require('./task');

const uri = "mongodb+srv://jungtaekwon1019:chtw2001@taekwon.yl7ee71.mongodb.net/?retryWrites=true&w=majority";

// 몽구스 연결 함수
const connect = () => {
  // if not for deployment, debugging on
  //mongoose.set('debug', true); // verbose...

  return new Promise((resolve, reject) => {
    mongoose.connect(uri, {
      dbName: 'nodejs',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // useCreateIndex는 더이상 지원하지 않음.
    })
    .then(() => {
      console.log('MongoDB connection successful');
      resolve();
    })
    .catch((error) => {
      console.log('MongoDB connection error', error);
      reject(error);
    });
  });
};
connect()
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect(); // 연결 재시도
});

module.exports = {
  connect,
  Core,
  Task,
}