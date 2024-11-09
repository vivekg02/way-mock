const express = require('express');
const fetch = require('node-fetch'); // Replace request with fetch
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        response.body.pipe(res);
      } else {
        res.status(400).send('Error fetching the URL');
      }
    } catch (error) {
      res.status(500).send('Error fetching the URL');
    }
  } else {
    res.status(400).send('URL parameter is missing');
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy server is running'));
