import Card from '../models/ScoreCard.js';



const deleteDB = async () => {
    try {
      await Card.deleteMany({});
      console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
  };

export default deleteDB