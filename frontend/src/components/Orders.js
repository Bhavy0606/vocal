import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
import { collection, getDocs, orderBy } from "firebase/firestore";
import db from "../firebase";
function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  console.log(basket);

  useEffect(() => {
    const fetchdata = async () => {
      const querySnapshot = await getDocs(
        collection(db, "orders", user.email, "list"),
        orderBy("orderDate", "desc")
      );

      setOrders(querySnapshot.docs);
    };

    fetchdata();
  }, [user]);
  return (
    <>
      <Navbar />
      <Container>
        <Main>
          <Heading>Your Orders</Heading>

          {orders.map((item) => (
            <Data>
              <h3>OrderId : {item.data().orderId}</h3>
              {item.data().basket?.map((item) => (
                <Product>
                  <div className="sc-456tyfg">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="sc-26ret">
                    <div className="sc-pro456">
                      <p>{item.name}</p>
                      <span>Size : {item.size}</span>
                    </div>
                    <div className="sc-qua789">
                      <p>Quantity</p>
                      <div className="sc-ty456">
                        <span>{item.quantity}</span>
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
                <p>₹ {getBasketTotal(item.data().basket)}</p>
              </Amount>
            </Data>
          ))}
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

  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;

  h3 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
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
  height: 30px;
  margin-top: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;

  h4 {
    color: #595959;
    font-family: "Nunito", sans-serif;
  }

  p {
    font-family: "Nunito", sans-serif;
    font-weight: 700;
  }
`;

export default Orders;
