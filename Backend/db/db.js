const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ConnectDatabase = async()=>{
    await mongoose.connect(process.env.DB_URL);
}

module.exports = ConnectDatabase;