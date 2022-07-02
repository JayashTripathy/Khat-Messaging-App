import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { v4 } from "uuid";

function Message({ currentChat, currentUser, messages }) {
  
  const scrollRef = useRef(null);
  
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView();
   
  };

  useEffect(() => {
   scrollToBottom();
  }, [messages])
  return (
    <Container>
      <div id="msg-box" className="msgBox">
        {messages.map((message, index) => {
          return (
            <div className="msgContent" key={v4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div
                  className={`msgText ${
                    message.fromSelf ? "your-text" : "senders-text"
                  }`}
                  >
                  {message.message}
                </div>
                <div ref={scrollRef}></div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  overflow: hidden;
  height: 60vh;

  .msgBox {
    overflow-y: scroll;
    height: 100%;
    background-color: black;
    padding: 1rem;
    margin: 0 1.2rem 0rem 1.2rem;
    border-radius: 0.5rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .msgContent {
    .message {
      display: flex;
      margin: 1rem;
    }
    .sended {
      display: flex;
      justify-content: flex-end;
    }
    .msgText {
      background-color: #1d1e44;
    }
    .your-text {
      background-color: #01039a;
    }
    .msgText {
      max-width: 18rem;
      font-size: 1.3rem;
      padding: 0.5rem;
      border-radius: 0.5rem;

      overflow-wrap: break-word;
    }
  }
`;
