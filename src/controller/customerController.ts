import { Response, NextFunction } from 'express';
import { ICustomRequest } from '@interfaces/express';
import { ICustomer } from '@interfaces/models';
import * as repository from '@repositories/customerRepository';
import ValidationContract from '@validators/fluentValidator';
import mailtrapMailService from 'src/services/emailService';
import * as authService from '@services/authService';
import { ICustomerDTO } from '@interfaces/DTO';

export const post = async (req: ICustomRequest<any, ICustomer>, res: Response, next: NextFunction): Promise<void> => {
   let contract = new ValidationContract();
   
   contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos que 3 caracteres');
   contract.isEmail(req.body.email, 'E-mail invalido');
   contract.hasMinLen(req.body.password, 6, 'O nome deve conter pelo menos que 6 caracteres');

   if(!contract.isValid()) {
      res.status(400).send(contract.errors()).end();
      return;
   }

   try {
      await repository.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      });

      let emailService = new mailtrapMailService();
      emailService.sendMail({
            to: {
               name: req.body.name,
               email: req.body.email
            },
            from: {
               name: 'Equipe exemplo',
               email: 'exemplo@email.com'
            },
            subject: '',
            body: `Ola, <strong>${req.body.name}</strong>, seja bem vindo a Node Store!`
         });

      res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
   } catch (err) {
      error(res, err);
   }
}

export const authenticate = async (req: ICustomRequest<any, ICustomer>, res: Response, next: NextFunction): Promise<void> => {
   try {
      const customer = await repository.authenticate({ email: req.body.email, password: req.body.password });

      console.log(customer);

      if(!customer) {
         res.status(404).send({ message: 'Usuario ou senha invalidos' });
         return;
      }

      const token = await authService.generateToken({
         id: customer.id,
         email: customer.email,
         name: customer.name,
         roles: customer.roles
      });
      
      console.log(token);

      res.status(201).send({
         token: token,
         data: {
            name: req.body.name,
            email: req.body.email
         } 
      });
   } catch (err) {
      error(res, err);
   }
}

export const refreshToken = async (req: ICustomRequest<any, ICustomer>, res: Response, next: NextFunction): Promise<void> => {
   try {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = authService.decodeToken(token as string) as ICustomerDTO;
      
      const customer = await repository.findById(data.id);

      console.log(customer);

      if(!customer) {
         res.status(404).send({ message: 'Cliente não encontrado' });
         return;
      }

      const tokenData = await authService.generateToken({
         id: customer.id,
         email: customer.email,
         name: customer.name,
         roles: customer.roles
      });
      
      console.log(token);
      
      res.status(201).send({
         token: token,
         data: {
            name: req.body.name,
            email: req.body.email
         } 
      });
   } catch (err) {
      error(res, err);
   }
}

const error = (res: Response, err: any) => {
   res.status(500).send({
      message: 'customerController error',
      data: err.message || 'Alguma coisa deu errado'
   });
}