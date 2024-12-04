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
import profilePicture from './profile.jpg'; // Ensure you have a profile.jpg in the src directory

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={profilePicture} className="Profile-picture" alt="Profile" />
        <h1>Arnab Bhattacharjee</h1>
        <p>Welcome to my portfolio website.</p>
      </header>
    </div>
  );
}

export default App;
