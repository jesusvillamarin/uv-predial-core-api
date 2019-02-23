import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/debts/', function(req, res) {
  res.status(200).send({
    statusCode: 200,
    body: {
      description: 'Ok',
      message: 'List of debts'
    }
  });
});

module.exports.handler = serverless(app);