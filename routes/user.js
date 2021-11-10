const express = require('express')
const User = require('../model/User')
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();


router.post('/', async (req, res) => {
    
    const { firstname, lastname, email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg: 'User already exist'});
        }

        user = new User({
            firstname, 
            lastname,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
        res.status(500).send('Server Error');
    }
});

router.put('/:id', function(req, res){
    var conditions = {_id: req.params.id};
 
    User.findByIdAndUpdate(conditions, req.body)
    .then(doc => {
        if(!doc) {return res.status(400).end();}
        return res.status(200).json(doc)
    })
    .catch(err => next(err));
});



module.exports = router;

