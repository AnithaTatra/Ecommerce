'use strict';

const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const user_route = require('./route/user.route')
const product_route = require('./route/product.route')
const category_route=require('./route/category.route')
const cart_route = require('./route/cart.route')
//server starting code
const app = express()
const PORT = process.env.PORT || 3000


app.get('/check', function (req, res) {
    console.log(req.path);
    console.log("route..",req.route);
    //res.redirect('/test');
    res.end();
  });

  app.get('/test', function (req, res) {
   // res.send({message:"welcome"});
   // res.sendStatus(200);
    //  res.sendStatus(401);
    res.attachment('Hello.txt');
    console.log(res.get('Content-Disposition'));
  });

//Database connection code
mongoose.connect(process.env.MONGODBURL,{
     useNewUrlParser: true,
     useUnifiedTopology:true 
    },function(err){
    if(err) console.log(err);
    console.log("DataBase  connected");
});

app.use(express.json())
app.use('/api/v1/user/',user_route)
app.use('/api/v2/product/',product_route)
app.use('/api/v3/category/',category_route)
app.use('/api/v4/cart',cart_route)
app.set('view engine','ejs')
//listening port
app.listen(PORT,()=>{
    console.log(`server starting at ${PORT} port... `)
});

