const mongoose = require('mongoose')

const buyerData = new mongoose.Schema({
    account_id:String,
    amount: Number,
    order_id:String,
    created_at:Number
});

const Data = new mongoose.model('All_data', buyerData)

module.exports = Data;