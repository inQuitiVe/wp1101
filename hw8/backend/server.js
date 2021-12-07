import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import dotenv from 'dotenv-defaults'
import { sendData, sendStatus, initData } from './wssConnect'
import WebSocket from 'ws'
import Message from './models/message'

const db = mongoose.connection
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
dotenv.config();

// const broadcastMessage = (data, status) => {
//     wss.clients.forEach((client) => {
//       sendData(data, client);
//       sendStatus(status, client);
//     });
//   };


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((res) => console.log("mongo db connection created"));


db.once('open', () => {
    console.log('MongoDB connected!')
  
    wss.on('connection', (ws) => {
        initData(ws);

        ws.onmessage = async (byteString) => {
          const { data } = byteString
          const [task, payload] = JSON.parse(data)
          switch (task) {
            case 'input': {
              const { name, body } = payload
              const message
                = new Message({ name, body })
              try { await message.save();
              } catch (e) { throw new Error
                ("Message DB save error: " + e);
              }
              sendData(['output', [payload]],ws)
              sendStatus({type:'success',msg:'Message sent.'},ws)
            break
            }

            case 'clear': {
              try { await Message.deleteMany({});
              } catch (e) { throw new Error
                ("Message DB delete error: " + e);
              }
              sendData(['cleared'],ws)
              sendStatus({ type: 'info', msg: 'Message cache cleared.'},ws)
                break
              }
          default: break
        }
    }
    })
    const PORT = process.env.port || 4000;
    server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
    })

  })
  