import { useState, useEffect } from "react";

const CheckUrl = (props: any) => {
  const { data, setLoading, register, linkingCustomImage } = props;
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    if (data === "") setState(null);
    else
      fetch("http://localhost:8000/sitepreview/" + encodeURIComponent(data))
        .then((data) => data.json())
        .then((data) => {
          setState(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    // eslint-disable-next-line
  }, [data]);

  return state === null ? (
    <></>
  ) : (
    <a className="preview" href={data} target="_blank" rel="noreferrer">
      <div className="imgContent">
        <img
          src={
            linkingCustomImage?.[0]
              ? URL.createObjectURL(linkingCustomImage[0])
              : state.img
          }
          alt="Obraz Linku"
        />
        <input
          type="file"
          multiple={false}
          accept="image/png, image/jpeg"
          {...register("linkingCustomImage")}
          defaultValue={[]}
        />
      </div>
      <div className="textContent">
        <h3>{state.title}</h3>
        <p>{state.description}</p>
        <span>{state.domain}</span>
      </div>
    </a>
  );
};

export default CheckUrl;
