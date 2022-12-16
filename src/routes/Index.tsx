import "../styles/Posts.css";
import avatar from '../images/avatars/default.jpg';
import posts from "../data/posts";
import alongAgo from "../utils/alongAgoFunction";

import { Link } from "react-router-dom";

const Index = () => {

  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="avatar">
            <Link to={`/user/${post.userId}/${encodeURI(post.userName)}`}>
              <img src={avatar} alt="Avatar"/>
            </Link>
          </div>
          <div className="contentPost">
            <h2>{post.title}</h2>
            <p>
              {alongAgo(post.addDate)}
              {" "}
              <Link to={`/kategoria/${post.category.toLowerCase()}`} style={{color: '#bd3c3c'}}>{post.category}</Link>
            </p>
            <img src={post.img} alt={post.title} />
            {/* <div className="comments">
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
            </div> */}
            <div>

            </div>
          </div>
          <div className="buttonsPost">
              <span>+{post.likes}</span>
              <button className="plus">+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
