import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from "../utils/APIRoutes";


function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "", 
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    
      if(localStorage.getItem("khat-app-user")){
        navigate('/')
      }
    
  }, [])

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(handleValidation()){
      const { username, email, password,} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
      })
      if(data.status == false) {
        toast.error(data.msg, toastOptions)
      }
      if(data.status == true){
        localStorage.setItem('khat-app-user', JSON.stringify(data.user))
        navigate("/setAvatar")
      }
      
      
    }
  };
  const toastOptions = {
    positon: "top-right",
    autoClose: 8000,
    pauseOnhover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = (e) => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password are not same", toastOptions);
      return false;
    } else if (username.length  < 3) {
      toast.error("username must contain more than 3 letters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email feild must not be empty", toastOptions);
      return false;
    } else if (password.length<8){
      toast.error("Password length must be greated than 8", toastOptions)
      return false
    }
    else{
      return true
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <div className="contentBox">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="brand">
              <img src={Logo} alt="" width="250px" />
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1 }}
              type="submit"
            >
              Create User
            </motion.button>
            <span>
              already have an account ?<Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0f172e;
  .contentBox {
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: right;
    img {
      height: 110%;
      display: flex;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    border-radius: 2rem;
    padding: 1.6rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #5e4dab;
    border-radius: 0.4rem;
    font-weight: 400;
    width: 100%;
    font-size: 1rem;
  }
  button {
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
  span {
    color: #0f172e;
    text-transform: uppercase;
    font-size: 0.8rem;
    a {
      color: #140146;

      font-weight: bold;
      text-decoration: none;
      margin-left: 0.3rem;
    }
  }
`;

export default Register;
