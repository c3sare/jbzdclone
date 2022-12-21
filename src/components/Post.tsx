import alongAgo from "../utils/alongAgoFunction";
import { FaComment, FaStar, FaCaretUp } from "react-icons/fa";
import fingerLike from "../images/likes/like_mid_finger.png";
import rockLike from "../images/likes/like_rock.png";
import silverLike from "../images/likes/like_silver.png";
import goldLike from "../images/likes/like_gold.png";
import coins from "../images/likes/coins.png";
import coin from "../images/coin.png";
import { Link } from "react-router-dom";
import avatar from "../images/avatars/default.jpg";
import { useState } from "react";

const Post = (props: any) => {
  const { post } = props;
  const [showButtons, setShowButtons] = useState(false);
  return (
    <div className="post" key={post.id}>
      <div className="avatar">
        <Link to={`/user/${post.userId}/${encodeURI(post.userName)}`}>
          <img src={avatar} alt="Avatar" />
        </Link>
      </div>
      <div className="contentPost">
        <div className="postHeader">
          <h2>{post.title}</h2>
          <span className="iconComments">
            <FaComment />
            {post.comments.length}
          </span>
        </div>
        <p className="memDetails">
          <div className="userAddTimeDetails">
            <span className="userName">{post.userName}</span>
            <span className="addTime">{alongAgo(post.addDate)}</span>
            {post.category !== "" && (
              <Link
                to={`/kategoria/${post.category.toLowerCase()}`}
                style={{ color: "#bd3c3c" }}
              >
                {post.category}
              </Link>
            )}
          </div>
          <div className="otherLikes">
            <div className="likeContainer">
              <div className="image">
                <img src={fingerLike} alt="Wypierdalajka" />
                <span>Wypierdalajka</span>
              </div>
              <span>{post.mid_finger_like}</span>
            </div>
            <div className="likeContainer">
              <div className="image">
                <img src={rockLike} alt="Kamienna Dzida" />
                <span>Kamienna&nbsp;Dzida</span>
              </div>
              <span>{post.rock_like}</span>
            </div>
            <div className="likeContainer">
              <div className="image">
                <img src={silverLike} alt="Srebrna Dzida" />
                <span>Srebrna&nbsp;Dzida</span>
              </div>
              <span>{post.silver_like}</span>
            </div>
            <div className="likeContainer">
              <div className="image">
                <img src={goldLike} alt="Złota Dzida" />
                <span>Złota&nbsp;Dzida</span>
              </div>
              <span>{post.gold_like}</span>
            </div>
          </div>
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
        <div></div>
      </div>
      <div className="buttonsPost">
        {showButtons && (
          <div className="buttonsCoins">
            <button>
              <img src={fingerLike} alt="Wypierdalajka" />
              <span>
                420
                <img src={coin} alt="Moneta" />
              </span>
            </button>
            <button>
              <img src={goldLike} alt="Złota Dzida" />
              <span>
                1000
                <img src={coin} alt="Moneta" />
              </span>
            </button>
            <button>
              <img src={silverLike} alt="Srebrna Dzida" />
              <span>
                400
                <img src={coin} alt="Moneta" />
              </span>
            </button>
            <button>
              <img src={rockLike} alt="Kamienna Dzida" />
              <span>
                100
                <img src={coin} alt="Moneta" />
              </span>
            </button>
          </div>
        )}
        <button className="coins" onClick={() => setShowButtons(!showButtons)}>
          <FaCaretUp
            style={showButtons ? { transform: "rotate(180deg)" } : {}}
          />
          <img src={coins} alt="Monety" />
        </button>
        <button>
          <FaComment />
        </button>
        <button className="star">
          <FaStar />
        </button>
        <span>+{post.likes}</span>
        <button className="plus">+</button>
      </div>
    </div>
  );
};

export default Post;
