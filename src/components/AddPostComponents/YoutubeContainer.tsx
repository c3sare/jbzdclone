import { useEffect, useState } from "react";
import YouTube from "react-youtube";

function youtube_parser(url: string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

const YoutubeContainer = (props: any) => {
  const { data, setData, index } = props;
  const [url, setUrl] = useState("");

  useEffect(() => {
    const vidId = youtube_parser(url);
    if (vidId !== false)
      fetch(`http://localhost:8000/youtubevideo/${vidId}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.videoExist) setData(vidId, index);
        })
        .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [url]);

  return (
    <div className="youtube">
      {data === null ? (
        <>
          <h3>Link do filmu Youtube</h3>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Wklej link filmu Youtube"
          />
        </>
      ) : (
        <>
          <YouTube opts={{ width: "100%", height: "310px" }} videoId={data} />
          <button
            className="changeVideoBtn"
            onClick={() => {
              setUrl("");
              setData(null, index);
            }}
          >
            Zmień
          </button>
        </>
      )}
    </div>
  );
};

export default YoutubeContainer;
