import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use((req, res, next)=>{
      console.log(`Just received a ${req.method} REQUEST of url ${req.url}`);
      next();
})
app.post("/send-email", async (req, res)=>{
      const {name, email, subject, message} = req.body;
      const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                  user: process.env.APP_NAME,
                  pass: process.env.APP_PASS,
            }
      });

      const mailOptions = {
            from: email,
            to: process.env.APP_NAME,
            subject: `${name} Sent: ${subject}`,
            text: message,
            replyTo: email,

      };
      try {
            await transporter.sendMail(mailOptions);
            if(!mailOptions) return res.status(404).json({message:"Email Not Found!!!"});
            res.status(200).json({message:"Email Sent Successfully!!!"});
      } catch (error) {
            res.status(500).json({message:"Internal Server Error"}).send("Failed to send Email!");
            console.error("Error while trying to send email. FOR DETAILS: ", error)


            
      }
})
const PORT = process.env.PORT;
connectDB().then(
      app.listen(PORT, ()=>{
      console.log(`Server Running Successfully on port ${PORT}!!!`);
})
)
//in ./backend DO npm install cors express nodemailer dotenv
//in ./frontend do npm install axios