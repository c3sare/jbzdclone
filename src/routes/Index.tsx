import "../styles/Posts.css";
import posts from "../data/posts";
import Post from "../components/Post";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdFunnel } from "react-icons/io";
import { useState } from "react";
import AddPost from "../components/AddPost";
import TopFilter from "../components/TopFilter";
import PostFilter from "../components/PostFilter";

const options = [null, <AddPost />, <TopFilter />, <PostFilter />];

const Index = () => {
  const [currentOption, setCurrentOption] = useState<number>(0);

  const setOption = (num: number) => {
    if (num === currentOption) setCurrentOption(0);
    else setCurrentOption(num);
  };

  return (
    <>
      <div className="buttonsMain">
        <button className="addMem" onClick={() => setOption(1)}>
          + Dodaj dzidę
        </button>
        <button onClick={() => setOption(2)}>
          <FaRegCalendarAlt /> Top +{currentOption === 2 && options[2]}
        </button>
        <button onClick={() => setOption(3)}>
          <IoMdFunnel /> Filtruj
          {currentOption === 3 && options[3]}
        </button>
      </div>
      {currentOption === 1 && options[1]}
      <div className="posts">
        {posts.map((postMain) => (
          <Post post={postMain} />
        ))}
      </div>
    </>
  );
};

export default Index;
