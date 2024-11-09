const fetch = require('node-fetch');

module.exports = async (req, res) => {
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
};
