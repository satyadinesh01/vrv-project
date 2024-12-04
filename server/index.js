
const express = require('express');
const cors = require('cors');
let app = express();

require('./db-connection');
const host = 'http://localhost';
const port = 3500;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '2MB' }));

var corsOptions = {
    "origin": `*`,
    "methods": "GET,PUT,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));

const employeeRouter = require('./router/employee-router');

app.use('/api/v1/employees', employeeRouter);

app.listen(port, () => {
    console.log(`server running at ${host}:${port}/api/v1/employees`);
});