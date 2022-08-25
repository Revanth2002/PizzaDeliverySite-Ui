/*=========Imports====================*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/*=========DB Models==============*/
const {User} = require('./models')

/*==========Setup ==============*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

/*=========PORT====================*/
app.listen(3000, () => {
    console.log('Server started on port 3000');
})


/*=========Webpage Routings====================*/
//Home Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/templates/index.html');
})

//Cart Page
app.get('/cart', (req, res) => {
    res.sendFile(__dirname + '/public/templates/cart.html');
})

//Product Page
app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/templates/products.html');
})

//Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/templates/login.html');
})

//Register Page
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/templates/register.html');
})


/*=========API Routings====================*/
//Perform Sign Up
app.post('/sign-up',async function (req, res) {
    let data = req.body;
    try{
        let check_email  = await User.find({email:data.email});
        if(check_email.length>0){
            res.send("Email already exists");
        }
        let check_username = await User.find({username:data.username});
        if(check_username.length>0){
            res.send("Username already exists");
        }
        await User.create(data);
        res.setHeader("Content-Type", "text/html");
        res.sendFile(__dirname + '/public/templates/login.html');      
    }catch(err){
        res.send(err);
    }
})

//Perform Login
app.post('/login',async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    try{
        console.log("-------------------");
        let user = await User.find({username: username});

        res.setHeader("Content-Type", "text/html");
        if(user){
            if(user[0].password===password){
                res.sendFile(__dirname + '/public/templates/index.html',{ username: username });
            }else{
                res.send("Password is incorrect");
            }
        }else{
            res.send("Invalid username or password");
        }
    }catch(err){
        res.send(err);
    }
})