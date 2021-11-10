const express = require('express');
const connectDB = require('./config/db');
const path = require('path')


const app = express();

connectDB();

app.use(express.json({extened: false}))

app.use("/api/users", require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/order', require('./routes/order'));

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stated at port ${PORT}`))