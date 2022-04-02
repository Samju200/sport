import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Verification from './components/Verification';
import Verify from './components/Verify';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/confirmation/:id/:token" element={<Verification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="verification" element={<Verify />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
