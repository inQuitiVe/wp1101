

// return the found user (can be null)
const checkUser = async (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    const result = await db.User.findOne({ name : name });
    //console.log(name + result);
    return result;
};
  
// make sure calling checkUser beforehand
const newUser = (db, name) => {
    return new db.User({ name:name }).save();
};

const makeName = (name1,name2) =>{
    if (name1>name2) return (name1+'_'+name2);
    else return (name2+'_'+name1);
};

const checkChatBox = async (db, name, errFunc) => {
    if (!name) throw new Error("Missing Chat Box name for " + errFunc);
    const CB = await db.ChatBox.findOne({ name:name });
    //console.log(name);
    return CB;
};

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBox({ name: chatBoxName }).save();
};

const checkMessage = async(db,from,to,content,errFunc) =>{
    const chatbox = makeName(from,to);
    return{
        chatBox: await checkChatBox(db,chatbox,errFunc),
        sender: await checkUser(db,from,errFunc),
        reciever: await checkUser(db,to,errFunc),
    };
};

const newMessage = (db, sender, body) => {
    return new db.Message({sender,body}).save();
};
  
  
export {checkUser,newUser,makeName, checkChatBox,  newChatBox,checkMessage,newMessage};
  