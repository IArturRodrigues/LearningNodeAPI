import express from 'express';
import * as controller from '@controller/customerController';
import * as authService from "@services/authService";

const customer = express.Router();

customer.post('/', controller.post);
customer.post('/authenticate', controller.authenticate);
customer.post('/refresh-token', authService.authorize, controller.refreshToken);

export default customer;
