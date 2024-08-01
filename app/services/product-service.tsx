import {Product} from '../../models/models';

const productsURL = 'http://192.168.1.101:3000/products';
class ProductService {
  createProduct = (product: Product) => {
    return fetch(productsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  };
}

export const productService = new ProductService();
