// const express = require('express');
// const path = require('path');
// const port = 8080;

import express from 'express';
import configViewEngine from './congfigs/ViewEngine';
import initWebRoute from './route/web';
// import connection from './congfigs/connectDB;'
import initAPIRoute from './route/api';

require('dotenv').config();
var morgan = require('morgan');


const app = express();
const port = process.env.PORT;

app.use(morgan('combined'));


// hỗ trợ xử lý lấy data từ phía client lên server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine
configViewEngine(app);

// init web Route
initWebRoute(app);

// init api route
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});