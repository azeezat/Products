const express = require('express');
const router = express.Router();
const {Products,validate} = require('../models/products');

router.get('/', async (req, res) => {
  const products = await Products.find().sort('name');
  res.send(products);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Products({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category:req.body.category,
    color:req.body.color,
  });
  product = await product.save();
  
  res.send(product);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Products.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      description: req.body.name,
      price: req.body.name,
      image: req.body.name,
      category:req.body.name,
      color:req.body.name,
    }, { new: true });

  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(product);
});

router.get('/:id', async (req, res) => {
  const product = await Products.findById(req.params.id).populate('products','name -_id');

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});



module.exports = router; 