import express from 'express';

const index = express.Router();

index.get('/', (req, res, next) => {
   res.status(200).send({
      title: "API Store Node",
      version: "0.0.1"
   })
});

export default index;