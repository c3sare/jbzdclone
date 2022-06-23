import "../styles/Posts.css";

interface Post {
  id: Number;
  userId: number;
  title: string;
  img: string;
  likes: number;
  comments: Array<{
    id: number;
    userId: number;
    likes: number;
    text: string;
    subcomments: Array<{
      id: number;
      userId: number;
      likes: number;
      text: string;
    }>;
  }>;
}

const posts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: "tytuł",
    img: "/images/upload/1.jpg",
    likes: 0,
    comments: [
      {
        id: 1,
        userId: 1,
        likes: 0,
        text: "no chyba ty",
        subcomments: [
          {
            id: 1,
            userId: 2,
            likes: 0,
            text: "nie chyba ty",
          },
        ],
      },
    ],
  },
];

const Index = () => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post">
          <h2>{post.title}</h2>
          <img src={post.img} alt={post.title} />
          <div className="comments">
            {post.comments.map((comment) => (
              <div className="comment">
                <span>{comment.text}</span>
                <div className="likes">
                  <button>+</button>
                  <span>{comment.likes}</span>
                  <button>-</button>
                </div>
                <div className="subComments">
                  {comment.subcomments.map((subcomment) => (
                    <div className="subComment">
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
