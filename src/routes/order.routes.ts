import express from 'express';
import * as controller from '@controller/orderController';
import * as authService from '@services/authService';

const order = express.Router();

order.get('/', authService.authorize, controller.get);

order.post('/', authService.authorize, controller.create);

export default order;
