import { Product } from "../models/products.model";
const express = require('express');
const app = express();
const port = 3000;

// Add middleware for parsing JSON requests
app.use(express.json());

let products: Product[] = [
    {
      id: 1,
      name: 'Phone XL',
      price: 799,
      description: 'A large phone with one of the best screens'
    },
    {
      id: 2,
      name: 'Phone Mini',
      price: 699,
      description: 'A great phone with one of the best cameras'
    },
    {
      id: 3,
      name: 'Phone Standard',
      price: 299,
      description: ''
    }
  ]

// generateProduct(id: number): Product {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     let name = '';
//     const stringLength = 8;
//     const randomPrice = Math.round(Math.random() * 1000);
//     for (let i = 0; i < stringLength; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       name += characters.charAt(randomIndex);
//     }
//     return {
//       id: id,
//       name: name,
//       price: randomPrice,
//       description: ''
//     };
// }

setInterval(() => {
    products = products.map((item) => ({
        ...item,
        name: `Updated ${item.name}`,
      }));
}, 3000)

// Read all products
app.get('/products/all', (req: any, res: { json: (arg0: Product[]) => void; }) => {
    res.json(products);
  });

// get detail of one product
app.get('/products/:id', (req: { params: { id: string; }; }, res: { json: (arg0: Product) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const id = parseInt(req.params.id);
    const item = products.find((item) => item.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });

 // Update an item by ID
app.put('/products/:id', (req: { params: { id: string; }; body: any; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex((item) => item.id === id);
    if (index !== -1) {
        products[index] = updatedProduct;
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });