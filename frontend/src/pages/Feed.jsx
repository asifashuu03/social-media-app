import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
    const response = await axios.get("http://localhost:5000/api/posts");

    setPosts(response.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>News Feed</h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;