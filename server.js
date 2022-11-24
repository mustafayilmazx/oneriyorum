const express = require('express');
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


app.post("/create-post", function(req,res){
    const data = req.body;
    const title = data.title;
    const content = data.content;
    console.log(title + ' ' + content);
    res.write(`Hello ${title}`);
    res.status(201).send()
})

app.listen(3000)