import { Request, Response, NextFunction } from 'express';

import { IProduct } from '@interfaces/models';
import { ICustomRequest, IRequest } from '@interfaces/express';
import * as repository from '@repositories/productRepository';

// import ValidationContract from '@validators/fluentValidator';
// import QueryString from 'qs';
// import mongoose from 'mongoose';

// Request<Params, ResBody, ReqBody, ReqQuery, Locals>
// Response<ResBody, Locals>

// interface IProductPut {
//    (req: Request<IProduct, any, any, QueryString.ParsedQs, Record<string, any>>,
//    res: Response,
//    next: NextFunction): Promise<void> | void;
// }

// interface ICustomRequest<P extends core.ParamsDictionary, B = any> extends Request {
//    params: P;
//    body: B;
// }

// interface IReq {
//    // aqui ficam os parametros passados na URL
//    id?: string;
//    slug?: string;
//    tag?: string;
//    // para satisfazer ParamsDictionary precisa colocar [key: string]: string;
//    [key: string]: string;
//    // o que significa: eu recebo um array do tipo string => []: string (string[])
//    // em que a chave eh outra string e nao um numero (como normalmente eh)
// }

// const Product = mongoose.model<IProduct>('Product');

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {                         // parametro de encontro, selecionar colunas para mostrar
      const products = await repository.get();
      res.status(200).send(products);
   } catch (err) {
      error(res, err);
   }
}

export const getBySlug = async (req: ICustomRequest<IRequest>, res: Response, next: NextFunction): Promise<void> => {
   try {         
      const product = await repository.getBySlug(req.params.slug);
      res.status(200).send(product);
   } catch (err) {
      error(res, err);
   }
}

export const getById = async (req: ICustomRequest<IRequest>, res: Response, next: NextFunction): Promise<void> => {
   try {
      const product = await repository.getById(req.params.id);
      res.status(200).send(product);
   } catch (err) {
      error(res, err);
   }
}

export const getByTag = async (req: ICustomRequest<IRequest>, res: Response, next: NextFunction): Promise<void> => {
   try {
      const product = await repository.getByTag(req.params.tag);
      res.status(200).send(product);
   } catch (err) {
      error(res, err);
   }
}

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   // desse jeito tem menos chances de ocorrer algum erro na hora de salvar
   // var product = new Product();
   // product.title = req.body.title;
   // product.slug = req.body.slug;
   // product.description = req.body.description;
   // product.price = req.body.price;
   // product.active = req.body.active;
   // product.tags = req.body.tags;

   // caso o banco de dados nao possua suas validacoes (deixando campos como requeridos), e preciso usar os validators
   // let contract = new (ValidationContract as any)(); // sem tipagem
   // let contract = new ValidationContract();
   // contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
   // contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos 3 caracteres');
   // contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');

   // // se os dados forem validos
   // if(!contract.isValid()) {
   //    res.status(400).send(contract.errors()).end();
   //    return;
   // }

   // res.status(201).send(req.body);

   try {
      await repository.create(req.body);
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
   } catch (err) {
      error(res, err);
   }
}

export const updateProductById = async (req: ICustomRequest<IRequest, IProduct>, res: Response, next: NextFunction) => {
   try {
      await repository.update(req.params.id, req.body);
      res.status(200).send({ message: 'Produto atualizado com sucesso' });
   } catch (err) {
      error(res, err);
   }
}

// const put: IProductPut = (req, res, next): void => {
//    const id = req.params.id;
//    res.status(200).send({
//       id: id,
//       item: req.body
//    });
// }

export const del = async (req: Request, res: Response, next: NextFunction) => {
   try {
      await repository.delet(req.body);
      res.status(200).send({ message: 'Produto removido com sucesso' });
   } catch (err) {
      error(res, err);
   }
}

const error = (res: Response, err: any) => {
   res.status(500).send({
      message: 'Falha ao processar sua requisicao',
      data: err
   });
}
