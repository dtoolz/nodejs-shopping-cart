var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');


var Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
   Product.find(function(err,docs){
     var productGroups = [];
     var groupSize = 4;
     for(var i = 0; i < docs.length; i += groupSize ){
       productGroups.push(docs.slice(i, i + groupSize));
     }
    res.render('store/index', { title: 'Dtoolz Express Shopping Cart', products : productGroups });
   });
});

//to add items to cart
router.get('/add-to-cart/:id', function(req, res, next){
   var productId = req.params.id; //to store params retrieved in productId variable
   var cart = new Cart( req.session.cart ? req.session.cart : {}); //if cart is available in session, pass original cart else an empty object
   
   Product.findById(productId, function(err, product){
       if(err){
         return res.redirect('/');  //redirect to home page if err found for now
       }
       cart.add(product, product.id); 
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/');
   });
  });



module.exports = router;
