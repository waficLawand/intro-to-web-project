// Requiring packages that will be used in the project
var express = require("express"),
    app = express(),
    mySql   = require("mysql"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    LocalStrategy   = require('passport-local').Strategy,
    passport = require("passport");
    var loggedInUser,loggedInId;
    var isLoggedin = false;
    var signedUser;
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

    app.use(passport.initialize());
    app.use(passport.session());

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

    res.render("landing.ejs",{loginStatus:isLoggedin,
                                user:loggedInUser});
});

app.post("/register",function(req,res){
    var users = 
    {
        "id":req.body.id,
        "email":req.body.email,
        "password":req.body.password,
        "firstName":req.body.firstName,
        "lastName": req.body.lastName,
    };

    connection.query ('INSERT INTO users SET ?',users,function(error,results,fields){
        if(error)
        {
            console.log(error);
            res.redirect("/register",{"code":400,
                                        "failed":"error occured",
                                    loginStatus:isLoggedin});
        
         
        }
        else {
            console.log(fields);
            isLoggedin =true;
            res.render("secret.ejs",{"code":200,
                                        "success":"user registered successfully!",
                                    loginStatus:isLoggedin});
            console.log('The solution is: ', results);
    

        }
    });
});

app.get("/register",function(req,res){
    res.render("signup.ejs",{loginStatus:isLoggedin,loadPage:"register"});
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
                isLoggedin = true;
                loggedInUser = results[0].firstName+" "+results[0].lastName;
                loggedInId = results[0].id;
                
                res.render("secret.ejs",{"code":200, loginStatus:isLoggedin,user:results[0].firstName+" "+results[0].lastName});
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

    console.log("hello! "+loggedInUser);
});



app.get("/login",function(req,res){
    res.render("signup.ejs",{loginStatus:isLoggedin,loadPage:"login"});
});

app.get("/petitions",function(req,res){

    if(isLoggedin)
    {
        
    connection.query("SELECT * FROM petitions",function(err, rows){
        if(err)
        {
            console.log(err);
        }
        else
        {
            
            console.log(rows.length);
            connection.query("SELECT * FROM votedUsers",function(err,cols){
                if(err)
                {
                    console.log(err);
                }
                else{
                    signedUser = cols;
                    res.render("petitions.ejs",{loginStatus:isLoggedin,
                        user:loggedInUser,sqlData:rows, petitionSigning:signedUser,userId:loggedInId});
                }

            });
            
       
       
        }
        
    });
   

   
    
    }
    else
    {
       console.log("NOT LOGGED IN!");
       
       res.redirect("/login");
    }


    

});

app.get("/logout", function(req,res){

    isLoggedin = false;
    
    res.redirect("/login");
});
app.post("/newPetition",function(req,res)
{
    var petitionPost=
    {
        "request":req.body.request,
        "author": loggedInUser,
        "title":req.body.title,
        "raisePetitionTo":req.body.raisePetitionTo,
        "imageUrl":req.body.imageUrl,
        "signatureGoal":req.body.signatureGoal

    };
    connection.query("INSERT INTO petitions SET ?",petitionPost,function(error,result,fields){
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log("PETITION ADDED!!");
            res.redirect("/petitions");

        }
    });

});
app.post("/petitionSigned/:id",function(req,res){
    var id = req.params.id;
    id = id.split(":").pop()
    console.log(id);
    connection.query('SELECT * FROM petitions WHERE id =?',[id],function(err,results,fields){
        if(err)
        {
            console.log("err")
        } 
        else
        {
            connection.query("UPDATE petitions SET votes = ? WHERE id = ?",[results[0].votes+1,id],function(err,rows){
                if(err)
                {
                    console.log("Error incrementing the votes!");
                }   
                else{
                    console.log("Petition was signed successfully!");

                   connection.query("INSERT INTO votedUsers SET ?",[{"petitionId":id,"userId":loggedInId}],function(err,rows){
                        if(err)
                        {
                            console.log(err);
                        } else
                        {
                            res.redirect("/petitions");
                        }

                   });
                   
                }
        });
        }

    });
    
});
    

app.get("/newPetition",function(req,res)
{
    if(isLoggedin)
    {
        res.render("newPetition.ejs",{loginStatus:isLoggedin,
            user:loggedInUser});
    }
    else
    {
        console.log("NOT LOGGED IN!");
       
        res.redirect("/login");
    }
    
});



    app.listen(3000,function(){
        console.log("Servers are running!");
    });

    app.get("/tuitionCalculater",function(req,res)
    {
        res.render("tuitioncalculator.ejs",{loginStatus:isLoggedin});
    });