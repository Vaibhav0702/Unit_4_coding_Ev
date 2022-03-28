const app = require("./index");

const connect = require("./configs/db");


app.listen(6000 , async function () {

 try
 {
     await connect();
     console.log("listening on 6000");
 }
 catch(err)
 {
     console.log(err.message);
 }
});