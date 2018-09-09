
// Requiring packages that will be used in the project
var express = require("express"),
    app = express(),
    mySql   = require("mysql"),
    bodyParser = require("body-parser"),
    session = require("express-session");
    app.use(bodyParser.urlencoded({extended:true}));
// Securing assets and stylesheets in public directory 
    app.use(express.static(__dirname+"/public"));
// Adding an express session with a certain age    
    app.use(session({
        secret:"waficIsTheBestDev",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge:60000}

    }));

// Connecting to SQL database
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

app.post("/register",function(req,res){
    var users = 
    {
        "ID":req.body.id,
        "email":req.body.email,
        "password":req.body.password

    };

    connection.query ('INSERT INTO users SET ?',users,function(error,results,fields){
        if(error)
        {
            console.log(error);
            res.redirect("/register",{"code":400,
                                        "failed":"error occured"});
        
         
        }
        else {
            res.render("secret.ejs",{"code":200,
                                        "success":"user registered successfully!"});
            console.log('The solution is: ', results);
    

        }
    });
});

app.get("/register",function(req,res){
    res.render("signup.ejs");
});

app.post("/login",function(req,res){
    var id = req.body.id;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE id =?',[id],function(error,results,fields){
        if(error)
        {
            console.log("error occured");
            res.send
        }
        else if(results.length > 0)
        {
            if(results[0].password == password)
            {
                res.render("secret.ejs",{"code":200, "success":"login successful"});
            }
            else 
            {
                res.send({
                    "code":204,
                    "success": "id and password do not match"
                });
        }
        
       
        }

        else
        {
            res.send({
                "code":204,
                "success":"id does not exits"
                  });
        }
        
    });


});



app.get("/login",function(req,res){
    res.render("signin.ejs");
});




    app.listen(3000,function(){
        console.log("Servers are running!");
    });