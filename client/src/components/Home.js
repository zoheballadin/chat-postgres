import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
  let navigate = useNavigate()
  useEffect(()=>{
    navigate("/login")
  },[])
  return (
    <div>Home</div>
  )
}
