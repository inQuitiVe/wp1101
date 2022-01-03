import {Button} from 'antd'
import {useState} from 'react'
import './App.css'

const Header = (props) => {
    return(
        <div className = "App-title">
            <h1> {props.name}'s Chat Room </h1>
            <Button type = "primary" danger onClick = {props.clearMsg} >
                Clear
            </Button>
        </div>
    )
}

export default Header 