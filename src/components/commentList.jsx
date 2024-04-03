import { useState, useEffect } from 'react';
import { getComments } from '../helpers/apiService';
import PropTypes from 'prop-types';

const CommentList = ({ postId, reloadTrigger }) => {
  const [comments, setComments] = useState([]);
  
  
  
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
    
  }, [postId, reloadTrigger]); // Dependencia en postId asegura que los comentarios se recargan al cambiar de post

  return (
    <div>
      <h2>Comentarios del post</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
  reloadTrigger: PropTypes.bool.isRequired,
};

export default CommentList;
