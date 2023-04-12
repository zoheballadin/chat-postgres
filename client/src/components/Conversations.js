import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    let navigate = useNavigate()
    
    const getConvos = async() =>{
        try {
            let token = JSON.parse(localStorage.getItem("token"))
            let {data} = await axios.get("/api/conversation", {
                headers: {
                    "auth-token": token.token
                }
                
            } )
            setConversations(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getConvos()
    },[])
  return (
    <div>
        <ul>
            {conversations.map(item => (
                <li onClick={()=> navigate(`/conversation/${item.id}`)}>{item.members.join(" ")}</li>
            ))}
        </ul>
    </div>
  )
}
