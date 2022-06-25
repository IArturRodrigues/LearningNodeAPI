import { NextFunction, Response } from "express";
import { ICustomRequest } from "@interfaces/express";
import { IOrder } from "@interfaces/models";
import * as repository from '@repositories/orderRepository';
import * as authService from '@services/authService';
import { ICustomerDTO } from "@interfaces/DTO";

export const get = async (req: ICustomRequest<any, IOrder>, res: Response, next: NextFunction): Promise<void> => {
   try {
      const orders = await repository.get();
      res.status(200).send(orders);
   } catch (err) {
      error(res, err)
   }
}

export const create = async (req: ICustomRequest<any, IOrder>, res: Response, next: NextFunction): Promise<void> => {
   try {
      // recuperar token
      const token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decodificar token
      const data = authService.decodeToken(token as string) as ICustomerDTO;

      await repository.create({
         customerId: data.id,
         items: req.body.items
      });
      res.status(201).send({ message: 'Pedido cadastrado com sucesso' });
   } catch (err) {
      error(res, err);
   }
}

const error = (res: Response, err: any): void => {
   res.status(500).send({
      message: 'Falha ao processar sua requisicao',
      data: err
   });
}