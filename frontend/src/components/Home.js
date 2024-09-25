import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // cycle prevCount using mod instead of checking for hard-coded length
      setActive((prevCount) => (prevCount + 1) % 3);
    }, 3000);

    return () => clearInterval(timer);
  }, [active]);
  return (
    <>
      <Navbar />
      <Container>
        <Main>
          <Info>
            <h2>Smell Better When You Need It Most</h2>
            <p>
              Available premium quality uni-sexual perfumes with proven quality,
              refresh your day
            </p>
            <button>GET THE PRODUCT</button>
          </Info>
          <Rotator>
            <input
              type="checkbox"
              name="slider"
              id="item-1"
              checked={active === 0 ? true : false}
            />
            <input
              type="checkbox"
              name="slider"
              id="item-2"
              checked={active === 1 ? true : false}
            />
            <input
              type="checkbox"
              name="slider"
              id="item-3"
              checked={active === 2 ? true : false}
            />
            <div class="cards">
              <label
                class="card-box"
                for="item-1"
                id="song-1"
                onClick={() => setActive(0)}
              >
                <img
                  src="https://ik.imagekit.io/euo36lugk/Vocal/Aqua_u-4Ipa01O.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497251359"
                  alt="song"
                />
              </label>
              <label
                class="card-box"
                for="item-2"
                id="song-2"
                onClick={() => setActive(1)}
              >
                <img
                  src="https://ik.imagekit.io/euo36lugk/Vocal/Pear_3hV1qGqeAn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497251988"
                  alt="song"
                />
              </label>
              <label
                class="card-box"
                for="item-3"
                id="song-3"
                onClick={() => setActive(2)}
              >
                <img
                  src="https://ik.imagekit.io/euo36lugk/Vocal/Rising_RFaP0zCSG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497251928"
                  alt="song"
                />
              </label>
            </div>
          </Rotator>
        </Main>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh + 70px);

  @media only screen and (max-width: 768px) {
    padding-top: 200px;
  }
`;

const Main = styled.main`
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  width: 30%;
  height: 90%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 10px;

  h2 {
    font-size: 60px;
    font-family: "Nanum Myeongjo", serif;
    margin-bottom: 10px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    font-family: "Nunito", sans-serif;
    margin-bottom: 10px;
  }

  button {
    height: 43px;
    width: 150px;
    background-color: transparent;
    border-width: 2px;
  }

  @media only screen and (max-width: 1080px) and (min-width: 769px) {
    h2 {
      font-size: 35px;
    }

    p {
      font-size: 16px;
    }

    button {
      margin-top: 20px;
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    width: 80%;
    padding: 50px 10px;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 50px;
    }

    p {
      font-size: 14px;
    }

    button {
      margin-top: 20px;
    }
  }
`;

const Rotator = styled.div`
  input {
    display: none;
  }
  width: 30%;
  height: 500px;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  input[type="radio"] {
    display: none;
  }

  .card-box {
    position: absolute;

    left: 0;
    right: 0;
    margin: auto;
    transition: transform 0.4s ease;
    cursor: pointer;
    left: 21.5%;
  }

  .cards {
    position: relative;
    width: 200px;
    height: 600px;
  }

  img {
    height: 500px;
    border-radius: 10px;
    object-fit: cover;
  }

  #item-1:checked ~ .cards #song-3,
  #item-2:checked ~ .cards #song-1,
  #item-3:checked ~ .cards #song-2 {
    transform: translatex(-40%) scale(0.8);
    opacity: 0.4;
    z-index: 0;
  }

  #item-1:checked ~ .cards #song-2,
  #item-2:checked ~ .cards #song-3,
  #item-3:checked ~ .cards #song-1 {
    transform: translatex(40%) scale(0.8);
    opacity: 0.4;
    z-index: 0;
  }

  #item-1:checked ~ .cards #song-1,
  #item-2:checked ~ .cards #song-2,
  #item-3:checked ~ .cards #song-3 {
    transform: translatex(0) scale(1);
    opacity: 1;
    z-index: 1;
  }

  @media only screen and (max-width: 1080px) and (min-width: 769px) {
    height: 450px;
    img {
      height: 400px;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 90%;

    height: 450px;
    margin-top: 20px;
    img {
      height: 400px;
    }
  }
`;

export default Home;
