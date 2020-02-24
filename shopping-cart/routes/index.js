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

//cart view route
router.get('/shopping-cart/', (req, res, next)=>{
    if(!req.session.cart){ //if session do not exist, return null for products
      return res.render('store/cart', {products : null});
    }
    var cart = new Cart(req.session.cart); //creating a new cart of the products stored in session
    res.render('store/cart', { products: cart.generateArray(), totalPrice : cart.totalPrice });//passing object that will be available in carthbs UI
});

//cart payment route
router.get('/checkout', (req, res, next)=>{
    if(!req.session.cart){
      return res.redirect('/shopping-cart');//redirect to shopping-cart url
    }
    var cart = new Cart(req.session.cart);
    res.render('store/payment', { totalPrice : cart.totalPrice} )
});


module.exports = router;
