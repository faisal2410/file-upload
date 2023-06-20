let express = require('express');
let router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/images/uploads" })
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/formsub', upload.single('meme'), (req, res, next) => {
    // console.log(req.file);
    
    const newPath = `public/images/uploads/${req.file.originalname}`;
    fs.rename(req.file.path, newPath, (err) => {
        if (err) throw err;
        // upload newPath to the db
        res.json({
            message: "File uploaded",
            info:req.body
        })
    });

})

// router.post('/formsubarray', upload.array('meme'), (req, res, next) => {
//     console.log(req.files);
//     const newPath = `public/images/uploads/${req.files[0].originalname}`;
//     const newPath2 = `public/images/uploads/${req.files[1].originalname}`;
//     fs.rename(req.files[0].path, newPath, (err) => {
//         if (err) {
//             throw err;
//         }
//     })
//     fs.rename(req.files[1].path, newPath2, (err) => {
//         if (err) {
//             throw err;
//         }
//     })
//     res.json({
//         field: req.body,
//         image: req.files
//     });
//     console.log(req.files);
// })



router.post('/formsubarray', upload.fields(
    [{ name: 'avator', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }]),
    function (req, res, next) {
        const newPath = `./uploads/${req.files['avator'][0].originalname}`
        const newPath2 = `./uploads/${req.files['gallery'][0].originalname}`
        const newPath3 = `./uploads/${req.files['gallery'][1].originalname}`
        fs.rename(req.files['avator'][0].path, newPath, (err) => {
            if (err) {
                throw err;
            }
        })
        fs.rename(req.files['gallery'][0].path, newPath2, (err) => {
            if (err) {
                throw err;
            }
        })
        fs.rename(req.files['gallery'][1].path, newPath3, (err) => {
            if (err) {
                throw err;
            }
        })
        res.json({
            field: req.body,
            image: req.files
        });
        console.log(req.files);
        console.log(req.body)
    });

module.exports = router;