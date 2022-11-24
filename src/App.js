import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PrivateView from './pages/PrivateView';
import IsPrivate from './components/IsPrivate';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
   return (
      <div className="App">
         <Toaster />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
      </div>
   );
}

export default App;
