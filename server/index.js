const chalk = require('chalk');
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { resolve } = require('path');

const devRouter = require('./router/dev');
const userRouter = require('./router/user');

// db setup
const dbRoute = process.env.MONGO_DB;
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// setup routes
app.use('/public', express.static('public'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/user', userRouter)
  .use('/dev', devRouter);

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
