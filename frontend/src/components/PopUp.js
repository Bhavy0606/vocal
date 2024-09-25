import React from "react";
import styled from "styled-components";

function PopUp({ message, success, failure, className }) {
  return (
    <Container success={success} failure={failure} className={className}>
      <p>{message}</p>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: -60px;
  opacity: 0;
  transition: 1s all ease-in-out;
  left: 50%;
  width: 400px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.success === true
      ? "#D4EDDA"
      : props.failure === true
      ? "#FFF3CD"
      : ""};
  border: ${(props) =>
    props.success === true
      ? "1px solid lightgreen"
      : props.failure === true
      ? "1px solid #FFAB9A"
      : ""};
  height: 40px;
  font-family: "Nunito", "Courier New", Courier, monospace;
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  transform: translate(-50%, -50%);
`;
export default PopUp;
