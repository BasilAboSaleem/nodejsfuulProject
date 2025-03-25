const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");
var moment = require('moment'); 
const countryList = require("country-list");




// GET Requst
router.get("/", (req, res) => {
  // result ==> array of objects
  console.log("------------------------------------------------------------");
  User.find()
  .then((result) => {
   
    res.render("index", {arr: result , moment:moment});

  })
  .catch((err) => {
    console.log(err);
    
  });
});

router.get("/user/add.html", (req, res) => {
  const countries = countryList.getNames(); // جلب أسماء الدول
  res.render("user/add", { countries }); // تمرير قائمة الدول إلى القالب
 
});
// هذه الجيت عمليتها انا لابعتها لما ينجح بتسجيل مستخدم جديد
router.get("/user/sucsess.html", (req, res) => {
  res.render("user/sucsess");

});


router.get("/edit/:id", (req, res) => {
  const countries = countryList.getNames(); // جلب أسماء الدول
  User.findById(req.params.id)
  .then((result) => {
    res.render("user/edit", {obj: result, moment:moment, countries});
  })
  .catch()
  
});



router.get("/view/:id", (req,res) => {
  User.findById(req.params.id)
  .then((result) => {
    res.render("user/view", {obj: result, moment:moment});
  })
  .catch()
  
})

/////




// POST Requst
router.post("/user/add.html", (req, res) => {
 
  
  User
    .create(req.body)
    .then(() => {
      console.log(req.body);
      res.render("user/sucsess");
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/search", (req, res) => {
    const searchText= req.body.searchText.trim();
  User.find({$or: [{ fireName: searchText }, {lastName : searchText}] })
  .then((result) => {
    res.render("user/search", {arr: result, moment:moment});
  })
  .catch((err) => {
    console.log(err);
  })
})


////////////////////


// DELETE Requst

router.delete("/edit/:id", (req,res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.render("user/deleteSucsess")
  })
  .catch((err) => {
    console.log(err);
  })
  
})


// PUT Requste
router.put("/edit/:id", (req,res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.redirect("/")
  })
  .catch((err) => {
    console.log(err);
  })
 
  })
  


module.exports = router