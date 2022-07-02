import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo-chat.png";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact `}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div
                    className={`contactAvatar ${
                      index === currentSelected ? "selected" : ""
                    }`}
                  >
                    <img
                      width="20%"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />

                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="currentUser">
            <img
              className="currentUserAvatar"
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              alt="avatar"
            />

            <div className="currentUserUsername">
              <h3>{currentUser.username}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Contacts;
const Container = styled.div`
  background-color: #090123;
  border-radius: 0 5% 5% 0;
  display: grid;
  grid-template-rows: 15% 71% 14%;
  overflow: hidden;

  .contacts {
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    
    img {
      width: 40%;
      margin: 0.5rem 2rem;
    }
  }

  .contactAvatar {
    overflow: hidden;
    margin: 1rem;
    background-color: black;
    padding: 0.3rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    
    color: white;
    cursor: pointer;
    img {
      width: 15%;
      margin: 0.5rem;
      margin-right: 1rem;
    }
  }
  .selected {
    background-color: #0061fd;
  }
  .currentUser {
    overflow: hidden;
    background-color: #ffffff;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
    color: black;

    .currentUserAvatar {
      width: 20%;
      transform: translateX(-0.5rem);
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
   .currentUser .currentUserAvatar{
      width: 50%;
      
   }
  
  }
`;
