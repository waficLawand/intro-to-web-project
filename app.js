// Requiring packages that will be used in the project
var express = require("express"),
    app = express(),
    mySql   = require("mysql"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    flash = require("connect-flash");
    LocalStrategy   = require('passport-local').Strategy,
    passport = require("passport");
    var loggedInUser ,loggedInId;
    var isLoggedin = false;
    var signedUser;
    app.use(bodyParser.urlencoded({extended:true}));
// Securing assets and stylesheets in public directory 
    app.use(express.static(__dirname+"/public"));
// Adding an express session with a certain age  
app.use(flash());  
    app.use(session({
        secret:"waficIsTheBestDev",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge:60000}

    }));
    app.use(function(req,res,next){
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
    });
    
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
                                user:loggedInUser,success:true});
                                
});



app.post("/register",function(req,res){
    var users = 
    {
        "ID":req.body.id,
        "email":req.body.email,
        "password":req.body.password,
        "firstName":req.body.firstName,
        "lastName": req.body.lastName
     };
     connection.query ('INSERT INTO users SET ?',users,function(error,results,fields){
        if(error)
        {
            console.log(error);
            res.redirect("/register",{"code":400,
                                        error:"Error occured while tryin to register, please try again!"});
        
         
        }
        else {
            loggedInUser = users.firstName+" "+users.lastName;
                loggedInId = users.ID;
            isLoggedin = true;
            res.render("secret.ejs",{loginStatus: isLoggedin,user:users.firstName+" "+users.lastName,success:"Welcome "+ loggedInUser+"!"});
          
    
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
                
                res.render("secret.ejs",{"code":200, loginStatus:isLoggedin,user:results[0].firstName+" "+results[0].lastName,success:"Logged In Successfully!"});
            }
            else 
            {
                isLoggedin = false;
                res.render("signup.ejs",{ loginStatus:isLoggedin,error: "ID and password do not match"    });
            
        }
        
       
        }

        else
        {
            isLoggedin = false;
            res.render("signup.ejs",{ loginStatus:isLoggedin,error: "ID does not exist" });
        }
        
    });


});



app.get("/login",function(req,res){
    
    res.render("signup.ejs",{loginStatus:isLoggedin,loadPage:"login",success:"Welcome to BAU iTools!"});
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

app.get("/petitions/show/:id",function(req,res)
{
    var id = req.params.id;
    id = id.split(":").pop()
    console.log(id)
    connection.query("SELECT * FROM petitions WHERE id =?",[id],function(err,rows)
    {
         if(err)
         {
             console.log(err);
         }
        else
        {
            res.render("show.ejs",{petitionDetails:rows[0],loginStatus:isLoggedin, user:loggedInUser,petitionSigning:signedUser,userId:loggedInId});
        }
    });
});
app.get("/secret", function(req,res)
{
    if(isLoggedin)
    {
        res.render("secret.ejs",{loginStatus:isLoggedin,
            user:loggedInUser,userId:loggedInId});
    }
    else
    {
        console.log("NOT LOGGED IN!");
       
        res.redirect("/login");
    }
    
    
});

app.get("/tuitionCalculator",function(req,res)
    {
        res.render("tuitionCalc.ejs",{loginStatus:isLoggedin});
    });

app.get("/scheduleMaker",function(req,res)

{
    isLoggedin = false;
    res.render("scheduleMaker.ejs",{loginStatus:isLoggedin});
});
    app.listen(3000,function(){
        console.log("Servers are running!");
    });

    