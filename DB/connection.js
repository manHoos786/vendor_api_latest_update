const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bakwas:bakwas@cluster0.uvmz9.mongodb.net/userData?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connection successfull..."))
.catch((err)=> console.log(err))

