import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    from: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps:true
    }
);
export const Message = mongoose.model(MessageSchema, 'Message');
