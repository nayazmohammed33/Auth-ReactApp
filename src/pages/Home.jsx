import React, { useContext } from 'react'
import { AuthContext } from '../components/Context/AuthContext'

const Home = () => {
    const {email} =useContext(AuthContext);
  return (
    <div>{email}</div>
  )
}

export default Home