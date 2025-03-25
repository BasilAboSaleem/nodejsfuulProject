const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require('moment'); 
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const countryList = require("country-list");

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
///////////////////////
// GET Requst
app.get("/", (req, res) => {
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
app.get("/user/add.html", (req, res) => {
  const countries = countryList.getNames(); // جلب أسماء الدول
  res.render("user/add", { countries }); // تمرير قائمة الدول إلى القالب
 
});
// هذه الجيت عمليتها انا لابعتها لما ينجح بتسجيل مستخدم جديد
app.get("/user/sucsess.html", (req, res) => {
  res.render("user/sucsess");

});


app.get("/edit/:id", (req, res) => {
  const countries = countryList.getNames(); // جلب أسماء الدول
  User.findById(req.params.id)
  .then((result) => {
    res.render("user/edit", {obj: result, moment:moment, countries});
  })
  .catch()
  
});



app.get("/view/:id", (req,res) => {
  User.findById(req.params.id)
  .then((result) => {
    res.render("user/view", {obj: result, moment:moment});
  })
  .catch()
  
})

/////




// POST Requst
app.post("/user/add.html", (req, res) => {
 
  
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


app.post("/search", (req, res) => {
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

app.delete("/edit/:id", (req,res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.render("user/deleteSucsess")
  })
  .catch((err) => {
    console.log(err);
  })
  
})


// PUT Requste
app.put("/edit/:id", (req,res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.redirect("/")
  })
  .catch((err) => {
    console.log(err);
  })
 
  })
  


/////////////
//الاتصال بقاعدة البيانات
mongoose
.connect(
  "mongodb+srv://basil:_%23X8p%21_4U%23dmMN8@cluster0.8gkpu.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
