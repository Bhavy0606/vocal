import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Store from "./components/Store";

import Poster from "./components/Poster";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import PopUp from "./components/PopUp";
import PasswordReset from "./components/PasswordReset";
import Orders from "./components/Orders";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Store />
                <Poster />
                <Footer />
              </>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:product" element={<ProductPage />} />
          <Route path="/shoppingbag" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<PasswordReset />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  max-width: 2290px;
  margin: auto;

  .popup-active {
    opacity: 1;
    bottom: 0;
    transition: 1s all ease-in-out;
  }
`;

export default App;
