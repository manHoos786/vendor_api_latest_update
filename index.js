const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const port = process.env.PORT || 5000;
require('dotenv').config();
require('./DB/connection');
let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
const { create } = require('xmlbuilder');

const schema = new mongoose.Schema({
    amount: Number,
    t_id:String,
	account_id:String,
	status:Boolean,
	api_key:String,
	api_value:String,
	product_id : Number,
	quantity:Number,

	machine:String,
	phone:String,
	pass:String
});

app.post("/log_me_in", async(req, res)=>{
	try{
		const password = req.body.pass;
		const phoneNumber = req.body.phone;
		const user =  await findData('marchents').find().where('phone').equals(phoneNumber);
		const data = JSON.stringify(user[0]);
		const d = JSON.parse(data);
		if(password === d.pass){
			return res.status(200).send(d.machine);
		}else{
			return res.status(400).send("Incorrect password.");
		};
	}catch(error){
		return res.status(402).send("Invalid credantials.");
	};
});

app.post("/find_machine", async(req, res)=>{
	try{
		// this method show all the machines owned by a single vendor
		const machineId = req.body.machine;
		const all_machine = await findData(machineId).find().where('status').equals(true);
		console.log(machineId);
		console.log(all_machine)
		res.status(200).send(all_machine);
	}
	catch(error){
		res.status(400).send("No any machine active");
	}
	
});

app.post("/api/payment/order/:id", async(req, res) =>{
	const razorpay_key = req.params.id;
	const accountData = await findData('key_values').find().where('api_key').equals(razorpay_key);
    const data = JSON.stringify(accountData[0])
    const d = JSON.parse(data)
	const instance = new Razorpay({
		key_id : razorpay_key,
		key_secret : d.api_value
	});
	parameter = req.body;

	instance.orders.create(parameter).then((data) =>{
			return res.status(200).send({sub:data, status:"success"});
		})
		.catch((error)=>{
			return res.status(400).send({sub:error, status:"failed"});
		});
});

app.delete('/delete_order/:id', async(req, res) =>{
	try{
		const _id = (req.params.id);
		const deleteData = await findData(_id).findOneAndDelete({_id: req.body._id}, (err)=>{
			if(err){
				return res.status(400).send("Something went wrong.");
			}
			return res.status(200).send("Deleted Successfully");
		})
	}catch(e){
		return res.status(400).send(e);
	};
});

app.post('/verification', async(req, res) =>{
	try{
		const SECRET ='a65e6cbffa15cd44f2a33fe2f6424929a448320b';
		const shasum = crypto.createHmac('sha256', SECRET);
		shasum.update(JSON.stringify(req.body));
		const digest = shasum.digest('hex');

		if (digest === req.headers['x-razorpay-signature']) {
			require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
			const accountNumber = req.body.account_id;
			const user = new findData(accountNumber)({
				product_id:req.body.payload.payment.entity.notes.product_id,
				quantity:req.body.payload.payment.entity.notes.quantity,
				t_id:JSON.stringify(req.body.payload.payment.entity.id, null, 4),
				account_id:JSON.stringify(req.body.account_id, null, 4),
				status:false
			})
			const createuser = await user.save();
			return res.status(201).send(createuser);
		}
		
		return res.status(400).send("something went wrong");
	}catch(e){return res.status(400).send(e)};
});

app.get('/verify/:id', async(req, res)=>{
	try{
		const _id = (req.params.id)
		const accountData = await findData(_id).find().where('status').equals(false);
		const isEmpty = Object.keys(accountData).length === 0 ;
		if(isEmpty){
			return res.status(404).send("No data avilable.");
		}
		else{
			return res.status(200).send(accountData);
		}
	}catch(e){
		return res.status(400).send(e);
	};
});

function findData(id){
	const model = new mongoose.model(`${id}`, schema);
	return model;
};

app.listen(port,  ()=>{
	console.log(`Connection is stablished at port ${port}`);
});