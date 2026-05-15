const {  mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error in connecting DB", error);
  }
};

module.exports = connectDB;
