const express = require('express');

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

const mongoose = require("mongoose");
mongoose.connect('mongodb://mongo/apinode');

server.use(express.urlencoded());
server.use(express.json());

const cors = require('cors');
server.use(cors());

const postRoute = require("./routes/postRoute");
postRoute(server);

const commentRoute = require("./routes/commentRoute");
commentRoute(server);

server.listen(port, hostname);

