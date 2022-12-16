import { useNavigate, useParams, Link } from "react-router-dom";
import avatar from "../../images/avatars/default.jpg";
import alongAgo from "../../utils/alongAgoFunction";
import posts from "../../data/posts";
import { useEffect } from "react";

const Index = () => {
    const {id, url} = useParams();
    let navigate = useNavigate();
    console.log(encodeURI(String(url).toLowerCase()));
    console.log(encodeURI(String(posts.find(item => item.id === Number(id))?.title.toLowerCase())))

    const post = posts.find(item => item.id === Number(id) && encodeURI(String(url).toLowerCase()) === encodeURI(item.title.toLowerCase()));
    useEffect(() => {
        if(!post) navigate("/404");
        else document.title = "Jbzd.com.pl - "+post.title;
    }, [])

    return (
        <div className="post">
          <div className="avatar">
            <Link to={`/user/${post?.userId}/${encodeURI(String(post?.userName))}`}>
              <img src={avatar} alt="Avatar"/>
            </Link>
          </div>
          <div className="contentPost">
            <h2>{post?.title}</h2>
            <p>
              {alongAgo(String(post?.addDate))}
              {" "}
              <Link to={`/kategoria/${post?.category.toLowerCase()}`} style={{color: '#bd3c3c'}}>{post?.category}</Link>
            </p>
            <img src={post?.img} alt={post?.title} />
            <div className="comments">
              {post?.comments.map((comment) => (
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
            <div>

            </div>
          </div>
        </div>
    )
}

export default Index;