import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Route from './src/routes/route.js'


const app = express()

// init middleware
app.use(cors())
app.use(bodyParser.json());


// define routes
app.use('/api', Route)

// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

require('dotenv').config({ path: './password.env' });
console.log('##############################');
console.log(process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => console.log("mongo db connection created"));
  


// mongoose.connect('mongodb+srv://ericchiu:ericchiu123@cluster0.smwju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })


// const saveUser = async (id, name) => {
//   const existing = await User.findOne({ name });
//   if (existing) throw new Error(`data ${name} exists!!`);
//   try {
//     const newUser = new User({ id, name });
//     console.log("Created user", newUser);
//     return newUser.save();
//   } catch (e) { throw new Error("User creation error: " + e); }
// };

// const deleteDB = async () => {
//   try {
//     await User.deleteMany({});
//     console.log("Database deleted");
//   } catch (e) { throw new Error("Database deletion failed"); }
// };

// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", async () => {
//   await deleteDB();
//   await saveUser(57, "Ric");
//   await saveUser(108, "Sandy");
//   await saveUser(77, "Peter");
// });
 