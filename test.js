// const { arrayOfArray } = require('assert-plus');
// const express = require('express');
// const mongoose = require('mongoose');
// const { type } = require('os');
// mongoose.connect("mongodb+srv://bakwas:bakwas@cluster0.uvmz9.mongodb.net/bank_unique_id?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=> console.log("Connection successfull..."))
// .catch((err)=> console.log(err))
// const port = process.env.PORT || 5000;
// let app = express();
// app.use(express.json());


// const schema = new mongoose.Schema({
//     API_KEY:String
// });

// app.get('/api/payment/order/:id', async(req, res)=>{
// 	try{
// 		const _id = (req.params.id)
// 		const accountData = await findData('key_values').find().where('api_key').equals(_id);
//         const data = JSON.stringify(accountData[0])
//         const d = JSON.parse(data)
//         console.log(d.api_value)
// 	}catch(e){
// 		return res.status(400).send(e);
// 	};
// });

// function findData(id){
// 	const model = new mongoose.model(`${id}`, schema);
// 	return model;
// };
// app.listen(port,  ()=>{
// 	console.log(`Connection is stablished at port ${port}`);
// });
