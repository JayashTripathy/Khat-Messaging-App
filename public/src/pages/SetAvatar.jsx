import React, { useState, useEffect } from "react";
import Loader from "../assets/Loader.gif"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  useEffect(() => {
    
      if(!localStorage.getItem("khat-app-user")){
        navigate('/login')
      }
   
  }, [])
  
  const toastOptions = {
    positon: "top-right",
    autoClose: 8000,
    pauseOnhover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select a Avatar to continiue");
      
    }else{
      
      const user = await JSON.parse(localStorage.getItem("khat-app-user"))
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image: avatars[selectedAvatar],
      })
     
      
      if(data.isSet){
        user.isAvatarImageSet= true;
        user.avatarImage = data.image;
        localStorage.setItem("khat-app-user", JSON.stringify(user));
        navigate('/')
      } else{
        toast.error("error setting avatar please try again", toastOptions)
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = [];

      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="setavatar-container">
            <img src={Loader} alt="loading..." />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="setavatar-container">
            <h1>Pick an avatar as your profile picture</h1>

            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    } `}
                  >
                    <img
                      onClick={() => setSelectedAvatar(index)}
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                    />
                  </div>
                );
              })}
            </div>
            <div onClick={setProfilePicture} className="submit-btn">
              Set this as you Profile Pic
            </div>
          </div>
        </Container>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}

const Container = styled.div`
  .setavatar-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0f172e;
    color: white;
    flex-direction: column;
  }
  .avatars {
    display: flex;
    gap: 1rem;
  }
  .avatar {
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    gap: 3rem;
    margin-top: 2rem;
    border: #0f172e 0.2rem solid;
    transition: 0.3s ease-in-out;
    img {
      height: 6rem;
    }
  }
  .selected {
    border: #000000 0.2rem solid;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 3px #1c91ff;
  }
  .submit-btn {
    margin-top: 3rem;
    background-color: #1640c0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 0.4rem;
    font: 1rem;
    transition: 200ms ease-in-out;
    &:hover {
      background-color: #140146;
    }
  }
`;
