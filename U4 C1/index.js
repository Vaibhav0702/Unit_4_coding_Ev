const express = require ("express");

const app = express();

app.use(logger);

app.get("/books",(req,res) => {

    return res.send({ route: "/books"});
});

app.use(checkPermission);

app.get("/libraries",(req,res) => {

    return res.send({ route: "/libraries", permission: res.path});
});

app.get("/authors",(req,res) => {

    return res.send({ route: "/authors", permission: res.path});
});

function logger (req,res,next){
    console.log("before route handler");
    next();
    console.log("after route handler");

}

function checkPermission (req,res,next){
    if(req.path=="/libraries")
    {
        res.path =true ;
    }
    if(req.path=="/authors")
    {
        res.path =true ;
    }
    console.log("checkPermission befor handler");
    next();
    console.log("checkPermission after handler")
}


app.listen(4000,() => {

    console.log("listening on port 4000");
})