import Card from '../models/ScoreCard.js';

const SaveCard = async (name,subject,score) => {
    const existing = await Card.findOneAndDelete({ name, subject });
    // console.log(name,subject,score);
    console.log(existing);
    if (existing) {
      try {
        //Card.findOneAndDelete({ name, subject });
        const newCard = new Card({ name, subject,score });
        console.log("Created card", newCard);
        newCard.save();
        return 0;
      }
      catch(e){ throw new Error("Card update error: " + e); }

    }
    try {
      const newCard = new Card({ name, subject,score });
      console.log("Created card", newCard);
      newCard.save();
      return 1;
    } catch (e) { throw new Error("Card creation error: " + e); }
  };


export default SaveCard