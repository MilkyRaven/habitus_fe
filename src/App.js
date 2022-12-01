import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PrivateView from './pages/PrivateView';
import IsPrivate from './components/IsPrivate';
import CreateProfile from './pages/profile/CreateProfile';
import ProfilePage from './pages/profile/ProfilePage';
import EditProfile from './pages/profile/EditProfile';
import LibraryPage from './pages/profile/LibraryPage';
import Feed from './pages/feed/Feed';
import ChatPage from './pages/profile/ChatPage';
import PublicProfile from './pages/profile/PublicProfile';
import PostDetails from './components/post/PostDetails';
import FreshPosts from './components/feed/FreshPosts';
import FriendsPosts from './components/feed/FriendsPosts';
import PopularPosts from './components/feed/PopularPosts';

function App() {
   return (
      <div className="App">
         <Toaster />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
            <Route path="/user/:userId" element={<IsPrivate><PublicProfile /></IsPrivate>} />
            <Route path="/:postId" element={<IsPrivate><PostDetails /></IsPrivate>} />
            <Route path="/edit-profile" element={<IsPrivate><EditProfile /></IsPrivate>} />
            <Route path="/library" element={<IsPrivate><LibraryPage /></IsPrivate>}/>
            <Route path="/feed" element={<IsPrivate><Feed /></IsPrivate>} />
            <Route path="/fresh-posts" element={<IsPrivate><Feed><FreshPosts /></Feed></IsPrivate>}/>
            <Route path="/friends-posts" element={<IsPrivate><Feed><FriendsPosts /></Feed></IsPrivate>}/>
            <Route path="/popular-posts" element={<IsPrivate><Feed><PopularPosts /></Feed></IsPrivate>}/>
            <Route path="/chat" element={<IsPrivate><ChatPage /></IsPrivate>} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
      </div>
   );
}

export default App;
