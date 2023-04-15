import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { GlobalContext } from "./context/GlobalState";
import { Message } from "./Message";

export const Conversation = () => {
  const socket = useRef();
  let { id } = useParams();
  const { user } = useContext(GlobalContext);
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(user.id)

  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [conversation, setConversation] = useState({});

  const getUser = async() =>{
    try {
      let {data} = await axios.get("/api/auth", {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("token")).token
        }
      })
      setUserId(data.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    socket.current = io("ws://localhost:5002");
    socket.current.on("getMessage", (data) => {
      console.log(data.senderId)
      setNewMessage({
        conversation: id,
        text: data.text,
        senderDetails: { fullname: "examplename", id: data.senderId },
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    newMessage &&
      members.includes(newMessage.senderDetails.id) &&
      setMessages((prev) => [...prev, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    // console.log("this is the new id ", user.id)
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userId, user]); 

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  const getMembers = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      let { data } = await axios.get(`/api/conversation/${id}`, {
        headers: {
          "auth-token": token.token,
        },
      });
      console.log(data);
      setConversation(data);
      setMembers(data.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

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
    const receiverId = conversation.members.find((item) => item !== user.id);
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: message,
    });
    console.log(receiverId)
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      let { data } = await axios.post(
        "/api/message/send",
        {
          conversation: id,
          text: message,
        },
        {
          headers: {
            "auth-token": token.token,
          },
        }
      );
      alert(data.message);
      getMessages();
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="w-full ">
      <h1 className="mb-48">Conversation between a and b</h1>
      <div className="flex flex-col">
        {messages.map((item) => (
          <div ref={scrollRef}>  
            <Message message={item} sender={item.senderDetails.id} own={item.senderDetails.id == user?.id} />
          </div>
        ))}
      </div>
      <div className="mx-auto ">
        <input
          className="bg-slate-100 w-3/5 peer py-1  border-slate-400 rounded-lg focus:border-sky-400 focus:outline-none  border-2 "
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
    </div>
  );
};
