import Order from '@models/order';
import { IOrder } from '@interfaces/models';
import { v4 as uuid } from 'uuid';
import { IOrderDTO } from '@interfaces/DTO';

export const get = async (): Promise<IOrder[]> => {
   return await Order.find({}, 'number status customer items')
      .populate('customer', 'name')
      .populate('items.product', 'title');
}

export const create = async ({ customerId, items }: IOrderDTO): Promise<void> => {
   var order = new Order({
      customer: customerId,
      number: uuid(),
      items: items
   });
   await order.save();
}