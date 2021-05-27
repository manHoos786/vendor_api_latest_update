const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://bakwas:bakwas@cluster0.uvmz9.mongodb.net/bank_unique_id?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connection successfull..."))
.catch((err)=> console.log(err))
// HeyIWillFuckYou
// https://polar-lake-69736.herokuapp.com

