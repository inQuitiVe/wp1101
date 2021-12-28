import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
});
  
const Message = mongoose.model('message', MessageSchema)

export default Message;