const chalk = require('chalk');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
const { resolve } = require('path');

app.use('/public', express.static('public'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/api', router);

// send index.html
app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/index.html'));
});

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error.');
  next();
});
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(chalk.magenta('Express server listening on port 3000'));
});
