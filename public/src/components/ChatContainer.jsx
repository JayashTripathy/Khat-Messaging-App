import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Message from "./Message";
import axios from "axios";
import { getAllMessageRoute, host } from "../utils/APIRoutes";
import { addMessage } from "../utils/APIRoutes";
import { Socket } from "socket.io-client";

function ChatContainer({ currentChat, currentUser, socketRef }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null)
  
 
  useEffect(() => {
    const fetchData =  async() => {
      if(currentUser){

        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);
  

 

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("khat-app-user"))
    socketRef.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg
    })
    await axios.post(addMessage, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages]
    msgs.push({fromSelf: true, message: msg})
    setMessages(msgs)
  };
  useEffect(() => {
    if(socketRef.current) {
     socketRef.current.on("msg-receive", (msg) => {
      
      setArrivalMessage({fromSelf: false, message: msg})
      
     })
    }
  }, []);
  useEffect(() => {
     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]) 
    
  }, [arrivalMessage])
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chatHeader">
            <div className="chatTitle">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="avatar"
              />
              <h2 className="chatUsername">{currentChat.username}</h2>
            </div>
            <Logout />
          </div>
          <Message
            currentChat={currentChat}
            currentUser={currentUser}
            messages={messages}
          />
          <ChatInput currentUser={currentUser} handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

export default ChatContainer;

const Container = styled.div`
  color: white;
  display: grid;
  grid-template-rows: 14% 71% 15%;

  .chatHeader {
    display: flex;

    justify-content: space-between;
    img {
      width: 3rem;
    }
    .chatTitle {
      display: flex;
      align-items: center;
      padding: 1.5rem 2.5rem;
      gap: 0.5rem;
    }
  }
`;
