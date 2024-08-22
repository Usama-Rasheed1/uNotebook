import React from 'react';

const About = () => {
  return (
    <div className="container my-3">
      {/* Introduction Section */}
      <div className="text-center mb-4">
        <h1 className="text-primary"><strong>About uNotebook</strong></h1>
        <p className="lead">
          Welcome to uNotebook, your personal note-taking companion designed to enhance your productivity and organization.
        </p>
      </div>

      {/* Technology Stack Section */}
      <div className="mb-3">
        <h2 className="text-primary">Technology Stack</h2>
        <p>
          uNotebook is powered by the MERN stack, leveraging MongoDB for flexible data storage, Express for robust backend development, React for dynamic user interfaces, and Node.js for scalable server-side operations.
        </p>
      </div>

      {/* Future Plans Section */}
      <div className="mb-4">
        <h2 className="text-primary">Future Plans</h2>
        <p>
          We are committed to continuously improving uNotebook. In future updates, we plan to introduce features such as collaborative note-sharing, enhanced search capabilities, and integration with third-party productivity tools.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="text-center">
        <h2 className="text-primary">Contact Us</h2>
        <p>
          Have questions or feedback? Feel free to reach out to us at <a href="mailto:support@uNotebook.com" className="text-primary">usamara760@gmail.com</a>.
          Check out our projects and contributions on <a href="https://github.com/Usama-Rasheed1" className="text-primary">GitHub</a>.
        </p>
        <p className="text-muted">
          © 2024 uNotebook. All rights reserved. 
          <button className="btn btn-link p-0 text-primary mx-2 mb-1">Privacy Policy</button> | 
          <button className="btn btn-link p-0 text-primary mx-2 mb-1">Terms of Service</button>
        </p>
      </div>
    </div>
  );
}

export default About;
