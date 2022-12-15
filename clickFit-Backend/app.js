const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser')


const storage = multer.diskStorage({ 
    destination : './upload/images',
    filename : (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})


const upload = multer({
    storage : storage
});

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use('/image', express.static('upload/images'))
app.post("/upload", upload.single('image'), (req, res) => {s
    
    console.log(req.file)
    res.json({ 
        success: true,
        img_url: `http://localhost:4000/image/${req.file.filename}`
    })
});

app.listen(4000,()=>{
    console.log("server running on http://localhost:4000 ")
})


// const express = require('express')
// const bodyParser = require('body-parser')
// const multer  = require('multer')
// const sharp = require('sharp')
// const uuid = require('uuidv4')

// const app = express()
// // Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(bodyParser.json());

// app.use(express.static('./public')) 
// app.use(express.static('./uploads/')) // we will store images in this directory

// // Note: since static folder public has Index.html in it. This route won't even hit, and the file will be served directly
// app.get('/', (req, res)=>{
//     res.sendFile("index.html", { root: __dirname + "/public" }) // sendFile needs absolute path, the second parameter helps creating path
// })

// const port = process.env.PORT || 5000
// app.listen(port, 
//     ()=>console.log('server listening on port ' + port))



//     // Multer single file parser
// const upload = multer({limits:{fileSize:4000000}}).single('avatar')
// app.post('/upload', (req, res)=>{
//     upload(req, res, async function(err){ 
//      // check for error thrown by multer- file size etc
//      if( err|| req.file === undefined){
//          console.log(err)
//          res.send("error occured")
//      }else{
//         // everything worked fine // req.body has text fields, req.file has the file 
//         let fileName = uuid() +".jpeg"
//         var image = await sharp(req.file.buffer) //.resize({ width: 400, height:400 }) Resize if you want
//         .jpeg({
//             quality: 40,
//         }).toFile('./uploads/'+fileName)
//         .catch( err => { console.log('error: ', err) })
//         res.send(req.body)
//      }
//     })
// })