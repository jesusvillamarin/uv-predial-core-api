import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/debts/:ctc', function(req, res) {
    const ctc = req.params.ctc;

    res.status(200).send({
        statusCode: 200,
        body: {
            description: 'Ok',
            message: `Details of debt with CTC: ${ctc}`
        }
    });
});

module.exports.handler = serverless(app);