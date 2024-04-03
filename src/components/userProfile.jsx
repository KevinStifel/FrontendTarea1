import { useLocation, useNavigate } from 'react-router-dom';
import CommentList from './commentList';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, posts, users} = location.state;

  if (!user) {
    return <div>Usuario no encontrado.</div>;
  }

  const handleBackClick = () => {
    navigate('/'); // Navega una página hacia atrás en el historial
  };

  return (
    <div>
      <h2>Perfil del Usuario: {user.username}</h2>
      <img src={user.avatar} alt={`Avatar de ${user.username}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      {posts.map(post => (
        <div key={post.id}>
          <h3> Title: {post.title}</h3>
          <p> Content: {post.content}</p>
          {/* Utilizar CommentList para manejar la carga y visualización de los comentarios */}
          <CommentList users={users} postId={post.id} reloadTrigger={true} user={user} posts={posts} visible={false}  />
        </div>
      ))}
      <button onClick={handleBackClick} style={{ fontSize: '20px', padding: '10px 20px', marginTop: '20px' }}>Volver</button>

    </div>
  );
};

export default UserProfile;
