import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar';

export const Friends = () => {
    const [friends, setFriends] = useState([])
    const getFriends = async() =>{
        
        try {
            let {data} = await axios.get("/api/user") 
            console.log(data)
            setFriends(data)   
        } catch (error) {
            console.log(error)
        }
    }

    const createConvo = async(id) =>{
        let token = JSON.parse(localStorage.getItem("token"));
        let {data} = await axios.post("/api/conversation/add", {receiver: id}, {
            headers: {
                "auth-token": token.token
            }
        })
        console.log(data)
    }

    useEffect(()=>{
        getFriends()
    },[])
  return (
    <div className='bg-[#FFE9B1] min-h-screen h-full text-center'>
        <Navbar/>
        <h1 className='text-center font-semibold text-5xl my-8 text-slate-800'>Click to start a Conversation</h1>
        <ul className='inline-block text-left'>

            {
                friends.map(item => (
                    <li className='bg-[#3B3486] rounded-lg px-64 my-5 py-10 text-white text-2xl cursor-pointer'  onClick={()=>createConvo(item.id)}>
                {item.fullname}
            </li>
                ))
            }
            
        </ul>
    </div>
  )
}
