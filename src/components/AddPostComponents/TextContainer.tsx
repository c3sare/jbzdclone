import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextContainer = (props: any) => {
    const { data, setData } = props;
    return <ReactQuill theme="snow" value={data} onChange={setData} />;
};

export default TextContainer;