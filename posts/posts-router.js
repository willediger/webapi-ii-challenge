const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

// Returns an array of all the post objects contained in the database.
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

// Returns the post object with the specified id.
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

//Creates a post using the information sent inside the `request body`.
router.post("/", async (req, res) => {
  try {
    const post = await db.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error adding the post"
    });
  }
});

// Creates a comment for the post with the specified id using information sent inside of the `request body`.
router.post("/:id/comments", async (req, res) => {
  try {
    //commentToInsert = form of {text, post_id}
    // req.body has form of {text}
    const commentToInsert = { ...req.body, post_id: req.params.id };
    const comment = await db.insertComment(commentToInsert);
    console.log("comment", comment);
    res.status(201).json(comment);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error adding the comment"
    });
  }
});

module.exports = router;
