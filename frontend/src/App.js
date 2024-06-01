import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Sign from './pages/Sign';
import AuthenticationSuccess from './pages/AuthenticationSuccess';
import authenticationcontext from './context/authenticationcontext';

function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false)

  const login=()=>{
    setIsLoggedIn(true)
  }
  const logout=()=>{
    setIsLoggedIn(false)
  }
  let routes
  if(isLoggedIn){
    routes= (<>
            <Route path='/auth' element={<AuthenticationSuccess />} />

    </>)
  }else{
    routes=(<>
    <Route path='/' element={<Home />} />
        <Route path='/register' element={<Sign />} />
    </>)
  }
  return (
    <authenticationcontext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}>
    <div>this is a dummy</div> 
      <Router>
      <Routes>
        {routes}
        <Route path='*' element={<Navigate to=''/>}/>
      </Routes>
    </Router>
    </authenticationcontext.Provider>
  
  );
}

export default App;
