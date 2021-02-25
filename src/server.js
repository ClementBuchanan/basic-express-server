'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const errors = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');


// app.use(express.json());
app.use(logger);


// === Routes ===

app.get('/hello', (req, res) => {
    console.log('name', req.query.name);
    res.status(200).res.send(`hello ${req.query.user}`);
  });

app.get('/person', validator, (req, res) => {
    res.status(200).json({
        name: req.query.name,
    })
})
app.use('*', notFound);
app.use(errors);

module.exports = {
    app: app,
    start: port => {
        app.listen(port, () => {
        console.log(`listening on PORT: ${port}`);
        });
    }
}