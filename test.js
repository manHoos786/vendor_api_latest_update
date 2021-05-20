const express = require('express')
const mongoose = require('mongoose')
const connectdb = require('./DB/connection')
const app = express();

connectdb();

app.listen(3000, ()=>{
    console.log("Port is listining at 3000\n")
    
})





