import Customer from '@models/customer';
import md5 from 'md5';
import { ICreateCustomerDTO, ICustomerDTO, IGetCustomerDTO } from '@interfaces/DTO';

export const create = async ({ name, email, password }: ICreateCustomerDTO) => {
   var customer = new Customer({
      name: name,
      email: email,
      password: md5(password)
   });
   await customer.save();
}

export const authenticate = async ({ email, password }: IGetCustomerDTO) => {
   return await Customer.findOne({
      email: email,
      password: md5(password)
   });
}

export const findById = async (id: string) => {
   return await Customer.findById(id);
}