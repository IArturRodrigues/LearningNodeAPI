import mongoose from "mongoose";
import { ICustomer } from "@interfaces/models";

const schema = new mongoose.Schema<ICustomer>({
   // _id gerado automaticamente
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   roles: [{
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
   }]
});

const Customer = mongoose.model<ICustomer>('Customer', schema);

export default Customer;