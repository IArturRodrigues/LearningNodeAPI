import { Request } from 'express';
import * as core from 'express-serve-static-core';

// generics opicional basta colocar '= void', ou '= any' ou '= {}'
// any eh o mais recomendado quando precisa ser usado ainda, mesmo sem ter tipo

export interface ICustomRequest<P extends core.ParamsDictionary = any, B = any> extends Request {
   params: P;
   body: B;
}

export interface IRequest extends core.ParamsDictionary {
   id?: string;
   slug?: string;
   tag?: string;
}