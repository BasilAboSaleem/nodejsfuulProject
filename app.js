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
  res.render("user/add");
});
// هذه الجيت عمليتها انا لابعتها لما ينجح بتسجيل مستخدم جديد
app.get("/user/sucsess.html", (req, res) => {
  res.render("user/sucsess");

});


app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
  .then((result) => {
    res.render("user/edit", {obj: result, moment:moment});
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
 
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      console.log(req.body);
      res.render("user/sucsess");
    })
    .catch((err) => {
      console.log(err);
    });
});


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
