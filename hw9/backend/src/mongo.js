import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'

// mongoDB setting
dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true, useUnifiedTopology : true });
const db = mongoose.connection

export default db;