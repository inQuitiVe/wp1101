import express from 'express'
import User from '../Components/User'
const router = express.Router();

router.get('/signin', async (req, res) => {
    const quser = req.query.username;
    const qpass = req.query.password;
    const existing = await User.findOne({username : quser, password : qpass,});
    console.log(existing);
    if(existing){
        res.send({ result : true });
    }
    else{
        res.send({ result : false });
    }
});

router.post('/signup', async (req, res) => {
    console.log(req.body);
    const quser = req.body.username;
    const qpass = req.body.password;
    const existing = await User.findOne({username : quser});
    if(existing){
        res.send({ result : false });   
    }
    else{
        const newuser = new User({
            username : quser,
            password : qpass,
        });
        await newuser.save();
        res.send({ result : true });
    }
})

export default router