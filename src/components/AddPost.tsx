import "../styles/AddPost.css";
import { FaRegImage, FaVideo, FaYoutube, FaTrashAlt } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { categories } from "../data/categories";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { BiMove } from "react-icons/bi";
import ImageContainer from "./AddPostComponents/ImageContainer";
import TextContainer from "./AddPostComponents/TextContainer";
import VideoContainer from "./AddPostComponents/VideoContainer";
import YoutubeContainer from "./AddPostComponents/YoutubeContainer";
import { useForm, useFieldArray } from "react-hook-form";
import CheckUrl from "./AddPostComponents/CheckUrl";

function isValidHttpUrl(link: string) {
  let url;
  try {
    url = new URL(link);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const AddPost = (props: any) => {
  const { setOption } = props;
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    unregister,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    fields: fieldsTag,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
    rules: {
      required: "Dodaj przynajmniej jeden tag!",
      minLength: 1,
      maxLength: 10,
    },
  });
  const {
    fields: fieldsMemContainers,
    append: appendMemContainer,
    remove: removeMemContainer,
  } = useFieldArray({
    control,
    name: "memContainers",
    rules: {
      required: "Przynajmniej jeden element jest wymagany!",
      minLength: 1,
      maxLength: 10,
      validate: (val: any) => {
        return val.filter((item: any) => item.data === null).length === 0;
      },
    },
  });

  const tags = watch("tags");
  const categoriesWatch = watch("category");
  const memContainers = watch("memContainers");
  const linking = watch("linking");
  const linkingCustomImage = watch("linkingCustomImage");

  useEffect(() => {
    if (linking) {
      register("linkingUrl", { required: "To pole jest wymagane" });
    } else {
      unregister("linkingUrl");
      unregister("linkingCustomImage");
    }
    // eslint-disable-next-line
  }, [linking]);

  const linkingUrl = watch("linkingUrl");

  useEffect(() => {
    if (linking) if (linkingCustomImage) setValue("linkingCustomImage", []);
    // eslint-disable-next-line
  }, [linkingUrl]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [currentTag, setCurrentTag] = useState<string>("");

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
    appendMemContainer({
      order: 0,
      data: null,
      setData: (data: any, index: number) => {
        setValue(`memContainers.${index}.data`, data);
      },
      element: types[type],
    });
  };

  return (
    <div className="addPostContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Wpisz tytuł</h3>
          <input
            {...register("title", {
              required: "To pole jest wymagane!",
              minLength: 2,
              maxLength: 70,
            })}
            placeholder="Wpisz tytuł"
            type="text"
          />
          {errors?.title && (
            <p className="error">{String(errors.title?.message)}</p>
          )}
        </div>
        {fieldsMemContainers.map((item: any, i: number) => {
          return (
            <div className="memElement" key={item.id}>
              <item.element
                data={memContainers[i].data}
                setData={memContainers[i].setData}
                index={i}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeMemContainer(i);
                }}
              >
                <FaTrashAlt /> Usuń element
              </button>
              <button className="moveButton">
                <BiMove />
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
          {errors?.memContainers && (
            <p className="error">
              {String(errors.memContainers?.root?.message)}
            </p>
          )}
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
          {errors?.tags && (
            <p className="error">{String(errors.tags?.root?.message)}</p>
          )}
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
              <label>
                <input
                  type="checkbox"
                  {...register("linking")}
                  defaultChecked={false}
                />
                {!linking ? "Pokaż linkowanie" : "Schowaj linkowanie"}
              </label>
              {linking && (
                <>
                  <input
                    placeholder="Wpisz link"
                    type="url"
                    onBlur={(e) => {
                      if (
                        isValidHttpUrl(e.target.value) ||
                        e.target.value === ""
                      ) {
                        if (e.target.value !== "") setLoading(true);
                        setValue("linkingUrl", e.target.value);
                      }
                    }}
                  />
                  {errors.linkingUrl?.message && (
                    <p className="error">
                      {String(errors.linkingUrl?.message)}
                    </p>
                  )}
                  {linkingUrl !== undefined && (
                    <CheckUrl
                      setLoading={setLoading}
                      data={linkingUrl}
                      register={register}
                      linkingCustomImage={linkingCustomImage}
                    />
                  )}
                </>
              )}
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
        {loading && (
          <div className="loading">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPost;
