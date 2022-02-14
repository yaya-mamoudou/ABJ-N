import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import AddStudent from './components/AddStudent';
import Questions from './components/Questions';
import Home from './components/Home';

function App() {
  return (
    <div className="name">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/questions/:courseID" element={<Questions />} />
          <Route path="/add-student" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
