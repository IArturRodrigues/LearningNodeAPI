import { IItems } from "./models";

export interface ICreateCustomerDTO {
   name: string;
   email: string;
   password: string;
} 

export interface ICustomerDTO {
   id: string;
   email: string;
   password: string;
   roles: string[];
}

export interface IGetCustomerDTO {
   email: string;
   password: string;
}

export interface IOrderDTO {
   customerId: string;
   items: IItems[]
}