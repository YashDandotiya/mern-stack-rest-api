import React, { createContext } from "react";


const authenticationcontext = createContext({
  isLoggedIn: false,
  login: ()=>{},
  logout: ()=>{}
})


export default authenticationcontext
