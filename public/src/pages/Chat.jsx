import React from "react";
import styled from "styled-components";
import axios from "axios";
import { allUserRoutes } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const socketRef = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("khat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("khat-app-user")));
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
     if(currentUser) {
       socketRef.current = io(host);
       socketRef.current.emit("add-user", currentUser._id)
     }
  }, [currentUser]) 
  useEffect(() => { 
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);
          
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  });
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} socketRef={socketRef} currentUser={currentUser} />
        )}
      </div>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f172e;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #060e25;
    display: grid;
    grid-template-columns: 30% 70%;

    border-radius: 0.2rem;
  }
`;
