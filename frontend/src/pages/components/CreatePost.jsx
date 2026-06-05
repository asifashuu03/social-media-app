import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      console.log("User:", user);

      await axios.post("http://localhost:5000/api/posts/create", {
        content,
        userId: user.id,
      });

alert("Post created successfully!");
window.location.reload();      
      setContent("");
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