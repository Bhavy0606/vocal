import React from "react";
import styled from "styled-components";
function Poster() {
  return (
    <Container>
      <Image>
        <img
          src="https://ik.imagekit.io/euo36lugk/Vocal/aqua-poster_Q7PQ2l1nd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497250587"
          alt=""
        />
      </Image>
      <Info>
        <h1>Romance</h1>
        <h4>In the air</h4>
        <button>Shop Nows</button>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  max-height: 1280.33px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1080px) and (min-width: 769px) {
    height: 400px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    max-width: 768px;
    height: 300px;
  }
`;

const Image = styled.div`
  height: 100%;
  img {
    height: 100%;
  }
`;

const Info = styled.div`
  width: 50%;
  text-align: center;
  h1 {
    font-family: "Nanum Myeongjo", sans-serif;
    font-weight: 600px;
    font-size: 60px;
    text-transform: uppercase;
  }
  h4 {
    font-family: "Nanum Myeongjo", sans-serif;
    font-weight: 600px;
    font-size: 25px;
    text-transform: uppercase;
  }

  button {
    height: 40px;
    width: 150px;
    margin-top: 20px;
    background-color: #4c8da2;
    border: none;
    color: #fff;
  }

  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 20px;
    }

    h4 {
      font-size: 15px;
    }

    button {
      width: 70px;
      height: 30px;
      font-size: 10px;
    }
  }

  @media only screen and (max-width: 1080px) and (min-width: 769px) {
    h1 {
      font-size: 30px;
    }

    h4 {
      font-size: 18px;
      margin-top: 5px;
    }
  }
`;
export default Poster;
