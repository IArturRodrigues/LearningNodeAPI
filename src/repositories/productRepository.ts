import Product from '@models/product';
import { IProduct } from '@interfaces/models';

export const get = async (): Promise<IProduct[]> => {
   return await Product.find({ active: true }, 'title price slug');
}

export const getBySlug = async (slug: string): Promise<IProduct> => {
   // com o find ele retorna o array completo
   //                                  parametro de encontro, selecionar colunas para mostrar
   return await Product.findOne({ slug: slug, active: true }, 'title description price slug tags');
}

export const getById = async (id: string): Promise<IProduct> => {
   return await Product.findById(id, 'title description price slug tags');
}

export const getByTag = async (tag: string): Promise<IProduct[]> => {
   return await Product.find({ tags: tag, active: true });
}

export const create = async (body: any) => {
   var product = new Product(body);
   await product.save();
}

export const update = async (id: string, body: IProduct) => {
   await Product.findByIdAndUpdate(id, {
      $set: {
         title: body.title,
         description: body.description,
         price: body.price,
         slug: body.slug
      }
   });
}

export const delet = async (body: IProduct) => {
   await Product.findOneAndRemove(body.id);
}