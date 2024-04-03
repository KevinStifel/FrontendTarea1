import CommentList from './commentList';
import PropTypes from 'prop-types';

const PostList = ({ posts, users, reloadCommentTrigger }) => {
  return (
    <div>
      <h1>Sección Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          {users.map((user) => {
            if (user.id === post.userId) {
              return <h2 key={user.id}>Posts del usuario <a href="http://localhost:5173/"> {user.username} </a> </h2>;
            }
            return null;
          })}

          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <CommentList postId={post.id} reloadTrigger={reloadCommentTrigger} />
        </div>
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  reloadCommentTrigger: PropTypes.bool.isRequired,
};



export default PostList;
