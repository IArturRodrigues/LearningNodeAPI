import mongoose from "mongoose";
import { IOrder } from "@interfaces/models";

const schema = new mongoose.Schema<IOrder>({
   customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
   },
   number: {
      type: String,
      required: true
   },
   createDate: {
      type: Date,
      required: true,
      default: Date.now
   },
   status: {
      type: String,
      required: true,
      enum: ['created', 'done'],
      default: 'created'
   },
   items: [{
      quantity: {
         type: Number,
         required: true,
         default: 1
      },
      price: {
         type: Number,
         required: true
      },
      product: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product'
      }
   }]
   // customer: [{
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'Customer'
   // }],
});

const Order = mongoose.model<IOrder>('Order', schema);

export default Order;