const express = require('express');
const app = express();
const {auth} = require('./src/middlewares/auth');

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.get("/", function(req, res){
    res.send("Hello World")
});


app.get("/:id", function(req, res){
    const id = req.params.id
    res.send(`Hello ${id}`)
})


app.post("/create",auth,(req,res) => {
    res.send("Başarılı");
})




app.listen(3000)