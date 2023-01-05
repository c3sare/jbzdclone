import { useEffect, useState } from 'react';

function youtube_parser(url: string){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
}

const YoutubeContainer = (props: any) => {
    const {data, setData} = props;
    const [url, setUrl] = useState("");
    
    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=id&id=${youtube_parser(url)}&key=AIzaSyAOsXSd2jzliEHSsuOiU9CDSQIn9vNzEJE`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))
    }, [url]);

    return (
        <div className="youtube">
            <h3>Link do filmu Youtube</h3>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Wklej link filmu Youtube"/>
        </div>
    )
}

export default YoutubeContainer;