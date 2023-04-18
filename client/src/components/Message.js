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
    <div style={{alignSelf: own && "flex-end"}} className={`my-10   mx-16  ${own && "self-end"} ${!own && ("relative right-0 bg-[#7743DB]")} bg-[#3B3486]  w-fit text-white p-6 rounded-[20px]`}>
      <h5 className="font-semibold">
        {senderDetails.fullname
          ? senderDetails.fullname
          : "your friend"}
      </h5>
      <p>{message.text}</p>
    </div>
  );
};
