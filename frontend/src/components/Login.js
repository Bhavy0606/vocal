import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import db, { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{}, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          const newUser = {
            fullname: userCredential.user.displayName,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          };

          dispatch({
            type: "SET_USER",
            user: newUser,
          });

          localStorage.setItem("user", JSON.stringify(newUser));

          navigate("/");
        } else {
          alert("Please verify your account");
        }
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
        };

        dispatch({
          type: "SET_USER",
          user: newUser,
        });
        localStorage.setItem("user", JSON.stringify(newUser));
        await setDoc(doc(db, "users", result.user.uid), {
          fullname: newUser.fullname,
          email: newUser.email,
        });

        navigate("/");
      })
      .catch((err) => alert(err.code));
  };
  return (
    <Container>
      <FormContainer>
        <Logo>
          <img src="./images/dark_logo.png" alt="" />
        </Logo>
        <Form>
          <h2>Welcome Back</h2>
          <InputField>
            <input
              type="email"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputField>
          <CTA>
            <p onClick={() => navigate("/reset")}>Forget Password ?</p>
          </CTA>

          <SignInButton onClick={login}>Sign In</SignInButton>
          <SignInWithGoogle onClick={signInWithGoogle}>
            Sign In With Google
          </SignInWithGoogle>

          <p className="sc-456yuu">
            Don't have an Account ?{" "}
            <span onClick={() => navigate("/register")}>Sign Up</span>
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
    line-height: 41px;

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

const CTA = styled.div`
  display: flex;
  justify-content: end;

  width: 95%;
  padding: 10px;
  p {
    font-family: "Nunito", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    text-align: center;

    color: #000000;
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

const SignInWithGoogle = styled.button`
  width: 100%;
  height: 40px;
  background-color: transparent;

  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: center;

  color: #000;
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
export default Login;
