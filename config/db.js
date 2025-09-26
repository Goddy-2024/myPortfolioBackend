import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () =>{
      try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("Connected to the Mailing Database(MONGODB) Successfully!!!");
      } catch (error) {
            console.error("Failed to connect to the Database "+error+" ,defaulting DB Connection proceeding to connect server");
            
      }
      
}