const Message = {
    sender(parent, args, { db }, info) {
      const result = db.User.findOne({id:parent.sender});
      // console.log(parent.sender);
      //console.log(result);
      return result
    },
  };
  
  export { Message as default };
  