const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const multer = require ('multer');
const connectToDb = require('./config/connectdb')
// constants
const app = express ();
const PORT = process.env.PORT || 5000;
const routerUser = require('./routes/userRoutes')
connectToDb()
// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());
app.use("/uploads",express.static("./uploads"));

app.use('/user',routerUser)
app.listen (PORT, () => console.log (`Server running on port: ${PORT}`));