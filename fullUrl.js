
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const helmet = require('helmet');


app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

/**
 * Article Link :
 * https://fjolt.hashnode.dev/how-to-get-the-full-url-in-express-on-nodejs?fbclid=IwAR2-lZRlDpYqEnTM5YHh-iomSXz9OfXrusZ45ZJ1o6QHlQKhpQB-_To0ff8
 * 
 * */ 
app.get('/page', (req, res, next) => {
    console.log("Protocol========>",req.protocol)
    console.log("Host=========>",req.get('host'))
    console.log("Host Name=========>",req.hostname)
    console.log("Original URL=========>",req.originalUrl)
    // Show some content to the user
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
})


app.listen(3000)
console.log("Server Run Success")