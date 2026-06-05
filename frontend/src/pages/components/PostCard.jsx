import React, { useState } from "react";
import axios from "axios";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await axios.put(
        `https://social-media-backend-cgna.onrender.com/api/posts/like/${post._id}`,
        {
          userId: "6a21a13d635e6142ae29f1d3",
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(
        `https://social-media-backend-cgna.onrender.com/api/posts/comment/${post._id}`,
        {
          userId: "6a21a13d635e6142ae29f1d3",
          text: comment,
        }
      );

      setComment("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginTop: "15px",
        borderRadius: "10px",
      }}
    >
      <h3>{post.userId?.username}</h3>

      <p>{post.content}</p>

      <p>Likes: {post.likes?.length}</p>

      <p>Comments: {post.comments?.length}</p>

      <button onClick={handleLike}>
        👍 Like
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleComment}
        style={{ marginLeft: "10px" }}
      >
        Add Comment
      </button>

      <div style={{ marginTop: "15px" }}>
        {post.comments?.map((c, index) => (
          <p key={index}>
            💬 {c.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;