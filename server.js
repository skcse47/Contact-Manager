const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const app = express();
const dotenv = require("dotenv").config();
app.use(express.json());
connectDb();
// const errorHandler = require("./middleware/errorHandler")
const port = process.env.PORT || 5000;

app.use('/api/contact', require('./routes/contactRoutes.js'));
app.use('/api', require('./routes/userRoutes.js'));

// app.use('/api/contact/1', require('./routes/contactRoutes.js'));


app.use(errorHandler)

 
app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});