import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ConversationListItem = ({conversation, currentUser}) => {
    let navigate = useNavigate()
    const [user, setUser] = useState({});

    const getUser = async(id) =>{
        try {
            let {data} = await axios.get("/api/user/" + id)
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }
    const friendId = conversation.members.find(m => m !== currentUser.id)

    useEffect(()=>{
        getUser(friendId)
    },[])

    console.log(friendId)
  return (
    <li onClick={()=> navigate(`/conversation/${conversation.id}`)}>{user.fullname}</li>
  )
}
