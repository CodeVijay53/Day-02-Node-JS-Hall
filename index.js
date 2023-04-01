const express = require("express");

const mongo = require("./shared");

const getRouter = require("./router/hall");

const app = express();

app.use(express.json());

mongo.connect();

app.use("/room", getRouter);

app.listen("8000");
