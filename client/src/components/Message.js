import axios from "axios";
import React, { useEffect, useState } from "react";

export const Message = ({message, own, sender}) => {

  const [senderDetails, setSender] = useState({})
  const getSender = async() =>{
    try {
      let {data} = await axios.get("/api/user/" + sender)
      setSender(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getSender()
  },[])
  return (
    <div className={`my-10 mx-16  ${own && "self-end"}`}>
      <h5 className="font-semibold">
        {senderDetails.fullname
          ? senderDetails.fullname
          : "your friend"}
      </h5>
      <p>{message.text}</p>
    </div>
  );
};
