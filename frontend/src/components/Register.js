import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import db, { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import axios from "../axios";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const createAccount = async (e) => {
    e.preventDefault();
    const username_query = await query(
      collection(db, "users"),
      where("userName", "==", fullname)
    );

    const username_exists = await getDocs(username_query);

    if (username_exists.docs.length === 0) {
      if (fullname.length > 0 && email.length > 0 && password.length > 0) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            updateProfile(userCredential.user, {
              displayName: fullname,
            });
            sendEmailVerification(auth.currentUser).then((result) => {
              console.log(result);
            });

            await setDoc(doc(db, "users", userCredential.user.uid), {
              email,
              fullname,
            });

            setEmail("");
            setPassword("");

            setFullname("");
            alert("Your Account is Created");
            navigate("/login");
          })
          .catch((err) => alert(err));
      } else {
        alert("Please fill the inputs");
      }
    } else {
      alert("user Name is Exists");
    }
  };
  return (
    <Container>
      <FormContainer>
        <Logo>
          <img src="./images/dark_logo.png" alt="" />
        </Logo>
        <Form>
          <h2>Create Account</h2>
          <InputField>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setRepassword(e.target.value)}
              value={repassword}
            />
          </InputField>

          <SignInButton onClick={createAccount}>Create </SignInButton>

          <p className="sc-456yuu">
            Have an Account ?
            <span onClick={() => navigate("/login")}>Sign In</span>
          </p>
        </Form>
      </FormContainer>
      <Image>
        <img src="./images/login-Page.png" alt="" />
      </Image>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  @media only screen and (max-width: 1260px) {
    align-items: center;
    justify-content: center;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Logo = styled.div`
  margin-bottom: 40px;
  width: 200px;
  img {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
    img {
      width: 100%;
    }
  }
`;

const Form = styled.form`
  width: 40%;

  h2 {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;

    color: #000000;
  }

  .sc-456yuu {
    font-family: "Nunito", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    text-align: center;

    color: #000000;
    margin-top: 20px;

    span {
      font-weight: 700;
    }
    span:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;

const InputField = styled.div`
  display: flex;
  width: 90;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  input {
    width: 100%;
    height: 35px;
    margin-top: 20px;
    border: 2.5px solid #000000;
    border-radius: 5px;
    padding-left: 10px;
  }

  input::placeholder {
    color: #000;
    width: 90%;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #fff;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: center;

  color: #ffffff;
  margin-top: 20px;
  border: none;
  border: 2px solid #000000;
  border-radius: 5px;
`;

const Image = styled.div`
  height: 100%;

  img {
    height: 100%;
  }

  @media only screen and (max-width: 1260px) {
    display: none;
  }
`;

export default Register;
