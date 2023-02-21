const express = require('express')
const routerUser = express.Router()
const userSchema = require('../model/user')
const multer = require('multer')
const path = require('path')
// storage engine for multer go see the info ârt defining 
// the local storage location so that the files received 
// from the client will be saved in the defined location

const storageEngine = multer.diskStorage ({
    destination: './uploads',
    filename: function (req, file, callback) {
      callback (
        null,
        file.fieldname + '-' + Date.now () + path.extname (file.originalname)
      );
    },
  });
  
    // file filter for multer
  //   It lets us filter out unwanted files. For this tutorial, we will expect only images.
  
  // Here's the code.
    const fileFilter = (req, file, callback) => {
      let pattern = /jpg|png|svg/; // reqex
  
      if (pattern.test (path.extname (file.originalname))) {
        callback (null, true);
      } else {
        callback ('Error: not a valid file');
      }
    };
  
  // initialize multer
  
  const upload = multer ({
    storage: storageEngine,
    fileFilter: fileFilter,
  });
  
  // routing
  // we create the routes for our application.
  
  // Multer. provides a single method for acessing single files. It takes a string as an argument.
  
  
  routerUser.post ('/upload', upload.single ('uploadedFile'), (req, res) => {
  try {
    const {name,email}= req.body
    const photo= req.file.filename

    const newData={
        name,
        email,
        photo
    }
    const newuser = new userSchema(newData)
    newuser.save()

    res.json (req.file).status (200);
    
  }catch(err){
    res.status (400).json ({msg : "there is a prob with creating ur user"});
    console.log(err)
  }
  });
  // To confirm your app is working correctly, upload a picture. All uploads will be stored in backend/public/uploads.
  
//-----------------***   partie creation user and get all user 
routerUser.get('/getit',async(req,res)=>{
    try{
  const userr = await userSchema.find()
  res.status(200).json({userr,msg:'you could get the users'})
    }catch(err){
console.log(err)
res.status (400).json ({msg : "there is a prob with getting your users"});
    }
})

  module.exports = routerUser