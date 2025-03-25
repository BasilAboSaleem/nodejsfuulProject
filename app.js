const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const allRoutes = require('./routes/allRoutes')

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

/*//////////////
Routes
/////////////*/

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


  app.use( allRoutes)