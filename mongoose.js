const mongoose = require('mongoose')
const payment = require("./payment1.json")
mongoose.connect("mongodb://localhost:27017/data", { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connection successfull..."))
.catch((err)=> console.log(err))

const playListDb = new mongoose.Schema({
    entity : String,
    account_id : String,
    amount : Number
});

const Playlist = new mongoose.model("playlist", playListDb)

const createDoc = async ()=> {
    try{
        const reactPlaylist = new Playlist({
            entity : payment.entity,
            account_id : payment.payload.payment.entity.id,
            amount : payment.payload.payment.entity.amount
        })
        const result = await reactPlaylist.save();
        console.log(result)

    }catch(err){
        console.log(err)
    }
}
createDoc();
