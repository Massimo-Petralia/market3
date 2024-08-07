import {Product} from '../../models/models';

const productsURL = 'http://192.168.1.100:3000/products';
const guardedProductUrl = 'http://192.168.1.100:3000/644/products';
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
  getProductList = () => {
    return fetch(`${productsURL}/?_page=1&_limit=10`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
  getFilteredProducts = (name: string) => {
    return fetch(`${productsURL}?name_like=${name}&_page=1&_limit=10`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
}

export const productService = new ProductService();
