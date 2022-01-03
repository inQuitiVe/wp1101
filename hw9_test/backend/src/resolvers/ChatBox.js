const ChatBox = {
  
  messages(parent, args, { db }, info) {
    const result =  Promise.all(
      parent.messages.map(
        (mId) => db.Message.findOne({id:mId}))
    );
    //console.log(result);
    return result;
  },
};