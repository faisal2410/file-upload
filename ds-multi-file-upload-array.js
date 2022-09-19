// Multiple file upload using DiskStorage engine (multer.array)
const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const multer = require('multer');

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const storage=multer.diskStorage({
    destination: (req,file,callBack)=> {
        callBack(null,'./uploads');
    },
    // filename: (req,file,callBack)=> {
    //     callBack(null,file.originalname)
    // }
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null,`${uniqueSuffix}${file.originalname}`)
      }
});

const upload=multer({storage:storage}).array('photos', 12)
app.post('/multiple', (req,res)=> {
    upload(req,res, (error)=> {
            if(error){
                res.send("File Upload Fail")
            }
            else{
                res.send("File Upload Success")
            }
    });
});


app.listen(3000)
console.log("Server Run Success")