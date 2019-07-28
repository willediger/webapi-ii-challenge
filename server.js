const express = require("express");

const postsRouter = require("./posts/posts-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Posts API</h2>
    <p>Welcome${nameInsert} to the Lambda Posts API</p>
    `);
});

module.exports = server;
