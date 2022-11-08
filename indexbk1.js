import { EventEmitter } from "events"; //no support
import express from "express";
import path from "path";
const app = express();
const PORT = 8000;
import fs from "fs";
//
const __dirname = path.resolve();
app.use(express.urlencoded());

//
const fn = __dirname + "userList.csv";
//
app.get("/", (req, res) => {
  console.log("u hit the server", __dirname);
  const data = req.params;
  //   res.send("<h1> hello world!</h1>");
  res.sendFile(__dirname + "/src/regForm.html");
});

app.get("/register", (req, res) => {
  console.log("u hit the server register");
  //res.send("<h1> register hello world!</h1>");
  res.sendFile(__dirname + "/src/regForm.html");
  //   eventEmitter.emit("hiEvent");
});

app.get("/login", (req, res) => {
  console.log("u hit the login ");
  //res.send("<h1> register hello world!</h1>");
  res.sendFile(__dirname + "/src/login.html");
});

app.post("/", (req, res) => {
  console.log("form received");
  // const data = req.body;
  const { email, password } = req.body;
  const dataStr = `${email},${password}`;

  console.log(data);
  res.send(`<h1> form received!</h1>

  <p>
    <a href="/login"> Login now </a>
  </p>`);

  fs.appendFile(fn, dataStr, (error) => {
    error && console.log(error);
    console.log("check the file");
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`You server running at localhost:${PORT}`);
});
