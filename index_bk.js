import { EventEmitter } from "events"; //no support
import express from "express";
// import { appendFile } from "fs";
// const EventEmitter = require("events");
const app = express();
const PORT = 8000;

console.log("Hello World node here after nodemon , package json!!!");

//create instance
const eventEmitter = new EventEmitter();
console.log(eventEmitter);
//creating event named: hiEvent as event
eventEmitter.on("hiEvent", () => {
  console.log("hiEvent is created");
});

app.get("/", (req, res) => {
  console.log("u hit the server");
  res.send("<h1> hello world!</h1>");
  eventEmitter.emit("hiEvent");
});
app.get("/register", (req, res) => {
  console.log("u hit the server register");
  res.send("<h1> register hello world!</h1>");
  eventEmitter.emit("hiEvent");
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`You server running at localhost:${PORT}`);
});

//
// import express from 'express';
