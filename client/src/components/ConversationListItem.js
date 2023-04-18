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
    },[currentUser, conversation])

    console.log(friendId)
  return (
    <li className='bg-[#3B3486] rounded-lg px-64 my-5 py-10 text-white text-2xl cursor-pointer' onClick={()=> navigate(`/conversation/${conversation.id}`)}>{user.fullname}</li>
  )
}
