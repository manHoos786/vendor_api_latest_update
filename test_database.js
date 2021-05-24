const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bank2', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
.then(()=> console.log("connection successful..."))
.catch((e) => console.log(e))

const port = process.env.PORT || 5000



app.use(express.json())

const data = new mongoose.Schema({
    amount: Number,
    t_id:String,
	status:Boolean
});


app.post('/post/:id', async(req, res) =>{
    const acNo = req.params.id
    
    console.log(req.body)
    const user = new sendId(acNo)({
		amount:req.body.amount,
		t_id:req.body.t_id,
        status:false
    })
    const createUser = await user.save()
    res.send(createUser)
})

app.patch('/patch/:id', function (req, res) {
    const uniqueId = req.body._id 
    const bankId = req.params.id
    console.log(uniqueId)
    sendId(bankId).findByIdAndUpdate(uniqueId, {$set:{status:true}} ,(err, docs)=>{
        if(err){
            res.status(404).send("Something went wrong")
        }
        res.send(docs)
    })
});

app.get('/verify/:id', async(req, res)=>{
    const id = req.params.id
    const acData = await sendId(id).find()
    res.send(acData)
})

function sendId(js){
    const Data = new mongoose.model(`${js}`, data)
    return Data
}


app.listen(port, console.log("Connection to 5000...."))