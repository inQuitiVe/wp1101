import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { Fragment } from 'react';
import { useState } from 'react';
import axios from '../axios'
const SignIn = ({me , setMe, setSignedIn, displayStatus }) => {
    const [password, setPass] = useState('');
    const [mode, setMode] = useState(true); // true means sign in , false means sign up

    const requestSignIn = async (name) => {
        if(!name || password === '') displayStatus({type : 'error', msg: 'Missing user name or password', }); 
        else { 
            const { data : { result }, } = await axios.get('/signin', {
                params: {
                    username : me,
                    password : password,
                }
            })
            console.log(result);
            if(result){
                setSignedIn(true);
            }
            else{
                displayStatus({type : 'error', msg : 'Wrong username or password'});
            }
        }
    }

    const requestSignUp = async (name) => {
        if(!name || password === '') displayStatus({type : 'error', msg: 'Missing user name or password', }); 
        else { 
            const { data : { result }, } = await axios.post('/signup', {
                username : me,
                password : password,
            })
            console.log(result);
            if(result){
                displayStatus({type : 'success', msg : 'Sign up successfully!'});
            }
            else{
                displayStatus({type : 'error', msg : 'Invalid username or password '});
            }
        }
    }

    return (
        <Fragment>
            <div className = "App-title">
                <h1>My Chat Room</h1>
                <Button onClick = {() => {setMode(!mode);}}>{mode ? 'Sign Up' : 'Sign In'}</Button>
            </div>
            <Input.Search prefix={<UserOutlined />} value = {me} enterButton={mode ? "Sign In" : "Sign Up"} onChange={(e) => setMe(e.target.value)}
            placeholder='Enter your name' size="large" style = {{width : 300, margin: 50 }} onSearch={ mode ? requestSignIn : requestSignUp}></Input.Search>
            <Input.Password prefix = {<UserOutlined/>} placeholder= 'Enter your password' size = "large" style = {{width : 300, margin : 50 }} onChange= {(e) => setPass(e.target.value)} value ={password}></Input.Password>
        </Fragment>
    )
}

export default SignIn