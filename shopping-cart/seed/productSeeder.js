var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true, useUnifiedTopology: true });
var products = [ 
    
     new Product({
     imagePath : '/images/shoe5.jpg',
     title : 'Yellow Nike Classic Shoe',
     price : 33
     }),

     new Product({
     imagePath : '/images/shoe6.jpg',
     title : 'Classic Nike converse',
     price : 23
     }),

     new Product({
     imagePath : '/images/shoe7.jpg',
     title : "Men's tilden cap oxford shoe",
     price : 47
     }),

    new Product({
    imagePath : '/images/shoe8.jpg',
    title : 'Yellow Nike Classic Shoe',
    price : 31
    }),


    new Product({
        imagePath : '/images/fshoe1.jpg',
        title : "Women's lanette pump",
        price : 93
        }),
   
        new Product({
        imagePath : '/images/fshoe2.jpg',
        title : "Women's ballet flat shoe",
        price : 35
        }),
   
        new Product({
        imagePath : '/images/fshoe3.jpg',
        title : "Jewel women's upton",
        price : 110
        }),
   
       new Product({
       imagePath : '/images/fshoe4.jpg',
       title : "lifestride women's parigi pump",
       price : 25
       })
];

var done = 0;
for(i=0; i<products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done ===  products.length ){
           exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

