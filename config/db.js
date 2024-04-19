//in config folder we will put all the files related to configuration, in this we will put all things needs to connect to database, also import morgan which is used to show all the api request , it is a logger basicallys
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected Successfully!!`);
  } catch (error) {
    console.log(`Error in Database : ${error}`);
  }
};

export default connectDB;
