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


app.post('/uploadFile',upload.single('myfile'), (req, res, next)=> {  
    // console.log("File Test===========>",req.file)  
    // console.log("Body Test==============>",req.body)
    const newPath=`./uploads/${req.file.originalname}`
    fs.rename(req.file.path,newPath,(err)=>{
        if(err){
            // throw err;
            console.log(err);
        }else{
            res.json({
                message: 'File Uploaded Successfully',
                field:req.body,
                image:req.file
    
            });
        }
        
    })
   
  });





app.listen(3000)
console.log("Server Run Success")