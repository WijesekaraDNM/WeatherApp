import React from 'react';
import { Route,Routes,BrowserRouter } from "react-router-dom";
import LoginWindow from "../src/Components/LoginWindow"
import HomePage from './Components/HomePage';
import { AuthProvider } from './hooks/UseAuth';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginWindow/>}/>
          <Route path="/home" element={
            <PrivateRoute>
                  <HomePage/>
            </PrivateRoute>
          }/> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  );
}

export default App;
