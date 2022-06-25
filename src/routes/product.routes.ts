import { Router } from 'express';
import * as controller from '@controller/productController';
import * as authService from '@services/authService';

// para volter a funcionar o cadastro precisa tirar a autorizacao do metodo post
// o token pode ser passado de 3 formas
// pela URL depois da rota usando um ?token=MEUTOKEN
// adicionar uma propriedade no header da request com o nome x-access-token tendo o valor do token header=x-access-token value=MEUTOKEN
// passar o token no json junto das outras propriedades { "token": "MEUTOKEN" }

const product = Router();

product.get('/', controller.get);

product.get('/:slug', controller.getBySlug);

product.get('/admin/:id', controller.getById);

product.get('/tags/:tag', controller.getByTag);

product.post('/', authService.isAdmin, controller.post);

product.put('/:id', authService.isAdmin, controller.updateProductById);

product.delete('/', authService.isAdmin, controller.del);

export default product;