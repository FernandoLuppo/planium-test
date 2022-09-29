//  Load Modules
const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

//  Applications
const userRoutes = require("./routes/user");
const path = require("path");
const app = express();
const PORT = 8080;

//  Configurations
//  Body-Parser Config
app.use(bodyParser.urlencoded({ extended: false }));

//  Express-handlebars config
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");

//  Session Config
app.use(
  session({
    secret: "key2002",
    resave: false,
    saveUninitialized: true,
  })
);

//  Statics files Config
app.use(express.static(path.join(__dirname, "public")));

//  Routes
app.use("/", userRoutes);

//  Others
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
});
