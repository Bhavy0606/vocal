import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const changeQuantity = (e, sign, id) => {
    e.preventDefault();
    let index = basket.findIndex((item) => item.id === id);

    if (sign === "-" && basket[index].quantity > 1) {
      let newQuantity = basket[index].quantity - 1;
      let newProduct = {
        ...basket[index],
        quantity: newQuantity,
        amount: 350 * newQuantity,
      };

      dispatch({
        type: "ADD_EXIST_PRODUCT",
        item: newProduct,
        index: index,
      });
    }

    if (sign === "+" && basket[index].quantity < 5) {
      let newQuantity = basket[index].quantity + 1;
      let newProduct = {
        ...basket[index],
        quantity: newQuantity,
        amount: 350 * newQuantity,
      };

      dispatch({
        type: "ADD_EXIST_PRODUCT",
        item: newProduct,
        index: index,
      });
    }
  };

  const removeFromBag = (e, id) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_FROM_BAG",
      id: id,
    });
  };

  console.log(basket);
  return (
    <>
      <Navbar />
      <Container>
        <Main>
          <Heading>Shopping Bag</Heading>
          <Data>
            {basket?.map((item) => (
              <Product>
                <div className="sc-456tyfg">
                  <img src={item.image} alt="" />
                </div>
                <div className="sc-26ret">
                  <div className="sc-pro456">
                    <p>{item.name}</p>
                    <span>Size : {item.size}</span>
                    <div className="sc-but678">
                      <button onClick={(e) => removeFromBag(e, item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="sc-qua789">
                    <p>Quantity</p>
                    <div className="sc-ty456">
                      <button onClick={(e) => changeQuantity(e, "-", item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={(e) => changeQuantity(e, "+", item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="sc-tot234">
                  <p>Total</p>
                  <strong>₹ {item.price * item.quantity}</strong>
                </div>
              </Product>
            ))}

            <Amount>
              <h4>Grand Total</h4>
              <p>₹ {getBasketTotal(basket)}</p>
            </Amount>
          </Data>
          <Button onClick={() => navigate("/checkout")}>
            {" "}
            Proceed To Checkout
          </Button>
        </Main>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 75px;
  height: calc(100vh - 75px);

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Main = styled.div`
  width: 850px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 15px;

  margin-top: 00px;
`;

const Heading = styled.h1`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 68px;
  text-align: center;
  text-transform: uppercase;

  color: #000000;
`;

const Data = styled.div`
  width: 90%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #606060;
  margin-top: 10px;
  .sc-456tyfg {
    height: 100px;
    flex: 0.09;
    img {
      height: 90%;
    }
  }

  .sc-26ret {
    flex: 0.7;
    background-color: #fff;
    padding: 10px;
    margin-left: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .sc-pro456 {
      p {
        font-family: "Nunito";
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        margin-bottom: 7px;
        color: #000000;
      }

      span {
        margin-bottom: 7px;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        text-transform: capitalize;

        color: #606060;
      }

      .sc-but678 {
        display: flex;
        button {
          font-size: 13px;
          background-color: transparent;
          margin-right: 10px;
          color: #606060;
          border: none;
          font-weight: 500;
          border-bottom: 1px solid #606060;
        }
      }
    }

    .sc-qua789 {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      flex-direction: column;

      p {
        font-family: "Nunito";
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        text-transform: capitalize;

        color: #606060;
        margin-bottom: 10px;
      }
      button {
        width: 25px;
        height: 25px;
        border: none;
        background: #f3f3f3;

        font-size: 17px;
      }

      span {
        margin: 0px 10px;
      }
    }
  }

  .sc-tot234 {
    padding: 10px;
    height: 80px;
    flex: 0.2;
    background-color: #fff;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    p {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 25px;
      display: flex;
      align-items: center;
      letter-spacing: 0.02em;
      text-transform: capitalize;

      color: #606060;
      margin-bottom: 10px;
    }
  }
`;

const Amount = styled.div`
  background: #eeeeee;
  height: 50px;
  margin-top: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;

  padding-left: 40px;
  padding-right: 40px;

  h4 {
    color: #595959;
    font-family: "Nunito", sans-serif;
    font-size: 20px;
  }

  p {
    font-family: "Nunito", sans-serif;
    font-weight: 700;
  }
`;

const Button = styled.button`
  background-color: #000;
  width: 90%;
  margin-top: 20px;
  height: 50px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
`;

export default Cart;
