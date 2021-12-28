import  {checkUser,newUser,makeName, checkChatBox,  newChatBox,checkMessage,newMessage} from './utility';

const Mutation = {
  async createChatBox(parent, {name1,name2}, {db,pubsub}, info) {

    if (!name1 || !name2)
      throw new Error("Missing chatBox name for CreateChatBox");

    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }

    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name2);
      await newUser(db, name2);
    }

    const chatBoxName = makeName(name1, name2);
    let chatBox = 
      await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) chatBox = await newChatBox(db, chatBoxName);

    return chatBox;
  },
  async createMessage(parent,{from,to,messeage},{db,pubsub},info){
    const {chatBox,sender,reciever} = await checkMessage(db,from,to,message,"createMessage");
    if (!chatBox) throw new Error("ChatBox not found for createMessage");
    if (!sender) throw new Error("User not found " + sender);
    if (!reciever) throw new Error("User not found " + reciever);

    const ChatBox = makeName(from,to);
    const newMsg = await newMessage(db,sender,message);
    ChatBox.messages.push(newMsg);
    await ChatBox.save();

    pubsub.publish(`chatBox ${ChatBox}`,{
      message: { mutation: "CREATED", message:newMsg},
    });
    return newMsg;
  }
};

export { Mutation as default };
