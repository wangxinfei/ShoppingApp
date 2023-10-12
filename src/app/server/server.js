const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Add middleware for parsing JSON requests
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

let products = [
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
 
let cart = [];

// Read all products
app.get('/products/all', (req, res) => {
  try {
    // Normal response
    res.json(products);
  } catch (error) {
    console.log(error);
  }
    
  });

// get detail of one product
app.get('/products/detail/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = products.find((item) => item.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });


// get count of products
app.get('/products/count', (req, res) => {
  try {
    // Normal response
    res.json(products.length);
  } catch (error) {
    console.log(error);
  }
});


// create a product
app.post('/products/new', (req, res) => {
  products.push(req.body);
  return res.status(201).json({message: 'Product created'});
})

// get items in cart
app.get('/cart/all', (req, res) => {
  try {
    // Normal response
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
  });

// get count of cart
app.get('/cart/count', (req, res) => {
  try {
    // Normal response
    res.json(cart.length);
  } catch (error) {
    console.log(error);
  }
})

// get count of one item in cart
app.get('/cart/count/:id', (req, res) => {
  try {
    // Normal response
    const id = parseInt(req.params.id);
    const count = cart.filter((item) => item.id == id).length;
    res.json(count);
  } catch (error) {
    console.log(error);
  }
})

// add new items to cart
app.post('/cart/add', (req, res) => {
  cart.push(req.body);
  return res.status(201).json({message: 'Product added to cart'});
})

// delete an item in the cart
app.delete('/cart/delete/:id', (req,res) => {
  const id = parseInt(req.params.id);
  // cart = cart.filter((item) => item.id != id);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart.splice(i, 1); // Remove the object at index i
      console.log(cart);
      break; // Stop searching after the first match is found
    }
  }
})

// clear the cart
app.get('/cart/clear', (req,res) => {
  cart = [];
  res.json(cart);
})