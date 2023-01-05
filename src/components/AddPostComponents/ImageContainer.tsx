import { TiUpload } from "react-icons/ti";
import {useRef, useState} from "react";

const ImageContainer = (props: any) => {
    const { data, setData } = props;
    const currentImage = data;
    const setCurrentImage = setData;
    const [dragActive, setDragActive] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    console.log(data);
  
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
  
    const handleDrop = function (e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          if(["image/png", "image/jpg", "images/jpeg"].includes(e.dataTransfer.files[0].type))
              setCurrentImage(e.dataTransfer.files[0]);
        }
      };
    
      const onButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        ref.current!.click();
      };
    
      const handleClearImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImage(null);
      };
  
      const handleOnChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
          if(["image/png", "image/jpg", "images/jpeg"].includes(e.target.files![0].type))
              setCurrentImage(e.target.files![0]);
      }
  
    return currentImage === null ? (
      <label
        htmlFor="upload"
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        className="imageContainer"
      >
        <span>
          <TiUpload />
        </span>
        <span>Przeciągnij tu plik</span>
        <span>lub</span>
        <button onClick={onButtonClick}>Przeglądaj</button>
        <input
          onDrop={(e) => {
            e.preventDefault();
            console.log(e);
          }}
          onChange={handleOnChangeImage}
          id="upload"
          ref={ref}
          style={{ display: "none" }}
          type="file"
          multiple={false}
        />
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </label>
    ) : (
      <div className="imageContainer">
        <img src={URL.createObjectURL(currentImage)} alt="Podgląd" />
        <button onClick={handleClearImage} className="changeImage">
          Zmień
        </button>
      </div>
    );
};

export default ImageContainer;