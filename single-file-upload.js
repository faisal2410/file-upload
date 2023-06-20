const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
let indexRouter = require('./routes/index');
const helmet = require('helmet');
const multer = require('multer');
const upload = multer({ dest:'./uploads' })

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);


app.post('/uploadFile',upload.single('myimg'), (req, res, next)=> {  
    console.log("File Test===========>",req.file)  
    console.log("Body Test==============>",req.body)
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

//   Serve an html file through express server

  app.get('/', (req, res) => {
    res.sendFile('index.html')
})
//   app.get('/about', (req, res) => {
//     res.sendFile('about.html')
// })






app.listen(8000)
console.log("Server Run Success")