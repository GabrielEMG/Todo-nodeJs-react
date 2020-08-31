const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { mongoose } = require("./database");

const app = express();

//Setting
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/tasks", require("./routes/tasks.routes"));
app.use("/users", require("./routes/users.routes"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//Start server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
