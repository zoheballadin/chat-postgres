import React from "react";

export const Message = ({message, own}) => {
  return (
    <div className={`my-10 mx-16  ${own && "self-end"}`}>
      <h5 className="font-semibold">
        {message.senderDetails.fullname
          ? message.senderDetails.fullname
          : "your friend"}
      </h5>
      <p>{message.text}</p>
    </div>
  );
};
