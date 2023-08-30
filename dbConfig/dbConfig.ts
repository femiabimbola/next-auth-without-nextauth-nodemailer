import mongoose from "mongoose";

// Connect is needed to talk to database often
export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected successfully')
    });
    connection.on('error', (err) => {
      console.log('MonogoDB connection error. Please make sure MongoDB is running' + err)
      process.exit();
    })
  } catch (error) {
    console.log('Something is went wrong')
    console.log(error)
  }
}