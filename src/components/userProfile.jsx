import PropTypes from 'prop-types';

// Este componente acepta el usuario como prop y muestra su username y avatar
const UserProfile = ({ user }) => {
  // Asumimos que el avatar es una URL almacenada en el objeto del usuario
  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <p>Username: {user.username}</p>
      <img src={user.avatar} alt="Avatar" style={{ width: "100px", height: "100px" }}/>
    </div>
  );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserProfile;
