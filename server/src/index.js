import connectMongo from './utils/connectMongo';
import express, { json } from 'express';
import http from 'http';

import errorHandler from './middlewares/errorHandler';
import jwt from './middlewares/jwt';

import usersController from './users/usersController';

connectMongo();

var app = express(http);

app.use(json());

// auth middleware
app.use('/api', jwt());

// api routes
app.use('/api/users', usersController);

app.use(errorHandler);

const port = process.env.HTTP_PORT || 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});