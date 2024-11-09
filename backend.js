const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (url) {
    request(url).pipe(res);
  } else {
    res.status(400).send('URL parameter is missing');
  }
});

app.listen(3000, () => console.log('Proxy server is running on http://localhost:3000'));
