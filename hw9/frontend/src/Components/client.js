export const client = new WebSocket('ws://localhost:5000')

export const sendData = async (data) => {
    await client.send(JSON.stringify(data));
};

