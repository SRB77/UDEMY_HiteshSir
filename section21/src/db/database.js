const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" ✅ Connect to the Database successfull");
    } catch (error) {
        console.error('❌ MongoDB connection Error' , error);
    }
}

module.exports = connectDB;