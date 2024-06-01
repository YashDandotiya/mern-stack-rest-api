import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Hello this is home page please register
      <Link to='/register'>Click here</Link>
    </div>
  )
}

export default Home
