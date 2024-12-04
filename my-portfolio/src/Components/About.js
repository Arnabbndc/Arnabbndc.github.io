// import React from 'react';
// import profilePicture from '../profile.jpg'; // Ensure you have a profile.jpg in the src directory

// function About() {
//   return (
//     <div style={aboutStyle}>
//       <h1>About Me</h1>
//       <header className="App-header">
//         <img src={profilePicture} className="Profile-picture" alt="Profile" />
//         <h1>Arnab Bhattacharjee</h1>
//         <p>Welcome to my portfolio website.</p>
//       </header>
//       <p>
//         Hello! I'm Arnab Bhattacharjee, a passionate developer specializing in modern web development. 
//         I enjoy creating elegant solutions to complex problems.
//       </p>
//       <p>
//         I'm currently working on exciting projects to improve user experiences. Let's connect!
//       </p>
//     </div>
//   );
// }

// const aboutStyle = {
//   padding: '20px',
//   textAlign: 'center',
// };

// export default About;

import React from 'react';
import profilePicture from '../profile.jpg'; // Ensure you have a profile.jpg in the src directory

function About() {
  return (
    <div className="about-container">
        <img src={profilePicture} className="Profile-picture" alt="Profile" />
      <h2>About Me</h2>
      <p>
        Hello! I'm <strong>Arnab Bhattacharjee</strong>, a passionate developer specializing in modern web development.
        I enjoy creating elegant solutions to complex problems.
      </p>
      <p>
        I'm currently working on exciting projects to improve user experiences. Let's connect and collaborate!
      </p>
    </div>
  );
}

export default About;

