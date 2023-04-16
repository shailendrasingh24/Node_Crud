const express = require ('express');
const   IndexRoute = require ('./routes/IndexRoute');
const  ProductRoute = require ('./routes/ProductRoute');

const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
//parse Application/json
app.use(bodyParser.json());

app.use('/',IndexRoute);
app.use('/products',ProductRoute);
app.use('/products/upload',ProductRoute)
 
module.exports = app;