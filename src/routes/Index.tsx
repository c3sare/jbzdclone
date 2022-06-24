import "../styles/Posts.css";

import {Link} from "react-router-dom";

interface Post {
  id: number;
  userId: number;
  userName: string;
  title: string;
  addDate: string;
  img: string;
  likes: number;
  comments: Array<{
    id: number;
    userId: number;
    userName: string;
    likes: number;
    text: string;
    subcomments: Array<{
      id: number;
      userId: number;
      userName: string;
      likes: number;
      text: string;
    }>;
  }>;
}

const posts: Post[] = [
  {
    id: 1,
    userId: 1,
    userName: "Anonimowy",
    title: "tytuł",
    addDate: "Fri Jun 24 2022 15:12:00 GMT+0200 (czas środkowoeuropejski letni)",
    img: "/images/upload/1.jpg",
    likes: 0,
    comments: [
      {
        id: 1,
        userId: 1,
        userName: "Anonim",
        likes: 0,
        text: "no chyba ty",
        subcomments: [
          {
            id: 1,
            userId: 2,
            userName: "Anonim",
            likes: 0,
            text: "nie chyba ty",
          },
        ],
      },
    ],
  },
];

const Index = () => {

  const alongAgo = (time: string) => {
    const currentTime = new Date().getTime();
    const addTime = new Date(time).getTime();

    const inSeconds = (currentTime-addTime)/1000;

    if(inSeconds < 60) {
      return `Dodane ${Math.floor(inSeconds)} sekund temu`;
    } else if(inSeconds >= 60 && inSeconds < 60*60) {
      return `Dodane ${Math.floor(inSeconds/60)} minut temu`;
    } else if(inSeconds >= 60*60 && inSeconds < 60*60*24) {
      return `Dodane ${Math.floor(inSeconds/60/60)} godzin temu`;
    } else if(inSeconds >= 60*60*24 && inSeconds < 60*60*24*7) {
      return `Dodane ${Math.floor(inSeconds/60/60/24)} dni temu`;
    } else if(inSeconds >= 60*60*24*7 && inSeconds < 60*60*24*30) {
      return `Dodane ${Math.floor(inSeconds/60/60/24/7)} tygodnie temu`;
    } else if(inSeconds >= 60*60*24*30 && inSeconds < 60*60*24*365) {
      return `Dodane ${Math.floor(inSeconds/60/60/24/30)} miesięcy temu`;
    } else if(inSeconds >= 60*60*24*365) {
      return `Dodane ${Math.floor(inSeconds/60/60/24/365)} lat temu`
    }
  }


  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <p>{alongAgo(post.addDate)}</p>
          <img src={post.img} alt={post.title} />
          <div className="comments">
            {post.comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <span>
                  <Link to={`/users/${comment.userId}`}>{comment.userName}</Link>
                  <br/>
                  {comment.text}
                </span>
                <div className="likes">
                  <button>+</button>
                  <span>{comment.likes}</span>
                  <button>-</button>
                </div>
                <div className="subComments">
                  {comment.subcomments.map((subcomment) => (
                    <div className="subComment" key={subcomment.id}>
                      <p>{subcomment.text}</p>
                      <div className="subLikes">
                        <button>+</button>
                        <span>{comment.likes}</span>
                        <button>-</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
