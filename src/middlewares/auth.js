const users = ['mustafa','gülcan','güler','mehmet','emirhan','zeynep'];
const pwd = "Mustafa12";

const auth =  (req,res,next) => {
    const password = req.body.password;
    if ( password != pwd ){
        res.send("Başarısız");
    }
    users.push(req.body.username);
    console.log(users);
    next();
}

module.exports = {auth};