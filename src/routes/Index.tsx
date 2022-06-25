import "../styles/Posts.css";

import { Link } from "react-router-dom";

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
    addDate:
      "Fri Jun 24 2022 15:12:00 GMT+0200 (czas środkowoeuropejski letni)",
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

    const inSeconds = (currentTime - addTime) / 1000;

    if (inSeconds < 60) {
      const secs = Math.floor(inSeconds);
      return `Dodane ${secs > 1 ? secs + " " : ""}${
        secs > 1 ? (secs < 5 ? "sekundy" : "sekund") : "sekundę"
      } temu`;
    } else if (inSeconds >= 60 && inSeconds < 60 * 60) {
      const minutes = Math.floor(inSeconds / 60);
      return `Dodane ${minutes} ${
        minutes > 1 ? (minutes < 5 ? "minuty" : "minut") : "minutę"
      } temu`;
    } else if (inSeconds >= 60 * 60 && inSeconds < 60 * 60 * 24) {
      const hours = Math.floor(inSeconds / 60 / 60);
      return `Dodane ${hours} ${
        hours > 1 ? (hours < 5 ? "godziny" : "godzin") : "godzinę"
      } temu`;
    } else if (inSeconds >= 60 * 60 * 24 && inSeconds < 60 * 60 * 24 * 7) {
      const days = Math.floor(inSeconds / 60 / 60 / 24);
      return `Dodane ${days} ${days > 1 ? "dni" : "dzień"} temu`;
    } else if (inSeconds >= 60 * 60 * 24 * 7 && inSeconds < 60 * 60 * 24 * 30) {
      const weeks = Math.floor(inSeconds / 60 / 60 / 24 / 7);
      return `Dodane ${weeks} ${
        weeks > 1 ? (weeks < 5 ? "tygodnie" : "tygodni") : "tydzień"
      } temu`;
    } else if (
      inSeconds >= 60 * 60 * 24 * 30 &&
      inSeconds < 60 * 60 * 24 * 365
    ) {
      const months = Math.floor(inSeconds / 60 / 60 / 24 / 30);
      return `Dodane ${months} ${
        months > 1 ? (months < 5 ? "miesiące" : "miesięcy") : "miesiąc"
      } temu`;
    } else if (inSeconds >= 60 * 60 * 24 * 365) {
      const years = Math.floor(inSeconds / 60 / 60 / 24 / 365);
      return `Dodane ${years} ${
        years > 1 ? (years < 5 ? "lata" : "lat") : "rok"
      } temu`;
    }
  };

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
                  <Link to={`/users/${comment.userId}`}>
                    {comment.userName}
                  </Link>
                  <br />
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
