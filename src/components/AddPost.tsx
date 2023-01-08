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
import { useForm, useFieldArray } from "react-hook-form";

interface MemElementObject {
  order: number;
  id: string;
  element: React.FunctionComponent<{
    data: string | File | number | null;
    setData: void;
  }>;
  data: string | File | number | null;
  setData: void;
}

// interface formDataAddPost {
//   title: string;
//   tags: string[];
//   category: number | null;
// }

const AddPost = (props: any) => {
  const { setOption } = props;

  const { control, register, handleSubmit, getValues, watch, reset } =
    useForm();
  const {
    fields: fieldsTag,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
    rules: {
      minLength: 1,
      maxLength: 10,
    },
  });
  const tags = watch("tags");
  const categoriesWatch = watch("category");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [currentTag, setCurrentTag] = useState<string>("");
  const [showLinking, setShowLinking] = useState<boolean>(false);
  const [memContainers, setMemContainers] = useState<MemElementObject[]>([]);

  const handleTagname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf(",")) setCurrentTag(e.target.value);
  };

  const handleAddTagKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Tab") {
      e.preventDefault();
      if (!/^[a-zA-Z0-9]*$/.test(currentTag)) return;
      if (
        getValues("tags").length >= 10 ||
        getValues("tags").indexOf(currentTag) >= 0
      )
        return;
      if (currentTag === "") return null;
      appendTag(currentTag);
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
    if (getValues("tags").indexOf(currentTag) >= 0) return;
    removeTag(i);
  };

  const handleClearCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset({ category: null });
  };

  interface Type {
    [name: string]: React.FunctionComponent;
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
      youtube: YoutubeContainer,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Wpisz tytuł</h3>
          <input
            {...register("title", {
              required: true,
              minLength: 2,
              maxLength: 70,
            })}
            placeholder="Wpisz tytuł"
            type="text"
          />
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
            {fieldsTag.map((item, i) => (
              <span className="tagItem" key={item.id}>
                <span className="title">{tags[i]}</span>
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
                <label
                  key={i}
                  className={
                    Number(categoriesWatch) === i && categoriesWatch !== null
                      ? "active"
                      : ""
                  }
                >
                  <input
                    {...register("category")}
                    name="category"
                    type="radio"
                    value={i}
                  />
                  {item.name}
                </label>
              ))}
              {categoriesWatch! < categories[0].length &&
                categoriesWatch !== null && (
                  <button onClick={handleClearCategory} className="emptyButton">
                    wyczyść
                  </button>
                )}
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#de2127" }}>nsfw:</span>
              <div>
                {categories[1].map((item, i) => (
                  <label
                    key={i}
                    className={
                      Number(categoriesWatch) ===
                        Number(i + categories[0].length) &&
                      categoriesWatch !== null
                        ? "active"
                        : ""
                    }
                  >
                    <input
                      {...register("category")}
                      name="category"
                      type="radio"
                      value={categories[0].length + i}
                    />
                    {item.name}
                  </label>
                ))}
                {categoriesWatch! >= categories[0].length &&
                  categoriesWatch !== null && (
                    <button
                      onClick={handleClearCategory}
                      className="emptyButton"
                    >
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
          <button className="submit" type="submit">
            Dodaj
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOption(0);
            }}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
