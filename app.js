var express = require("express"),
    app = express(),
    mySql   = require("mysql");
    app.use(express.static(__dirname+"/public"));

var connection = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'intro-to-web-project-database'

});

connection.getConnection(function(err,connection){
    if(!err)
    {
        console.log("Connected to Database Successfully!");
    } else {
        console.log("Failed to connect to database!");
    }

});


app.get("/",function(req,res){

    res.render("landing.ejs");
});

app.get("/signup",function(req,res){
    res.render("signup.ejs");
});

app.get("/login",function(req,res){
    res.render("signin.ejs");
});

app.get("/tuitionCalculator",function(req,res)
{
    res.render("tuitioncalculator.ejs");
});




    app.listen(3000,function(){
        console.log("Servers are running!");
    });