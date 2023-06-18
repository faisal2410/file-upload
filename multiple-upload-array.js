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

app.post('/uploadFiles',upload.array('photos', 12), function(req, res, next) {
    // console.log("File Test===========>",req.files)  
    // console.log("Body Test==============>",req.body)
    const newPath=`./uploads/${req.files[0].originalname}`
    const newPath2=`./uploads/${req.files[1].originalname}`
    fs.rename(req.files[0].path,newPath,(err)=>{
        if(err){
            throw err;
        }
    })
    fs.rename(req.files[1].path,newPath2,(err)=>{
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




app.listen(8000)
console.log("Server Run Success")