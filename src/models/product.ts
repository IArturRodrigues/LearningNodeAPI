import mongoose from "mongoose";
import { IProduct } from "@interfaces/models";

const schema = new mongoose.Schema<IProduct>({
   // _id gerado automaticamente
   title: {
      type: String,
      required: true,
      trim: true
   },
   description: {
      type: String,
      required: true,
      trim: true
   },
   slug: {
      type: String,
      required: [true, 'O slug e obrigatorio'],
      trim: true,
      index: true,
      unique: true
   },
   price: {
      type: Number,
      required: true
   },
   active: {
      type: Boolean,
      required: true,
      default: true
   },
   tags: [{
      type: String,
      required: true,
   }],
   image: {
      type: String,
      required: true,
      trim: true
   }
});

const Product = mongoose.model<IProduct>('Product', schema);

export default Product;