import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts',async(_,res) => {
    
    
    const Sort = await Post.find().sort({timestamp:1})
    // console.log(Sort);

    if (Sort){
        //console.log({ message: `success` ,post : Sort});
        res.status(200).send({ message: `success` ,post : Sort})
    }
    else{
        //console.log({ message: `error` ,post : null});
        res.status(403).send({ message: `error` ,post : null})
    }


    
  })

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail',async(req,res) => {
    
    const order={}
    order['postId'] = req
    const task = await Post.find(order)
    
    if (task){
        //console.log({ message: `success` ,post : Sort});
        res.status(200).send({ message: `success` ,post : task})
    }
    else{
        //console.log({ message: `error` ,post : null});
        res.status(403).send({ message: `error` ,post : null})
    }
  })
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost',async(req,res) => {
    let postId = req.body.id
    let content = req.body.buffer
    let title = req.body.title
    const timestamp = moment().format()
    console.log({postId,title,content,timestamp});
    const newPost = new Post({postId,title,content,timestamp})
    const jg = newPost.save()
    
    if (jg){
        //console.log({ message: `success` ,post : Sort});
        res.status(200).json({ message: `success`,post : null})
    }
    else{
        //console.log({ message: `error` ,post : null});
        res.status(403).json({ message: `error`,post : null})
    }
  })
// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post',async(req,res) => {
    
    const pid = req.pId
    const task = await Post.findOneAndDelete({postID:pid})
    
    if (task){
        //console.log({ message: `success` ,post : Sort});
        res.status(200).json({ message: `success`,post : null})
    }
    else{
        //console.log({ message: `error` ,post : null});
        res.status(403).json({ message: `error`,post : null})
    }
  })
export default router