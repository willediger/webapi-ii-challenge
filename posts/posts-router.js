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
  const { title, contents } = req.body;
  if (title && contents) {
    try {
      const post = await db.insert(req.body);
      const fullPost = await db.findById(post.id);
      res.status(201).json(fullPost);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
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

// Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await db.findPostComments(req.params.id);

    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "Comments not found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Comments"
    });
  }
});

// Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", async (req, res) => {
  try {
    const post = await db.remove(req.params.id);

    if (post) {
      res.status(204).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error deleting the post"
    });
  }
});

// Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
router.put("/:id", async (req, res) => {
  try {
    const post = await db.update(req.params.id, req.body);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error updating the post"
    });
  }
});

module.exports = router;
