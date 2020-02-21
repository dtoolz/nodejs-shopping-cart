module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){//to add prices of items in the cart
      var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item:item, qty:0, price:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = function(){//to make my cart item an array as a little check for my products groups
         var arr = [];
         for( var id in this.items ){
           arr.push( this.items[id] );
        }
        return arr;
    };
};