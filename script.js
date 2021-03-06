const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001; 
const db = require('./database/database');
const login = require('./authantication/login');
const signup = require('./authantication/signup');
const profile = require('./mainapp/profile');
const image = require('./mainapp/image');
const google = require('./authantication/google');
const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(bodyparser.json({limit: '10mb', extended: true}))
//app.use(bodyparser.json());
app.use(cors());

app.post('/login', (req,res) => {login.loginhandler(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{signup.signuphandler(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res)=>{profile.profilehandler(req,res,db)});

app.post('/imageurl', (req, res) => {image.apihandler(req,res)});

app.put('/image', (req,res) => {image.imgcounthandler(req,res,db)});

app.post('/upload', (req,res) => {image.imgfilehandler(req,res)});

app.post('/gauth', (req,res) => {google.googleauth(req,res,db,bcrypt)});

app.listen(port, () => console.log(`running on port ${port}`));