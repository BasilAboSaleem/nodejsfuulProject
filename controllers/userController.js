const User = require("../models/customerSchema");
var moment = require('moment'); 
const countryList = require("country-list");


const user_index_get = (req, res) => {
  // result ==> array of objects
  console.log("------------------------------------------------------------");
  User.find()
  .then((result) => {
   
    res.render("index", {arr: result , moment:moment});

  })
  .catch((err) => {
    console.log(err);
    
  });
}

module.exports = {user_index_get}