import { useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import About from './component/About';
import TextForm from './component/TextForm';
import Alert from './component/Alert';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  const [mode, setMode] = useState('light');   // dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  const toggleMode = () => {
    if(mode === 'light'){
      setMode("dark");
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been Enabled." , "success");
      document.title = "TextUtils : Dark Mode";
      // setInterval(()=>{
      //   document.title = "TextUtils is Amazing Mode"
      // },2000);
      // setInterval(()=>{
      //   document.title = "Install TextUtils Now "
      // },1500);
    } else{
      setMode("light");
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been Enabled." , "success");
      document.title = "TextUtils : Light Mode";
    }
  }

  return (
    <>
    <Router>
    <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/" element={<TextForm />}>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;