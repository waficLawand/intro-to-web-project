var express = require("express"),
  
    app = express();
    app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){

    res.render("landing.ejs");
});

app.get("/signup",function(req,res){
    res.render("signup.ejs");
});

app.get("/login",function(req,res){
    res.render("signin.ejs");
});




    app.listen(3000,function(){
        console.log("Servers are running!");
    });