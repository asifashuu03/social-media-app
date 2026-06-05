import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post(
        "https://social-media-backend-cgna.onrender.com/api/posts/create",
        {
          content,
          userId: user._id || user.id,
        }
      );

      alert("Post created successfully!");
      setContent("");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;