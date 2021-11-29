import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const CardSchema = new Schema({  
  name: String,
  subject: String,
  score : Number
});
const Card = mongoose.model('Card', CardSchema);

export default Card;