import express from 'express'
import SaveCard from './ADD.js'
import SearchCard from './GET.js'
import deleteDB from './DEL.js'
import Card from '../models/ScoreCard.js';


const router = express.Router()

router.post('/create-card', async(req, res) => {
    const success = await SaveCard(req.body.name,req.body.subject,req.body.score)
    console.log(success);
    if (success){
          res.json({ message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})` ,card : true})
    }
    else{
          res.json({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`,card : true  })
    }
})

router.delete('/clear-db', (_, res) => {
  deleteDB()
  res.json({ message: "deleted" })
})

router.get('/query-cards',async(req,res) => {
  let {type, queryString} = req.query;
  console.log(type,queryString);
  const Query = {};
  Query[type] = queryString;
  const data = await Card.find(Query)

  console.log(data);
  if (data.length === 0){
      res.send({message: `(${type} (${queryString}) not found!)`, messages: undefined})
  }
  else {
    const messages = data.map((item)=>
      `(name: ${item.name}, subject: ${item.subject},score: ${item.score})`
    )
    console.log(messages);
    res.send({messages: messages, message:''})
  }

})

export default router
