const Joi = require('joi');
const mongoose = require('mongoose');

const Products = mongoose.model('Products', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  color: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
}));

function validateProduct(product) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
      category:Joi.string().required(),
      color:Joi.string().required()
    };
  
    return Joi.validate(product, schema);
  }

exports.Products=Products
exports.validate=validateProduct