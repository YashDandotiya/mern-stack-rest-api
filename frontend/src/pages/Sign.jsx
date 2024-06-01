import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import authenticationcontext from '../context/authenticationcontext'
const Sign = () => {
    const navigate=useNavigate()
    const [error, setError]=useState(null)
    const [isSignUp, setIsSignUp]=useState(true)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const logingin=async (e)=>{
        e.preventDefault()
        try {
            setError(null)
            const response =await fetch('http://localhost:5000/users/login',  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })
            const data=await response.json()
            if(!response.ok){
                // setError(data.message)
                console.log('hi')
                throw new Error(data.message ||'Loging failed')
            }
            authentication.login()
            console.log(authentication.isLoggedIn)
            navigate('/auth')
            console.log(data)

        } catch(error){
            const err= new Error(error ||'something unexpected occured')
            err.code= 500
            
            setError(err.message)
        }
    }

    const signingup=async (e)=>{
        e.preventDefault()
        try {
            setError(null)
            const response=await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            })



            const data=await response.json()
            if(!response.ok){
                // setError(data.message)
                throw new Error(data.message ||'Signup failed')
            }
            authentication.login()
            console.log(authentication.isLoggedIn)
            navigate('/auth')
            console.log('hi', data)    
        } catch (error) {
            const err= new Error(error ||'something unexpected occured')
            err.code= 500
            
            setError(err.message)
        }

        
    }
    const authentication=useContext(authenticationcontext)
  return (
    <>
    {!authentication.isLoggedIn && <div>
      Hello Please Sign up/Sign in

      <form action="" onSubmit={isSignUp ? signingup: logingin} >
{ isSignUp &&        <input type="text" name='username' onChange={handleChange} />
}        <input type="text" name='password' onChange={handleChange}/>
        <input type="text" name='email' onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
        <div>{error} </div>
        {isSignUp &&<div onClick={() => setIsSignUp(false)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                Click here to login
            </div>}
            {!isSignUp &&<div onClick={() => setIsSignUp(true)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                Click here to signup
            </div>}
    </div>}
    {
        authentication.isLoggedIn && <div>
            Please logout first before trying to sign in again 
            <button onClick={authentication.logout}>Click here to logout</button>
        </div>
    }
    </>
  )
}

export default Sign
