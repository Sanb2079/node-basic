import express from "express";
const app = express();
const PORT = 8000;

import path from "path";
import fs from "fs";

const __dirname = path.resolve();
//to inject the middleware, during the request life cycle
app.use(express.urlencoded());

const fn = __dirname + "/userList.csv";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/regForm.html");
});

app.post("/", (req, res) => {
  const { email, password } = req.body;
  const dataStr = `${email},${password}`;
  console.log(dataStr);

  fs.appendFile(fn, dataStr, (error) => {
    error && console.log(error);

    console.log("check the file");
  });

  res.send(`<h1>form received</h1>
  <p> <a href="/login"> Login now </a> </p>
  `);
});

app.get("/login", (req, res) => {
  console.log("you hit the login  sever");
  res.sendFile(__dirname + "/src/loginForm.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //read the file for :email n pw
  fs.readFile(fn, (error, data) => {
    error && console.log(error);
    // console.log(data);
    // console.log(data.toString());
    const usrList = data.toString();
    const usrArg = usrList.split("\n");
    console.log(usrList, usrArg);

    usrArg.includes(dataStr)
      ? res.send("logged in")
      : res.send("Invalid login");
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server runnin at http://localhost:${PORT}`);
});
