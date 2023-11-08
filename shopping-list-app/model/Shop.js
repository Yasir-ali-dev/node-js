const { default: mongoose } = require("mongoose");

const shopSchema =  new mongoose.Schema={
  item :{
    type : String,
    required : [true,"item is required!"]
  }  
} 
module.exports = mongoose.model("Shop",shopSchema);
