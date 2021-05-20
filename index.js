const express = require('express')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const fast2sms = require('fast-two-sms')
require('dotenv').config()

const port = process.env.PORT || 5000
let app = express()
app.use(bodyParser.json())
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Hello this is me") 
});

app.post('/verification', (req, res) =>{
    const secret = '123456'
    
	send()

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	// console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')

		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
		const detail = require('./payment1.json')
		
        console.log(detail.payload.payment.entity.amount)

	} else {
		// pass i\
	}
    res.json({status : 'OK'})
})

console.log("Port start lisining at 5000")

app.listen(port)


function send(){
	console.log('message is sending')
	var options = {authorization : process.env.API , message : 'Payment completed',  numbers : ['7860290907']} 
	const response = fast2sms.sendMessage(options).then(response=>{console.log(response)})
}