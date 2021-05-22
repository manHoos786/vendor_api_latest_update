const express = require('express')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/data", { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connection successfull..."))
.catch((err)=> console.log(err))
require('dotenv').config()

const port = process.env.PORT || 5000
let app = express()
app.use(bodyParser.json())
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


// Mongooose-----================================================================

const playList = new mongoose.Schema({
	acid:String,
	amount:Number,
	currency:String
});

const Playlist = new mongoose.model("account", playList)


// =========================================================================

// app.get('/', (req, res) => {
//     res.send("Hello this is me") 
// });

app.post('/verification', (req, res) =>{
    const secret = '123456'
    
	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	// console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')

		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
		console.log(JSON.stringify(req.body.payload.payment.entity.id, null, 4))
		
        const createDoc = async ()=>{
			try{
				const userData = new Playlist({
					acid:JSON.stringify(req.body.payload.payment.entity.id, null, 4),
					amount:JSON.stringify(req.body.payload.payment.entity.amount, null, 4),
					currency:JSON.stringify(req.body.payload.payment.entity.currency, null, 4)
				})
				const result = await userData.save()
				console.log(result)
				
			}
			catch(err){
				console.log(err)
			}
		}
		createDoc();


	} else {
		// pass i\
	}
    res.json({status : 'OK'})
})

console.log("Port start lisining at 5000")

app.listen(port)