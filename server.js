require('dotenv').config();
const express = require('express');
const loaders = require('./src/loaders');
const errorHandler = require('./src/middlewares/errorHandler')
const routes = require('./src/routers');
loaders();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//ROUTES 
app.use('/api/login',routes.login);
app.use('/api/signup',routes.signup);

app.get("/", function(req, res){
    res.send("Hello World")
});



app.use(errorHandler);

const port = process.env.port || 3001
app.listen(port,() => {
    console.log(`Uygulama ${port} portunda çalışmaya başladı...`)
})