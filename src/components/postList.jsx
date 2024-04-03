import CommentList from './commentList';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PostList = ({ posts, users, reloadCommentTrigger }) => {
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    const userPosts = posts.filter(post => post.userId === user.id);
  
    navigate(`/user/${user.id}`, { state: { user, posts: userPosts, users} });
  };

  return (
    <div>
      <h1>Sección Posts</h1>
      {posts.map((post) => {
        const user = users.find(u => u.id === post.userId);
        return (
          <div key={post.id} style={{ marginBottom: '20px' }}>
            {user ? (
              <>
                <img 
                  src={user.avatar} 
                  alt={`Avatar de ${user.username}`} 
                  style={{ marginRight: '20px', width: '100px', height: '100px', borderRadius: '50%' }} 
                />
                <div>
                  <h2>
                    Posts del usuario <button onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>{user.username}</button>
                  </h2>
                  <h3>Title: {post.title}</h3>
                  <p>Content: {post.content}</p>
                  <CommentList users={users} postId={post.id} reloadTrigger={reloadCommentTrigger} user={user} posts={posts} visible={true} />
                </div>
              </>
            ) : (
              <div>Usuario no encontrado</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  reloadCommentTrigger: PropTypes.bool.isRequired,
};

export default PostList;
