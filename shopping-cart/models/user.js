var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
   email : {type : String, required: true},
   password : {type : String, required: true}
});

//to hash passwords
userSchema.methods.encryptPassword = function(password){ // 5 for rounds of salt creation
   return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null); 
}

//to check if a password matches the hashed password
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password); //this keyword for original password
}

module.exports = mongoose.model('User', userSchema);