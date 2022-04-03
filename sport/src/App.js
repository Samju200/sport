import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Verification from './components/Verification';
import Verify from './components/Verify';
import ResendVerification from './components/ResendVerification';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/users/confirmation/:id/:token"
              element={<Verification />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verification" element={<Verify />} />
            <Route path="/users/:id/resend" element={<ResendVerification />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
