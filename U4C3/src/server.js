const app = require("./index");

const connect = require("./configs/db");


app.listen(5000, async () => {
    try {
      await connect();
      console.log("listen on 5000");
    } catch (err) {
      console.log(err);
    }
  });
  