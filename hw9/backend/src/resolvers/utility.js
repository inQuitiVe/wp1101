import User from '../Components/User'
import Message from '../Components/Message'
import ChatBox from '../Components/ChatBox'

// return the found user (can be null)
const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    return User.findOne({ name });
};
  
// make sure calling checkUser beforehand
const newUser = (db, name) => {
    return new db.User({ name }).save();
};

const makeName = (name1,name2) =>{
    if (name1>name2) return (name1+'_'+name2);
    else return (name2+'_'+name1);
};

const checkChatBox = (db, name, errFunc) => {
    if (!name) throw new Error("Missing Chat Box name for " + errFunc);
    return ChatBox.findOne({ name });
};

const newChatBox = (db, chatBoxName) => {
    return new ChatBox({ name: chatBoxName }).save();
};

const checkMessage = async(db,from,to,content,errFunc) =>{
    const chatbox = makeName(from,to);
    return{
        chatbox: await checkChatBox(db,chatbox,errFunc),
        sender: await checkUser(db,from,errFunc),
        to: await checkUser(db,to,errFunc),
    };
};

const newMessage = (db, sender, body) => {
    return new Message({sender,body}).save();
};
  
  
export {checkUser,newUser,makeName, checkChatBox,  newChatBox,checkMessage,newMessage};
  