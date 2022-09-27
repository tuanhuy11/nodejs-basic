// const express = require('express');
// const path = require('path');
// const port = 8080;

import express from 'express';
import configViewEngine from './congfigs/ViewEngine';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

configViewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});