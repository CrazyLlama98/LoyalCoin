import connectMongo from './utils/connectMongo';
import express, { json } from 'express';
import cors from 'cors';
import http from 'http';

import errorHandler from './middlewares/errorHandler';
import jwt from './middlewares/jwt';

import usersController from './users/usersController';
import awardsController from './awards/awardsController';
import productsController from './products/productsController';

connectMongo();

var app = express(http);

app.use(json());
app.use(cors());

// auth middleware
app.use('/api', jwt());

// api routes
app.use('/api/users', usersController);
app.use('/api/retailers/:retailerId/awards', awardsController);
app.use('/api/retailers/:retailerId/products', productsController);

app.use(errorHandler);

const port = process.env.HTTP_PORT || 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});