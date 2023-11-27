import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom';
import logo_sf from '../src/logo_sf.png';
import Home from './Home';
import About from './About';
import Service from './Service';
import Contact from './Contact';
import GetStart from './GetStart';
import useSound from 'use-sound';
import musica from './musica_fondo.m4a';
import './App.css';

function LogoComponent({ onClick }) {
  return (
    <div onClick={onClick}>
      <img
        src={logo_sf}
        alt="Logo"
        className="logo"
      />
    </div>
  );
}
function App() {
  const [playSound] = useSound(musica);
  return (
    <Router>
      <div className="App">
        <nav>
          <LogoComponent onClick={playSound} />
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
          <NavLink to="/service" className={({ isActive }) => isActive ? "active" : ""}>Service</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
        </nav>
        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/getstart" element={<GetStart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
