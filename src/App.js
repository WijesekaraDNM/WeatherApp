import React from 'react';
import { Route,Routes,BrowserRouter } from "react-router-dom";
import LoginWindow from "../src/Components/LoginWindow"
import HomePage from './Components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWindow/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <LoginWindow/>
    // </div>
  );
}

export default App;
