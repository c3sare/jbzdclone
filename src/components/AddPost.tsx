import "../styles/AddPost.css";
import { FaRegImage, FaVideo, FaYoutube, FaTrashAlt } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { categories } from "../data/categories";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageContainer from "./AddPostComponents/ImageContainer";
import TextContainer from "./AddPostComponents/TextContainer";
import VideoContainer from "./AddPostComponents/VideoContainer";
import YoutubeContainer from "./AddPostComponents/YoutubeContainer";

interface MemElementObject {
  order: number;
  id: string;
  element: any;
  data: string | File | number;
  setData: void;
}

const AddPost = () => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [showLinking, setShowLinking] = useState<boolean>(false);
  const [memContainers, setMemContainers] = useState<MemElementObject[]>([]);

  const handleTagname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf(",") < 0) setCurrentTag(e.target.value);
  };

  const handleAddTagKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Tab") {
      e.preventDefault();
      if (tags.length >= 10 || tags.indexOf(currentTag) >= 0) return;
      if (currentTag === "") return null;
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleToggleLinking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowLinking(!showLinking);
  };

  const handleDeleteTag = (
    e: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    e.preventDefault();
    if (tags.indexOf(currentTag) >= 0) return;
    setTags((prevState) => {
      const newState = [...prevState].filter((_item, index) => i !== index);
      return newState;
    });
  };

  const handleActiveCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    i: number,
    prefix = ""
  ) => {
    e.preventDefault();
    setCurrentCategory(prefix + String(i));
  };

  const handleClearCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentCategory("");
  };

  interface Type {
    [name: string]: any;
  }

  const handleAddMemItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();
    const types: Type = {
      image: ImageContainer,
      text: TextContainer,
      video: VideoContainer,
      youtube: YoutubeContainer
    };
    setMemContainers((prev: any) => {
      const id = Date.now();
      const newState = [
        ...prev,
        {
          id,
          order: 0,
          data: null,
          setData: (data: any) => {
            setMemContainers((prevx: any) => {
              const anotherNewState = [...prevx];

              return anotherNewState.map((item) => {
                if (item.id === id) {
                  item.data = data;
                }
                return item;
              });
            });
          },
          element: types[type],
        },
      ];

      return newState;
    });
  };

  return (
    <div className="addPostContainer">
      <form>
        <div>
          <h3>Wpisz tytuł</h3>
          <input placeholder="Wpisz tytuł" type="text" />
        </div>
        {memContainers.map((item, i) => {
          return (
            <div className="memElement" key={i}>
              {React.createElement(item.element, {
                data: item.data,
                setData: item.setData,
              })}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMemContainers((prev) => {
                    const newState = [...prev];

                    return newState.filter((_el, index) => index !== i);
                  });
                }}
              >
                <FaTrashAlt /> Usuń element
              </button>
            </div>
          );
        })}
        <div>
          <h3>Co chcesz dodać?</h3>
          <div className="contentType">
            <button onClick={(e) => handleAddMemItem(e, "image")}>
              <FaRegImage />
              <span>Obrazek/Gif</span>
            </button>
            <button onClick={(e) => handleAddMemItem(e, "text")}>
              <IoDocumentText />
              <span>Tekst</span>
            </button>
            <button onClick={(e) => handleAddMemItem(e, "video")}>
              <FaVideo />
              <span>Video MP4</span>
            </button>
            <button onClick={(e) => handleAddMemItem(e, "youtube")}>
              <FaYoutube />
              <span>Youtube</span>
            </button>
          </div>
        </div>
        <div>
          <h3>Dodaj tagi</h3>
          <input
            type="text"
            placeholder="Wpisz tagi ..."
            value={currentTag}
            onChange={handleTagname}
            onKeyDown={handleAddTagKeys}
          />
          <div className="tags">
            {tags.map((item, i) => (
              <span className="tagItem" key={i}>
                <span className="title">#{item}</span>
                <button onClick={(e) => handleDeleteTag(e, i)}>
                  <IoClose />
                </button>
              </span>
            ))}
          </div>
          <span className="info">
            Aby dodać kolejny tag należy dodać przecinek albo nacisnąć TAB.
          </span>
        </div>
        <div className="categories">
          <h3>
            Gdzie chcesz dodać treść?{" "}
            <span className="optional">{"(opcjonalnie)"}</span>
            <div>
              {categories[0].map((item, i) => (
                <button
                  key={i}
                  className={currentCategory === String(i) ? "active" : ""}
                  onClick={(e) => handleActiveCategory(e, i)}
                >
                  {item.name}
                </button>
              ))}
              {Number(currentCategory) < 100 && currentCategory !== "" && (
                <button onClick={handleClearCategory} className="emptyButton">
                  wyczyść
                </button>
              )}
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#de2127" }}>nsfw:</span>
              <div>
                {categories[1].map((item, i) => (
                  <button
                    key={i}
                    className={
                      currentCategory === "10" + String(i) ? "active" : ""
                    }
                    onClick={(e) => handleActiveCategory(e, i, "10")}
                  >
                    {item.name}
                  </button>
                ))}
                {Number(currentCategory) >= 100 && currentCategory !== "" && (
                  <button onClick={handleClearCategory} className="emptyButton">
                    wyczyść
                  </button>
                )}
              </div>
            </div>
            <div className="linking">
              <button onClick={handleToggleLinking}>
                {!showLinking ? "Pokaż linkowanie" : "Schowaj linkowanie"}
              </button>
              {showLinking && <input placeholder="Wpisz link" type="url" />}
            </div>
          </h3>
        </div>
        <div className="addCancelButtons">
          <button className="submit">Dodaj</button>
          <button>Anuluj</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
