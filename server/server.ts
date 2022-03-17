const routes = require("./routes");

const express = require("express");
const cors = require("cors");
const { resolve } = require("path");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(resolve(__dirname, "../build")));

app.use("/", routes);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Servidor rodando");
});
