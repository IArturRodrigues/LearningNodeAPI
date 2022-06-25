import { Document } from 'mongoose';

export interface IProduct extends Document {
   title: string;
   slug: string;
   description: string;
   price: number;
   active: boolean;
   tags: string[];
   image: string;
}

export interface ICustomer extends Document {
   name: string;
   email: string;
   password: string;
   roles: string[]
   token?: string;
}

export interface IOrder extends Document {
   customerId: string;
   number: string;
   items: IItems[];
   createDate?: Date;
   status?: string;
   token?: string;
}

export interface IItems {
   quantity: number;
   price: number;
   product: IProduct;
}