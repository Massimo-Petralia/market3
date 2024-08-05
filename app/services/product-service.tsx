import {Product} from '../../models/models';

const productsURL = 'http://192.168.1.101:3000/products';
const guardedProductUrl = 'http://192.168.1.101:3000/644/products';
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
  updateProduct = (accessToken: string, product: Product) => {
    return fetch(`${guardedProductUrl}/${product.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
  };
  getProductList = (page: number) => {
    console.log('service page: ', page)
    return fetch(`${productsURL}/?_page=${page}&_limit=5`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  };
}

export const productService = new ProductService();
