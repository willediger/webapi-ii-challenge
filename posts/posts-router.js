const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

// this only runs if the url has /api/posts in it
router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

// /api/posts/:id

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the post"
    });
  }
});

module.exports = router;
