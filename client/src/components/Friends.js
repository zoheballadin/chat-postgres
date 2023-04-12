import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
    <div>
        <h1 className='text-4xl text-center'>Click to start a Conversation</h1>
        <ul >

            {
                friends.map(item => (
                    <li className='ml-64 text-3xl '  onClick={()=>createConvo(item.id)}>
                {item.fullname}
            </li>
                ))
            }
            
        </ul>
    </div>
  )
}
