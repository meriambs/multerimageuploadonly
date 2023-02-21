const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const multer = require ('multer');
const connectToDb = require('./config/connectdb')
// constants
const app = express ();
const PORT = process.env.PORT || 5000;
connectToDb()
// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());

// storage engine for multer go see the info ârt 
const storageEngine = multer.diskStorage ({
  destination: './public/uploads/',
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


app.post ('/upload', upload.single ('uploadedFile'), (req, res) => {
  res.json (req.file).status (200);
});
// To confirm your app is working correctly, upload a picture. All uploads will be stored in backend/public/uploads.

app.listen (PORT, () => console.log (`Server running on port: ${PORT}`));