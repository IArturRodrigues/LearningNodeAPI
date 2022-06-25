import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { dbConfig } from '@configs/database';

// rotas
import index from '@routes/index.routes';
import product from '@routes/product.routes';
import customer from '@routes/customer.routes';
import order from '@routes/order.routes';

// carregar os models
import '@models/product';
import '@models/customer';
import '@models/order';

const app = express();

app.use(bodyParser.json({
   limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, x-access-token');
   res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE, OPTIONS');
   next();
})

// conectar com o banco de dados
mongoose.connect(dbConfig.CONNECTION_STRING)
   .then(() => {
      console.log('connect sucessful');
   })
   .catch((err: Error) => {
      console.log('something went wrong', err);
   });

// carrega as rotas
app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);
app.use('/orders', order);

export default app;