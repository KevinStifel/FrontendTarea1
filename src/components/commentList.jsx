import { useState, useEffect } from 'react';
import { getComments } from '../helpers/apiService';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CommentList = ({ postId, reloadTrigger, users, user, posts, visible }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId, reloadTrigger]);

  // Modificada para verificar 'visible' antes de navegar
  const handleUserClick = (userId, commentUser, userPosts) => {
    if (visible) {
      navigate(`/user/${userId}`, { state: { user: commentUser, posts: userPosts, users } });
    }
  };

  return (
    <div>
      <h2>Comentarios del post</h2>
      {comments.map((comment) => {
        const commentUser = users.find(user => user.id === comment.userId);
        const userPosts = posts.filter(post => post.userId === user.id);

        return (
          <div key={comment.id}>
            <p>
              <span 
                onClick={() => handleUserClick(comment.userId, commentUser, userPosts)}
                style={{ 
                  cursor: visible ? 'pointer' : 'default', 
                  color: visible ? 'blue' : 'black',
                }}              >
                {commentUser ? commentUser.username : 'Usuario desconocido'}:
              </span>
              {comment.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
  reloadTrigger: PropTypes.bool.isRequired,
  users: PropTypes.array,
  user: PropTypes.object,
  posts: PropTypes.array,
  visible: PropTypes.bool, // 'visible' ahora es una prop del componente
};

export default CommentList;
