// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import About from './Components/About';
import Skills from './Components/Skills';
import Education from './Components/Education';
function App() {
  return (
    // <div className="App">
  <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/education" element={<Education />} />
        </Routes>
      </BrowserRouter>
    );
      {/* <header className="App-header">
        <img src={profilePicture} className="Profile-picture" alt="Profile" />
        <h1>Arnab Bhattacharjee</h1>
        <p>Welcome to my portfolio website.</p>
      </header> */}
    // </div>
  
}

export default App;
