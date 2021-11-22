import express from 'express'
import {GenCard, CalcPoint,ServerGenCard,RunResult,restart} from '../core/getCard.js'

const router = express.Router()

router.get('/start', (_, res) => {
  const HostCard = GenCard(2);
  res.send({ msg: HostCard })
})

router.get('/getcard', (_, res) => {
  const ClientCard = GenCard(1);
  res.send({ msg: ClientCard })
})

router.get('/server', (_, res) => {
  const HostCard = ServerGenCard(1);
  res.send({ msg:  HostCard})
})

router.get('/result', (_, res) => {
  const result = RunResult();
  console.log(result);
  res.send({ msg:  result})
})

router.post('/restart', (_, res) => { 
  restart();
  res.json({ msg: 'The game has restarted.' })
})
export default router
