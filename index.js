const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const port = process.env.PORT || 5000
require('dotenv').config()
require('./DB/connection')

let app = express()
app.use(express.json())

const { create } = require('xmlbuilder')

//Mongoose schema .............==================================

const schema = new mongoose.Schema({
    amount: Number,
    t_id:String,
	status:String
});

// Mongooose-----===========================================================


app.post('/verification', async(req, res) =>{
	try{
		const SECRET = 'a65e6cbffa15cd44f2a33fe2f6424929a448320b'  
		const shasum = crypto.createHmac('sha256', SECRET)
		shasum.update(JSON.stringify(req.body))
		const digest = shasum.digest('hex')

		if (digest === req.headers['x-razorpay-signature']) {
			const accountNumber = req.body.account_id
			const user = new findData(accountNumber)({
				amount:JSON.stringify(req.body.payload.payment.entity.amount/100, null, 4),
				t_id:JSON.stringify(req.body.payload.payment.entity.id, null, 4),
				status:"false"
			})
			const createuser = await user.save()
			res.status(201).send(createuser)
		}
		console.log(req.body)
	}catch(e){res.status(400).send(e)}
})

app.get('/verify/:id', async(req, res)=>{
	try{
		const _id = (req.params.id)
		const accountData = await findData(_id).find();
		const isEmpty = Object.keys(accountData).length === 0 
		if(isEmpty){
			return res.status(404).send("Invalid id...")
		}
		else{
			res.send(accountData)
		}
	}catch(e){
		console.log("error is here")
		res.status(400).send(e)
	}
})

function findData(id){
	const model = new mongoose.model(`${id}`, schema)
	return model
}

app.listen(port, console.log(`Port start lisining at ${port}`))
