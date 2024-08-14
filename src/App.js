import './App.css'; 
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/textForm';
import Alert from './components/alert';
import About from './components/about';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() { 

  const[mode, setMode] = useState('light');
  const[alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if(mode === 'light' || mode === '#34A853') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      showAlert('Dark Mode is On', 'success');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light Mode is On', 'success');
    }
  }

  const toggleMode2 = () => {
    if(mode === 'light' || mode === 'dark') {
      setMode('success');
      document.body.style.backgroundColor = '#34A853';
      showAlert('Green Mode is On', 'success');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light Mode is On', 'success');
    }
  }

  return (
    <>
      <Router>
        <Navbar title='Hello' mode={mode} toggleMode={toggleMode} toggleMode2={toggleMode2}/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About mode={mode}/>} />
            <Route exact path="/" element={<TextForm heading="Enter text to convert:" mode={mode} showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
