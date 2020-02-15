var express = require('express');
var router = express.Router();



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



module.exports = router;
