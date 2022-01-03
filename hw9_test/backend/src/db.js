import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ChatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});


const MessageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
});


const UserSchema = new Schema({
  name: { type: String, required: true },
});

    

const Message = mongoose.model('message', MessageSchema)
const ChatBox = mongoose.model('ChatBox', ChatBoxSchema)
const User = mongoose.model('user', UserSchema)

export {Message,ChatBox,User};