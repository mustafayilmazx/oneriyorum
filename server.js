require('dotenv').config();
const express = require('express');
const loaders = require('./src/loaders');
const {auth} = require('./src/middlewares/auth');


loaders();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", function(req, res){
    res.send("Hello World")
});


app.get("/:id", function(req, res){
    const id = req.params.id
    res.send(`Hello ${id}`)
})






const port = process.env.port || 3001
app.listen(port,() => {
    console.log(`Uygulama ${port} portunda çalışmaya başladı...`)
})