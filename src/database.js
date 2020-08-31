const mongoose = require("mongoose");

const URI = "mongodb://localhost/mern-todo-app";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
