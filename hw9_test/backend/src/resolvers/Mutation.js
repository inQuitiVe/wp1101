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
    console.log(chatBox);
    return chatBox;
  },
  async createMessage(parent,{from,to,body},{db,pubsub},info){
    const {chatBox,sender,reciever} = await checkMessage(db,from,to,body,"createMessage");
    //console.log("###########################"+ chatBox);
    if (!chatBox) throw new Error("ChatBox not found for createMessage");
    if (!sender) throw new Error("User not found " + sender);
    if (!reciever) throw new Error("User not found " + reciever);

    const ChatBoxname = makeName(from,to);
    console.log(sender,body);
    const newMsg = await newMessage(db,sender,body);

  

    const AAA = await db.ChatBox.update({name:ChatBoxname},{$push:{messages:newMsg}});



    pubsub.publish(`chatBox ${ChatBoxname}`,{
      message: { mutation: "CREATED", message:newMsg},
    });
    return newMsg;
  }
};

export { Mutation as default };
