const express = require ('express');


//**************************All Controller Start ************/
const ProductController = require ('../Controller/ProductController');
//**************************All Controller End ************/


const route = express.Router();

route.get ('/',ProductController.getProducts)

module.exports = route;