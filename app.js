
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;
// const Blog = require('./blog');
const workoutRoutes = require('./routes/workouts');

const DbUrRI = 'mongodb://127.0.0.1/users';
mongoose.connect(DbUrRI,{useNewUrlParser : true,  useUnifiedTopology : true,})
//middleware
app.use(express.json());
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next();
})

app.use(workoutRoutes)

app.listen(PORT, ()=>{
    console.log(`port ${PORT} is now active`)
})