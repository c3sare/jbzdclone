import "../styles/Posts.css";
import posts from "../data/posts";
import Post from "../components/Post";

const Index = () => {
  return (
    <div className="posts">
      {posts.map((postMain) => (
        <Post post={postMain} />
      ))}
    </div>
  );
};

export default Index;
