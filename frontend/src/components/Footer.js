import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <Logo>
        <img
          src="https://ik.imagekit.io/euo36lugk/Vocal/Footer_logo_2x_PGj0YMUM_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300817859"
          alt=""
        />
      </Logo>

      <Info>
        <Data>
          <h2>Contact Us</h2>
          <p>vocalperfume@gmail.com</p>
        </Data>
        <Data>
          <h2>Follow Us</h2>
          <div className="social_media">
            <img
              src="https://ik.imagekit.io/euo36lugk/Vocal/Facebook_GxShRZyxR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300817778"
              alt=""
            />
            <img
              src="https://ik.imagekit.io/euo36lugk/Vocal/Instagram_t2Wv_AQ7jt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300817864https://ik.imagekit.io/euo36lugk/Vocal/Instagram_t2Wv_AQ7jt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300817864"
              alt=""
            />
          </div>
        </Data>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  background-color: #202020;
  padding: 50px 50px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    align-items: center;
    height: 500px;
    text-align: center;
    padding: 50px 0px;
  }
`;

const Logo = styled.div`
  width: 250px;
  img {
    width: 100%;
  }
`;

const Info = styled.div``;

const Data = styled.div`
  color: #fff;
  font-family: "Nunito";
  margin-bottom: 30px;
  h2 {
    margin-bottom: 10px;
    font-size: 25px;
  }
  .social_media {
    img {
      width: 30px;
      margin-right: 10px;
    }
  }
`;
export default Footer;
