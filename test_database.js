const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("connection successful..."))
.catch((e) => console.log(e))

const port = process.env.PORT || 5000
const jjjj = ""



app.use(express.json())

const data = new mongoose.Schema({
    account_id:String,
    amount: Number,
    t_id:String
});


app.post('/post/:id', async(req, res) =>{
    const acNo = req.params.id
    
    console.log(req.body)
    const user = new sendId(acNo)({
        account_id:req.body.account_id,
		amount:req.body.amount,
		t_id:req.body.t_id
    })
    const createUser = await user.save()
    res.send(createUser)
})

// app.get('/verify', async(req, res)=>{
//     const i = await Data.find()
//     res.send()
// 	// try{
// 	// 	const _id = (req.params.id)
// 	// 	const accountData = await Data.find({account_id:_id}).exec();
// 	// 	if(!accountData){
// 	// 		return res.status(404).send("Invalid id...")
// 	// 	}
// 	// 	else{
// 	// 		res.send(accountData)
// 	// 	}
// 	// }catch(e){
// 	// 	console.log("error is here")
// 	// 	res.status(400).send(e)
// 	// }
// })

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