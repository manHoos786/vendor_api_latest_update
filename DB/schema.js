const mongoose = require('mongoose')

const data = new mongoose.Schema({
    account_id:String,
    amount: Number,
    t_id:String
});

const Data = new mongoose.model('All_data', data)

module.exports = Data;