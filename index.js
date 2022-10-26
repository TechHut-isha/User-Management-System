const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const exphbs = require('express-handlebars');
var app = express();
require('dotenv').config();
 
//Parsing Middleware
// Parsing application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}));

// Parsing application/json
app.use(bodyParser.json());

//adds a middleware for serving static files to your Express app
//Static files
app.use(express.static('public'));

//Setup the templates  into the engine
//Templating Engine 
app.engine('hbs', exphbs.engine( {extname: '.hbs' }));
app.set('view engine', 'hbs'); 

//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    Host : process.env.Db_Host,
    user: process.env.Db_User,
    password: process.env.Db_Password,
    database: process.env.Db_Name

});

//Connecting Database
pool.getConnection((err,connection)=>{
    if(err){
        throw err;//'Not connected'
    }
    console.log('Connected as ID'  + connection.threadId);

})

// Router
app.get('' ,(req,res)=>{
    res.render('home');
});

app.listen(3000,(req,res)=> {
    console.log("server is running at port 3000");
})