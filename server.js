require('dotenv').config();
const express = require('express');
const loaders = require('./src/loaders');
const routes = require('./src/routers');
const middleWares = require('./src/middlewares');
loaders();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//ROUTES 
app.use('/api/post/', routes.post);
app.use('/api/user/', routes.user);
app.use('/api/comment/', routes.comment);
app.use('/api/books/', routes.book);
app.use('/api/movies/', routes.movie);
app.use('/api/shows/', routes.show);
app.use('/:username', routes.user);
app.get("/", function(req, res){
    res.send("Hello World")
});





app.use(middleWares.errorHandler);

const port = process.env.port || 3001
app.listen(port,() => {
    console.log(`Uygulama ${port} portunda çalışmaya başladı...`)
})