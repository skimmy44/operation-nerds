import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Post from "components/Post";
import PostFactory from "components/postFactory";

const Home = ({ userObj }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const postArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postArray);
      });
  }, []);

  return (
    <div className="container">
      <PostFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;