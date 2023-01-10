import { useState, useEffect } from "react";


const CheckUrl = (props:any) => {
    const {data} = props;
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:8000/sitepreview/"+encodeURIComponent(data))
        .then(data => data.json())
        .then(data => setState(data));
    }, []);

    return (
        state === null ? <span>Ładowanie...</span>
        :
        <div className="preview">
            <div>
                <img src={state.img} alt="Obraz Linku"/>
            </div>
            <div>
                <h3>{state.title}</h3>
                <p>{state.description}</p>
                <span>{state.domain}</span>
            </div>
        </div>
    )
}

export default CheckUrl;