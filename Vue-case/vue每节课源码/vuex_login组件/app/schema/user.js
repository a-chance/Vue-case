const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   username:String,
   password:String,
   age:{
      type:Number,
   }
})

module.exports = mongoose.model('users',userSchema)
