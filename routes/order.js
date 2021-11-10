const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Order = require('../model/Order')


router.get('/', auth, async(req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id}).sort({date: -1});
        res.send(orders);
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/informations
//@desc   Add new informations
//@access   Private
router.post('/', auth, async(req, res) => {
    
    const { food, quantity, price } = req.body;
    try {
        const neworder = new Order({
            food,
            quantity,
            price,
            user: req.user.id
        });

        const orders = await neworder.save();
        res.send({orders});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', (req, res) =>{
    Order.findByIdAndRemove(req.params.id).exec(),
    function(err){
        if(!err) {
            return res.send('order deleted')
        } else return res.send('order not deleted')
    }
});

router.put('/:id', function(req, res){
    var conditions = {_id: req.params.id};

    Order.findByIdAndUpdate(conditions, req.body)
    .then(doc => {
        if(!doc) {return res.status(400).end();}
        return res.status(200).json(doc)
    })
    .catch(err => next(err));
});



module.exports = router;