import React, { useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { BsEmojiWink } from "react-icons/bs";
import Picker from "emoji-picker-react";

function ChatInput({ currentUser, handleSendMsg = { handleSendMsg }}) {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const emojiPickerHideShow = () => {
    setEmojiPicker(!emojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendMsg = (e) => {
    e.preventDefault();

    handleSendMsg(msg);
    setMsg("");
    
  };
  return (
    <Container>
      <div>
        <div className="emojiContainer">
          <button onClick={emojiPickerHideShow}>
            <BsEmojiWink />
          </button>
        </div>
        <div className="picker">
          {emojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form action="" onSubmit={(e) => sendMsg(e)} >
        <input
          type=""
          value={msg}
          placeholder={`Messaging as ${currentUser.username}...`}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        ></input>
        <button type="submit" className="sendBtn" >
          <IoSend />
        </button>
      </form>
    </Container>
  );
}

export default ChatInput;
const Container = styled.div`
  display: grid;
  grid-template-columns: 8% 90%;

  align-items: center;
  justify-content: center;
  background-color: black;
  margin: 0rem 1.3rem 1.3rem 1.3rem;
  border-radius: 0.5rem;
  form{
    display: flex;
    align-items: center;
    input{
      padding: 0.4rem;
      padding-left: 1rem;
    }
  }

  .emojiContainer {
    width: 110%;
    border-radius: 0.5rem 0 0 0.5rem;
    font-size: 1.8rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
      width: 100%;
      height: 100%;
      border: none;
      color: white;

      cursor: pointer;
      svg {
        font-size: 1.8rem;
        min-width: 100%;
      }
    }
  }

  input {
    display: flex;
    align-items: center;
    color: white;
    background-color: #000000;
    font-size: 1.3rem;
    height: 100%;
    border: none;
    padding-left: 0.5rem;
    border-radius: 0.5rem 0 0 0.5rem;
    :focus {
      outline: none;
    }
    flex-grow: 1;
  }

  .sendBtn {
    font-size: 1.8rem;
    padding: 1rem 0.8rem;
    border: none;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0.5rem 0.5rem 0;
    :hover {
      background-color: #4291f9;
      cursor: pointer;
      border-radius: 0.5rem;
    }
  }
  .picker {
    position: relative;
    .emoji-picker-react {
      position: absolute;
      transform: translateY(-25rem);
    }
    .emoji-search {
      background-color: white;
      color: #000000;
      border: 3px solid black;
      border-radius: 1rem;
    }
  }
`;
