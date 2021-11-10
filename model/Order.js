const mongoose = require('mongoose'); 

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    food: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    unique: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Order', OrderSchema);
