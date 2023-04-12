import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {io} from "socket.io-client"

export const Conversation = () => {
  const socket = useRef()
  let { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setId] = useState("")
  const [members, setMembers] = useState([])
  const [newMessage, setNewMessage] = useState(null)

  useEffect(()=>{
    socket.current = io("ws://localhost:5002")
    socket.current.on("getMessage", data =>{
      setNewMessage({
        conversation: id,
        text: data.text,
        senderDetails: {fullname: "examplename", id: data.senderId},
        createdAt: Date.now()
        
      })
    })
  },[])

  useEffect(()=>{
    newMessage && members.includes(newMessage.senderDetails.id) && 
    setMessages(prev=>[...prev, newMessage])
  },[newMessage])


  useEffect(()=>{
    getUser()
  },[])

  useEffect(()=>{
    socket.current.emit("addUser", userId)
    socket.current.on("getUsers", users=>{
      console.log(users)
    })
  },[userId])

  const getMembers = async() =>{
    try {
      let token = JSON.parse(localStorage.getItem("token"))
      let {data} = await axios.get(`/api/conversation/${id}`, {
        headers: {
          "auth-token": token.token
        }
      })
      setMembers(data.members)
    } catch (error) {
      console.log(error)
    }
  }
  const getUser = async() =>{
    try {
      let token = JSON.parse(localStorage.getItem("token"))
      let {data} = await axios.get("/api/auth/", {
        headers: {
          "auth-token": token.token
        }
      })
      getMembers()
      setId(data.id)
    } catch (error) {
      console.log(error)
    }
  }
  

  

  const getMessages = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      let { data } = await axios.get(`/api/message/${id}`, {
        headers: {
          "auth-token": token.token,
        },
      });

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const send = async () => {

    const receiverId = members.find(item => item!== userId)
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: message
    })
    try {
      let token = JSON.parse(localStorage.getItem("token"))
      let { data } = await axios.post("/api/message/send", {
        conversation: id,
        text: message,
      }, {
        headers: {
          "auth-token": token.token
        }
      });
      alert(data.message)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  
  return (
    <div>
      <h1 className="mb-48">Conversation between a and b</h1>
      {messages.map((item) => (
        <div className="my-12">
          <h5>{item.senderDetails.fullname ? item.senderDetails.fullname : "your friend" }</h5>
          <p>{item.text}</p>
        </div>
      ))}
      
      <input
        className="bg-slate-100 border-black border-2 "
        value={message}
        placeholder="enter a text "
        type="text"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-slate-300 border-blue-500 border-2 p-2"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
};
