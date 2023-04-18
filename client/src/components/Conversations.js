import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './context/GlobalState';
import { ConversationListItem } from './ConversationListItem';
import { Navbar } from './Navbar';

export const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    let navigate = useNavigate()
    const {user} = useContext(GlobalContext)
    
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
    <div className='bg-[#FFE9B1] h-full min-h-screen text-center'>
        <Navbar/>
        <h1 className='text-center font-semibold text-5xl my-8 text-slate-800'>My Conversations</h1>
        <ul className='inline-block text-left'>
            {conversations.map(item => (
                <ConversationListItem conversation={item} currentUser={user}/>
            ))}
        </ul>
    </div>
  )
}
