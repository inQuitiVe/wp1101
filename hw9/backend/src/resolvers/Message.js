const Message = {
    sender(parent, args, { db }, info) {
      return db.Message.find((msg) => {
        return msg.id === parent.sender;
      });
    },
  };
  
  export { Message as default };
  