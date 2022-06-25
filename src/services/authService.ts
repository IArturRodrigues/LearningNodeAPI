import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ICustomerDTO } from '@interfaces/DTO';

// as strings vazias seria o lugar pra colocar uma chave privada qeu somente o servidor tem

// funcao gera o token recebendo algum parametro para encriptografar, ex: email
export const generateToken = async (data: string | object | Buffer) => {
   return jwt.sign(data, 'aaa', { expiresIn: '1d' });
}

export const decodeToken = (token: string) => {
   return jwt.verify(token, 'aaa');
}

export const authorize = (req: Request, res: Response, nextFunction: NextFunction) => {
   var token = req.body.token || req.query.token || req.headers['x-access-token'];

   if(!token) {
      res.status(401).json({
         message: 'Acesso restrito'
      });
   } else {
      jwt.verify(token, 'aaa', (error: any, decoded: any) => {
         if(error) {
            res.status(401).json({
               message: 'Token invalido'
            });
         } else {
            nextFunction();
         }
      });
   }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
   var token = req.body.token || req.query.token || req.headers['x-access-token'];

   if(!token) {
      res.status(401).json({
         message: 'Token inválido'
      });
   } else {
      jwt.verify(token, 'aaa', (error: any, decoded: ICustomerDTO) => {
         if(decoded.roles.includes('admin')) {
            next();
         } else {
            res.status(401).json({
               message: 'Esta funcionalidade é retrita para administradores'
            })
         }
      });
   }
}