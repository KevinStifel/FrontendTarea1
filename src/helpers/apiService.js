const API_BASE_URL = 'http://localhost:8080';

// Get all users or filter them by name
const getUsers = async (name = '') => {
  const query = name ? `?name=${name}` : '';
  const response = await fetch(`${API_BASE_URL}/users${query}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Get all posts or filter them by userId, title, and date range
const getPosts = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_BASE_URL}/posts?${query}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Get comments, optionally filtered by postId
const getComments = async (postId = '') => {
  const query = postId ? `?postId=${postId}` : '';
  const response = await fetch(`${API_BASE_URL}/comments${query}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Reset the database
const resetDatabase = async () => {
  const response = await fetch(`${API_BASE_URL}/reset`, { method: 'POST' });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Populate the database
const populateDatabase = async () => {
  const response = await fetch(`${API_BASE_URL}/populate`, { method: 'POST' });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Create a new user
const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Create a new post
const createPost = async (postData) => {
  console.log(postData);
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  console.log(response);
  return response.json();
};

// Create a new comment
const createComment = async (commentData) => {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export {
  getUsers,
  getPosts,
  getComments,
  resetDatabase,
  populateDatabase,
  createUser,
  createPost,
  createComment,
};
