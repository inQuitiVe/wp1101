import WebSocket from 'ws'
import mongoose from 'mongoose'
import http from 'http'
import Message from './Components/Message'
import express from 'express'
import { initData, sendData, sendStatus } from './PREV/wssConnect'
import dotenv from 'dotenv-defaults'
import cors from 'cors'
import router from './PREV/Route/router'

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true, useUnifiedTopology : true });
const app = express()
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use('/', router);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
}

db.once('open', () => {
    wss.on('connection', (ws) => {
        initData(ws);
        console.log('listening')
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [ task, payload ] = JSON.parse(data);
            console.log(task);
            if(task == 'input'){
                const { name, body, group } = payload; 
                const message = new Message({name, body, group})
                try { await message.save(); }
                catch (e) { throw new Error ('Message DB save error : ' + e);}
                broadcastMessage(['output', [payload]], {type : 'success', msg : 'Message sent.'});
                /*
                sendData(['output', [payload]], ws)
                sendStatus({
                    type: 'success',
                    msg: 'Message sent.'
                }, ws)
                */
            }
            else if( task === 'clear' ){
                Message.deleteMany({}, () => {
                    wss.clients.forEach((client) => {
                        sendData(['cleared'], client);
                        sendStatus({type : 'success', msg : 'Message cache cleared.'}, client);
                    })
                })
            }
        }
    })

    const PORT = process.env.port || 5000

    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
    
})