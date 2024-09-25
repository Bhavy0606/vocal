import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";

import { useRef } from "react";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();
  const [openDropdown, setOpenDropDown] = useState(false);
  const profileDropdown = useRef(null);
  const logOut = (e) => {
    e.preventDefault();

    signOut(auth).then((result) => {
      dispatch({
        type: "SET_USER",
        user: null,
      });
      localStorage.removeItem("user");
      alert("Sign Out Succesfull");
      navigate("/");
    });
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (e.path[0] !== profileDropdown.current) {
        setOpenDropDown(false);
      }
    };
    document.body.addEventListener("click", closeMenu);

    return () => document.body.removeEventListener("click", closeMenu);
  }, []);
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img
          src="https://ik.imagekit.io/euo36lugk/Vocal/Logo_lcA5u3gLE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497246289"
          alt=""
        />
      </Logo>
      <Menu>
        <button>
          <img
            onClick={() => navigate("/shoppingbag")}
            src="https://ik.imagekit.io/euo36lugk/shopping-bag__OA26vKpS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300677175d"
            alt=""
          />
        </button>

        {user ? (
          <>
            <button>
              <img
                ref={profileDropdown}
                onClick={() => setOpenDropDown(!openDropdown)}
                src="https://ik.imagekit.io/euo36lugk/Vocal/user_j3_SHcbDZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669754843889"
                alt=""
              />
            </button>

            <DropDown open={openDropdown}>
              <button onClick={() => navigate("/orders")}>Your Orders</button>
              <button onClick={logOut}>LogOut</button>
            </DropDown>
          </>
        ) : (
          <button>
            <img
              onClick={() => navigate("/login")}
              src="./images/user.png"
              alt=""
            />
          </button>
        )}
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  left: 0px;
`;

const Logo = styled.div`
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;

    @media only screen and (max-width: 960px) {
      width: 60%;
    }
  }
`;

const Menu = styled.div`
  position: absolute;
  right: 10px;
  width: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  button {
    background-color: transparent;
    border: none;

    img {
      width: 22px;
    }

    &:nth-child(1) {
      margin-right: 10px;
    }
  }

  .dropdown-button {
    display: flex;

    button {
      padding: 5px;

      &:hover {
        background-color: transparent;
      }
    }
  }
  @media only screen and (max-width: 960px) {
    width: 75px;
    margin-top: 5px;
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 150px;
  height: 80px;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background-color: white;
  right: 0;
  z-index: 10;
  top: 40px;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  button {
    height: 50%;
    width: 100%;
    border-radius: 5px;

    &:hover {
      background-color: lightgray;
    }
  }
`;
export default Navbar;
