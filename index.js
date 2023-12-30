const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 4000;
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


const start = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/index', {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }),

    app.get('*', checkUser);
    app.get('/', requireAuth, (req, res) => res.render('home'));
    app.get('/smothies', requireAuth,(req, res) => res.render('smothies'));
    app.use(authRoutes)
    app.listen(PORT, ()=>{
        console.log(`localHost boot at port ${PORT}`)
    })

    }catch(error){
        console.log('Error in the server', error.message);
    }
    
};


start();