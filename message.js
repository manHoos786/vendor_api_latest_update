const express = require('express')
const fast2sms = require('fast-two-sms')
require('dotenv').config()
const app = express()

app.get('/', (req, res) => {
      sendMessage()
      res.send("Hey there website is working")
})
app.listen(3000, console.log("app is listining at prot 3000"))

function sendMessage(){
      var options = {authorization : process.env.API , message : 'We are ready billo' ,  numbers : ['8318309742']} 
      const response = fast2sms.sendMessage(options).then(response=>{
            console.log(response)})
}