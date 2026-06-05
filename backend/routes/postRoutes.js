const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Create Post
router.post("/create", async (req, res) => {
  try {
    const { userId, content } = req.body;

    const post = await Post.create({
      userId,
      content,
    });

    res.status(201).json({
      message: "Post Created",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username email")
      .populate("comments.userId", "username");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Like Post
router.put("/like/:postId", async (req, res) => {
  try {
    const { userId } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json({
      message: "Post Liked",
      totalLikes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Comment Post
router.post("/comment/:postId", async (req, res) => {
  try {
    const { userId, text } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      userId,
      text,
    });

    await post.save();

    res.status(200).json({
      message: "Comment Added",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;