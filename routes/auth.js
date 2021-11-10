const express = require('express')
const User = require('../model/User')
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
     
        res.json(user)
    } catch (err) {
      console.error(err.message);  
      res.status(500).send('server error');
    }
}); 


router.post('/', async (req, res) => {
    
    const { email, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ msg: 'Invalid Credentails' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'not match' })
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), (err,token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;