const express = require('express')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const port = process.env.PORT || 5000
require('dotenv').config()
require('./DB/connection')

let app = express()
app.use(express.json())

const Data = require('./DB/schema')
const { create } = require('xmlbuilder')


// Mongooose-----===========================================================


app.post('/verification', async(req, res) =>{
	try{
		const SECRET = 'a65e6cbffa15cd44f2a33fe2f6424929a448320b'  
		const shasum = crypto.createHmac('sha256', SECRET)
		shasum.update(JSON.stringify(req.body))
		const digest = shasum.digest('hex')

		if (digest === req.headers['x-razorpay-signature']) {
			console.log('request is legit')

			const user = new Data({
				account_id:JSON.stringify(req.body.account_id, null, 4),
				amount:JSON.stringify(req.body.payload.payment.entity.amount/100, null, 4),
				t_id:JSON.stringify(req.body.payload.payment.entity.id, null, 4)
			})
			const createuser = await user.save()
			res.status(201).send(createuser)
		}
		console.log(req.body)
	}catch(e){res.status(400).send(e)}
})

app.get('/verify', async(req, res)=>{
	try{
		const currentData = await Data.find();
		res.send(currentData)

	}catch(e){res.status(400).send(e)}
})

app.listen(port, console.log(`Port start lisining at ${port}`))