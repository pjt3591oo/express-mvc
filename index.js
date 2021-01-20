// .env를 process.env로 가져오기 위한
require('dotenv').config();

const createError = require('http-errors');

// 모듈 import
const express = require('express');
const mongoose =  require("mongoose");
const bodyParser =  require("body-parser");

const articleRouter = require('./article/routers/article')

const app = express();
const { port, mongoURI} = process.env

// mongodb connection
mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful WOW!!!!!!`))
.catch(err => console.log(`Error in DB connection ${err}`));

// middleware settup
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

// router
app.use('/article', articleRouter);

// 404 처리
app.use(function(req, res, next) {
  next(createError(404));
});

// 다음 미들웨어는 next(err)이 호출되면 해당 미들웨어의 콜백이 동작
// 에러 미들웨어는 err을 포함하여 4개의 인자를 전달받는 특수한 형태의 미들웨어
// 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({data: "", code: ""});
});

// server 실행
app.listen(port, () => {
  console.log(`Application is listening at port: ${port}`);
});