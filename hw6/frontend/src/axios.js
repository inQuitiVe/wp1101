import axios from 'axios'


const instance = axios.create
  ({ baseURL: 'http://localhost:4000/api/guess' })


const startGame = async () => {
  try {
        const { data: { msg } } = await instance.get('/start')
        return msg
    }
    catch (error) { 
        alert(`${error.name}: ${error.message}`) 
    }
}


const Card = async () => {
    try {
        const { data: { msg } } = await instance.get('/getcard')
        return msg
    }
    catch (error) { 
        alert(`${error.name}: ${error.message}`) 
    }
  }


const Result1 = async () => {
  try {
      const { data: { msg } } = await instance.get('/server')


      return msg
  }
  catch (error) { 
      alert(`${error.name}: ${error.message}`) 
  }
}


const Result2 = async () => {
  try {
      const { data: { msg} } = await instance.get('/result')

      return msg
  }
  catch (error) { 

      alert(`${error.name}: ${error.message}`) 
  }
}


const restart = async () => {
    const { data: { msg } } = await instance.post('/restart')
    return msg
  }

export { startGame, Card, Result1, Result2, restart}
  

