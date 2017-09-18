process.environment = process.env.NODE_ENV || 'development'

// initialize express
const express = require('express');
const app     = express();
const port    = process.env.PORT || 3001;

// initialize BetterDoctor api module
const bdAPI   = require('./modules/better-doctor');
const userKey = '7ebf62f4ff0babbfda5853f6c6fc4292';
const api     = new bdAPI(userKey);

// serve static browser files
app.use(express.static('browser/build'));

app.get('/api/doctors', function (req, res) {
  if (!req.query.q) {
    return res.status(400).send('No search query provided');
  }

  const params = {
    name: req.query.q,
    limit: +req.query.limit || 15
  };

  api.findDoctor(params)
     .then(result => res.send(result.data))
     .catch(err => res.status(500).send(`Search Error: ${err}`));
})

app.listen(port, () => {
  console.log('listening on port', port);
})