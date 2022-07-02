import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UilSignOutAlt } from "@iconscout/react-unicons";

function Logout() {
  const navigate = useNavigate()  
  function handleLogout(){
    localStorage.clear()
    navigate("/login")
    
  }
  return (
    <Container>
      <button className="logoutContainer" onClick={handleLogout}>
        <h3 className="logout">Logout <span className="logoutLogo">
          <UilSignOutAlt ></UilSignOutAlt>
        </span></h3>
       
      </button>
    </Container>
  );
}

export default Logout;

const Container = styled.div`
  display: flex;
  align-items: center;
  
  padding: 2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 400;


  .logoutContainer{
      border-radius: 4rem;

  }
  .logout{
      padding: 0.3rem 1rem;
      
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      :hover{
          color: #0061fd;
      }
      
  }
  
  
  
`;
