import PropTypes from 'prop-types';

const UserSelector = ({ users, onUserSelected }) => {
  return (
    <select onChange={(e) => onUserSelected(e.target.value)} defaultValue="">
      <option value="" disabled>Select User</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>{user.username}</option>
      ))}
    </select>
  );
};

UserSelector.propTypes = {
  users: PropTypes.array.isRequired,
  onUserSelected: PropTypes.func.isRequired,
};

export default UserSelector;
