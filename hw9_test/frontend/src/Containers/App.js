import './App.css'

import { Button, Input, Tag, message, Tabs, Modal } from 'antd'
import useChat from '../hooks/useChat'
import { useState, useEffect, useRef, Fragment} from 'react'
import Header from './Header'
import SignIn from './SignIn'

const { TabPane } = Tabs;
const LOCALSTORAGE_KEY = "save-me";

function App() {
  const {status, messages, sendMessage, clearMessages } = useChat()
  const [textBody, setTBody] = useState('')
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || '');
  const [signedIn, setSignedIn] = useState(false);

  /* for panes */
  const [newTabIndex, setNewTabIndex] = useState(0);
  const [panes, setPanes] = useState(
    [
      { title : '', content : 'content1', key : '0', closable: false},  
    ]
  );
  const [activeKey, setActiveKey] = useState(panes[0].key);
  
  const makeGroup = (s1, s2) => {
    let temp = [s1, s2]
    temp.sort();
    return temp[0] + '_' + temp[1];
  }

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
    /* here control the message */
    setGroup(makeGroup(me, panes[activeKey].title));
  };

  const add = (name) => {
    const activeKey = `${newTabIndex + 1}`;
    console.log(name, activeKey);
    setNewTabIndex(newTabIndex + 1);
    panes.push({ title : name, content: ' new content', key : activeKey});
    setActiveKey(activeKey);
    setPanes(panes);
    setGroup(makeGroup(me, panes[activeKey].title));
  }

  const remove = (targetKey) => {
    let lastIndex;
    panes.forEach( (pane, i) => {
      if (pane.key === targetKey) lastIndex = i;
    });
    const tempPanes = panes.filter((pane) => pane.key !== targetKey);
    let newActiveKey = 0;
    if(tempPanes.length && activeKey === targetKey){
      newActiveKey = 0;
      setActiveKey(0);
    }
    else{
      newActiveKey = activeKey;
      setActiveKey(activeKey);
    }
    setGroup(makeGroup(panes[newActiveKey].title, me));
    for(let i = 0;i < tempPanes.length;i++){
      tempPanes[i].key = i.toString();
    }
    setNewTabIndex(newTabIndex - 1);
    setPanes(tempPanes);
  }

  const onEdit = (targetKey, action) => {
    if(action === 'add'){
      showModal();
    }
    else{
      remove(targetKey);
    }
  }

  /* end for panes */

  /* for Modal */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [currentGroup, setGroup] = useState(makeGroup(me, me));
  const [choice, setChoice] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCanel = () => {
    setIsModalVisible(false);
  }

  const ModalMode = (
    <Modal title = "Basic Modal" visible={isModalVisible} onOk = {handleOk} onCancel={handleCanel}>
      <Input.Search
        enterButton="Chat"
        value = {inputName}
        onChange = { (e) => { setInputName(e.target.value) } }
        onSearch = { (msg) => {
          if(msg === ''){
            displayStatus({type : 'error', msg : 'Invalid username'});
          }
          else{
            let Found = false;
            for(let i = 0;i < panes.length;i++){
              if(panes[i].title === msg) Found = true;
            }
            if(!Found){
              add(msg);
              setInputName('');
              handleOk();
              displayStatus({type : 'success', msg : 'Successfully added user!'});
            }
            else{
              displayStatus({type : 'error', msg : 'Duplicated username'});
            }
          }
        }}
        placeholder="Type a username..."
      ></Input.Search>
    </Modal>
  )

  /* end Modal */
  useEffect(() => {
    if(signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  },[signedIn, me]);

  const bodyRef = useRef(null)

  const displayStatus = (payload) => {
    if(payload.msg) {
        const { type, msg } = payload
        const content = {
          content: msg, duration : 0.5 
        }
        if(type === 'success') message.success(content)
        else if(type === 'error') message.error(content)
      }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])
  

  const NoMsgStyle = (
    <p style={{ color: '#ccc' }}>
          No messages...
    </p>
  )

  const choicePage = (
    <Fragment>
      <div className = "myChoice">
        <Button style = {{height:"200px", fontSize:"30px"}} onClick = {() => {setChoice(1)}}> Group Chat (Basic requirement) </Button>
        <Button style = {{height:"200px", fontSize:"20px"}} onClick = {() => {setChoice(2)}}> One-to-One Chat (Advanced rqeuirement) </Button>
      </div>
    </Fragment>
  )

  const mycharRoom = (
    <Fragment>
      <Header name={me} clearMsg = {clearMessages}> </Header>
      {ModalMode}
      <Tabs style = {{ width : "700px" }} onChange={onChange} activeKey={activeKey} type="editable-card" onEdit={onEdit}>
        {!panes.empty ? panes.map( (pane) => (
          <TabPane  tab = {pane.title} key = {pane.key} closable = {pane.closable}>
          </TabPane>
        )) : <Fragment></Fragment>}
      </Tabs>
      <div className="App-messages">
      {messages.length === 0 ? NoMsgStyle : messages.filter( ({name,body,group}, i) => group === currentGroup ).map( ({name, body, group}, i) => 
          name === me ? 
          (
            <div key = {i} style = {{ display : "flex", flexDirection : "row", alignItems : "end", justifyContent: "end"}}>
              <p key = {i}>{body}<Tag color = "blue">{name}</Tag></p>
            </div>
          )
          :
          (
            <p key = {i}><Tag color = "blue">{name}</Tag>{body}</p>
          )
      ) }
      </div>
      <Input.Search
        ref = {bodyRef}
        enterButton="Send"
        value = {textBody}
        onChange = { (e) => { setTBody(e.target.value) } }
        onSearch = { (msg) => {
          if(textBody === '') {
            return;
          }
          else{
            sendMessage( {name : me, body : msg, group: currentGroup})
            setTBody('')
          }
        }}
        placeholder="Type a message here..."
      ></Input.Search>
    </Fragment>
  )

  const chatRoom = (
    <Fragment>
      <Header name={me} clearMsg = {clearMessages}> </Header>

      <div className="App-messages">
      {messages.length === 0 ? NoMsgStyle : messages.map( ({name, body}, i) => 
          name === me ? 
          (
            <div key = {i} style = {{ display : "flex", flexDirection : "row", alignItems : "end", justifyContent: "end"}}>
              <p key = {i}>{body}<Tag color = "blue">{name}</Tag></p>
            </div>
          )
          :
          (
            <p key = {i}><Tag color = "blue">{name}</Tag>{body}</p>
          )
    ) }
      </div>

      
      <Input.Search
        ref = {bodyRef}
        enterButton="Send"
        value = {textBody}
        onChange = { (e) => { setTBody(e.target.value) } }
        onSearch = { (msg) => {
          if(textBody === '') {
            return;
          }
          else{
            sendMessage( {name : me, body : msg, group :'w' })
            setTBody('')
          }
        }}
        placeholder="Type a message here..."
      ></Input.Search>
    </Fragment>
  )

  const signPage = (
    <Fragment>
      <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}>
      </SignIn>
    </Fragment>
  )

  return (
    <div className="App">
      {signedIn ? choice === 0 ? choicePage : choice === 1 ? chatRoom : mycharRoom : signPage}
    </div>
  )
}

export default App
