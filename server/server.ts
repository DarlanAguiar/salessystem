const routes = require("./routes");

//console.log("express typescript");
const express = require("express");
const cors = require("cors");
const { resolve } = require("path");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(resolve(__dirname, "../build")));

app.use("/home", routes);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Servidor rodando");
});
