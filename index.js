const app = require("./src/app.js");
const pool = require("./src/pool.js");

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: "socialnetwork",
    user: "postgres",
    password: "admin",
  })
  .then(() => {
    app().listen(3005, () => console.log("Port: 3005"));
  })
  .catch((err) => console.log(err));
