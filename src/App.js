import './App.css';
import Login from './pages/login.js';
import Home from './pages/Home.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// let username = "null"

function App() {



  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/"  element={<Login/>} />
          <Route path="/:username"  element={<Home/>} />
          <Route path='*' element={<h1>Error 404</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
