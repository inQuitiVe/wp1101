import mongoose from "mongoose";

import "dotenv-defaults/config.js";


export default () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true, useUnifiedTopology : true });
  const db = mongoose.connection
  db.once("open", () => {
    console.log("Mongo database connected!");
  });
};