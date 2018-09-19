var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3006;

var db = require("./models");

var exphbs = require("express-handlebars");

var routes = require("./controllers/controller.js")

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


require('dotenv').config();

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

app.use("/", routes);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on : http://localhost:" + PORT);
    })
})