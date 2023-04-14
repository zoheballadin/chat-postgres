import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './context/GlobalState';
import { ConversationListItem } from './ConversationListItem';

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
    <div>
        <ul>
            {conversations.map(item => (
                <ConversationListItem conversation={item} currentUser={user}/>
            ))}
        </ul>
    </div>
  )
}
