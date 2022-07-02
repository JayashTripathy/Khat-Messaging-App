import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="" />
      <div className="welcomeTitle">
        <h1>
          Welcome, <span className="yellowColor">{currentUser.username}</span>
        </h1>
      </div>
      <h4 className="wecomeSubtitle">Select a Buddy to send a message </h4>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  .yellowColor {
    color: #b4deff;
    font-weight: 400;
  }
  .welcomeSubtitle {
    font-weight: 200;
  }
  .welcomeTitle {
    margin-bottom: .5rem;
  }
`;
