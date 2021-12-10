import { useState,useEffect,useRef } from 'react'
import { Button, Input, Tag ,message} from 'antd'
import useChat from './useChat'
import SignIn from './signIn'
import './App.css'
const LOCALSTORAGE_KEY = "save-me";


function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage , clearMessages} = useChat()
  const [me, setMe] = useState(savedMe || "");
  const [body, setBody] = useState('')  // textBody
  const bodyRef = useRef(null)
  const [signedIn,setSignedIn] = useState(false)
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);
  const chatting = () => (
    <>
    <div className="App-title">
        <h1>{me}'s Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages"> 
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
      </div>

      <Input.Search
        value={body}
        ref={bodyRef}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({ name: me, body: msg })
          setBody('')
        }}
      ></Input.Search>
    </>
  );
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
  }}}
  useEffect(() => {

    displayStatus(status)}, [status])


  return (
    <div className="App">
      {signedIn ? chatting() :SignIn({me:me,setMe:setMe,setSignedIn:setSignedIn,displayStatus:displayStatus})}
    </div>

  )
}


export default App
