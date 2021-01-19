// .env를 process.env로 가져오기 위한
require('dotenv').config();

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

// server 실행
app.listen(port, () => {
  console.log(`Application is listening at port: ${port}`);
});