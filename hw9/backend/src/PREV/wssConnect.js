import Message from "../Components/Message";

export const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)) 
}

export const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

export const initData = (ws) => {
    Message.find().sort( { created_at : -1 } ).limit(100).exec((err, res) => {
        if(err) throw err
        sendData(['init', res], ws)
    })
}
