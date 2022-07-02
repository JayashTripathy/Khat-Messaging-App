import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    
  });
  useEffect(() => {
   
      if(localStorage.getItem("khat-app-user")){
        navigate('/')
      }
    
 
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username,  password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("khat-app-user", JSON.stringify(data.user));
        navigate("/");
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
    const { username,  password } = values;
    if (password === "" ) {
      toast.error("Email and Password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Please enter a username", toastOptions);
      return false;
    } else {
      return true;
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
              min='3'
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1 }}
              type="submit"
            >
              Login
            </motion.button>
            <span>
              Don't have an account ?<Link to="/register">Register</Link>
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

export default Login;
