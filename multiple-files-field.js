const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const helmet = require('helmet');
const multer = require('multer');
const upload = multer({ dest:'./uploads' })

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.post('/uploadMultipleFiles',upload.fields(
    [{ name:'avator', maxCount: 1 }, 
    { name:'gallery', maxCount: 8 }]), 
    function(req, res, next) {
    const newPath=`./uploads/${req.files['avator'][0].originalname}`
    const newPath2=`./uploads/${req.files['gallery'][0].originalname}`
    fs.rename(req.files['avator'][0].path,newPath,(err)=>{
        if(err){
            throw err;
        }
    })
    fs.rename(req.files['gallery'][0].path,newPath2,(err)=>{
        if(err){
            throw err;
        }
    })
    res.json({
        field:req.body,
        image:req.files
    });
    console.log(req.files);
  });


app.listen(3000)
console.log("Server Run Success")