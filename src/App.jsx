import { useState, useEffect } from 'react';
import UserSelector from './components/userSelector';
import PostList from './components/postList';
import { getUsers, getPosts, resetDatabase, populateDatabase, createPost, createComment } from './helpers/apiService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reloadCommentTrigger, setReloadCommentTrigger] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    const userData = await getUsers();
    setUsers(userData);
  };

  const fetchPosts = async () => {
    const postData = await getPosts();
    setPosts(postData);
  };

  const handleReset = async () => {
    await resetDatabase();
    fetchUsers();
    fetchPosts();
    setSelectedUserId('');
    setSelectedPostId('');
    setNewPostTitle('');
    setNewPostContent('');
    setNewCommentContent('');
  };

  const handlePopulate = async () => {
    await populateDatabase();
    fetchUsers();
    fetchPosts();
  };

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();
    if (selectedUserId && newPostTitle && newPostContent) {

      const userIdInt = parseInt(selectedUserId, 10);

      await createPost({
        userId: userIdInt,
        title: newPostTitle,
        content: newPostContent,
        image: newPostImage
      });
      setNewPostTitle('');
      setNewPostContent('');
      fetchPosts();
    }
  };
  

  const handleSubmitNewComment = async (e) => {
    e.preventDefault();
    if (selectedUserId && selectedPostId && newCommentContent) {

      const userIdInt2 = parseInt(selectedUserId, 10);
      const postIdInt2 = parseInt(selectedPostId, 10);
      
      await createComment({
        userId: userIdInt2,
        postId: postIdInt2,
        content: newCommentContent
      });
      
      setNewCommentContent('');
      setReloadCommentTrigger(prev => !prev);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Instegram</h1>
        <UserSelector users={users} onUserSelected={setSelectedUserId} />
        <button onClick={handleReset}>Reset Database</button>
        <button onClick={handlePopulate}>Populate Database</button>
      </header>
      <main>
        <h2>New Post</h2>
        <form onSubmit={handleSubmitNewPost}>
          <div>
            <label htmlFor="postTitle">Title:</label>
            <input type="text" id="postTitle" name="title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="postContent">Content:</label>
            <textarea id="postContent" name="content" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} rows="4" required></textarea>
          </div>
          <div>
            <label htmlFor="postContent">Image:</label>
            <textarea id="postContent" name="image" value={newPostImage} onChange={(e) => setNewPostImage(e.target.value)} required></textarea>
          </div>
          <button type="submit">Submit Post</button>
        </form>

        <h2>Add Comment</h2>
        <form onSubmit={handleSubmitNewComment}>
          <div>
            <label htmlFor="commentContent">Comment:</label>
            <textarea id="commentContent" name="comment" value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} rows="4" required></textarea>
          </div>
          <div>
            <label htmlFor="postSelector">Select Post:</label>
            <select id="postSelector" value={selectedPostId} onChange={(e) => setSelectedPostId(e.target.value)} required>
              <option value="">Select a post</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>{post.title}</option>
              ))}
            </select>
          </div>
          <button type="submit">Submit Comment</button>
        </form>

        <PostList posts={posts} users={users} reloadCommentTrigger={reloadCommentTrigger}/>
      </main>
    </div>
  );
}

export default App;
