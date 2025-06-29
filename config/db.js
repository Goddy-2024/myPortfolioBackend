import mongoose from 'mongoose';
export const connectDB = async () =>{
      try {
            await mongoose.connect(process.env.localMONGO_URI);
            console.log("Connected to the Mailing Database(MONGODB) Successfully!!!");
      } catch (error) {
            console.error("Failed to connect to the Database", error);
            process.exit(1);
      }
      
}