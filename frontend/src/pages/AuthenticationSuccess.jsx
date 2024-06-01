import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authenticationcontext from '../context/authenticationcontext'


const AuthenticationSuccess = () => {
    const [error, setError]=useState(null)
    const [users, setUsers]=useState(null)
    const navigate=useNavigate()
    const authentication=useContext(authenticationcontext)
    const handleButton=()=>{
        authentication.logout();
        navigate('/')
    }
    useEffect( ()=>{
        const fetchData=async ()=>{
            try {
                setError(null)
                const response= await fetch('http://localhost:5000/users/')
                const data=await response.json()
                if (response.ok){
                    console.log('hi')
                }
                if(!response.ok){
                    throw new Error('User not fetched, try again later')
                }
                setUsers(data.users)
                console.log(data)   
            } catch (error) {
                const err= new Error(error.message || 'Something unexpected occured')
                setError(err)                
            }
        }
        fetchData()
    }, [])
    
    return (
        <>
    {authentication.isLoggedIn && <div>
      You are sucessfully authenticated
      {users && <div> {users.map((user) => (
                <div key={user._id}>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                </div>
              ))}</div>}
    <button onClick={handleButton}>Tap to logut</button>
    </div>}
    {!authentication.isLoggedIn && <div>PLEASE LOGIN FIRST, U CANNOT VISIT THIS PAGE WHILE NOT LOGGING IN </div>}
    {error && <div>{error}</div>}
    </>
  )
}

export default AuthenticationSuccess
