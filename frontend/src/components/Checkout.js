import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
import axios from "../axios";
import { useEffect } from "react";
import useRazorpay from "react-razorpay";
import { doc, setDoc } from "firebase/firestore";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const navigate = useNavigate();
  const Razorpay = useRazorpay();
  const [address, setAddress] = useState({
    fullname: "",
    lineOne: "",
    lineTwo: "",
    phoneNumber: "",
    zipcode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const fetchOrderId = async () => {
      const data = await axios
        .post("/create/orderId", {
          amount: getBasketTotal(basket) * 100,
        })
        .then((result) => setOrder(result))
        .catch((err) => console.log(err));
    };
    fetchOrderId();
  }, [basket]);

  const handlePayment = async () => {
    // const order = await createOrder(params); //  Create order on your backend
    if (
      address.city.length > 0 &&
      address.fullname.length > 0 &&
      address.lineOne.length > 0 &&
      address.lineTwo.length > 0 &&
      address.phoneNumber.length > 0 &&
      address.state.length > 0 &&
      address.zipcode.length > 0
    ) {
      const options = {
        key: "rzp_test_qoANfvd3uvzgTp", // Enter the Key ID generated from the Dashboard
        amount: getBasketTotal(basket) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response) {
          alert("Payment Confirmed");
          const data = {
            orderCreationId: order.data.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: getBasketTotal(basket),
            basket: basket,
            user: user ? user : null,
            guestEmail: email,
            address: address,
          };
          const result = await axios.post("/payment/success", data);
          const resultData = {
            orderId: result.data.orderId,
            paymentId: result.data.paymentId,
            address: address,
            amount: getBasketTotal(basket),
            basket: basket,
            orderDate: new Date().getTime(),
          };
          setDoc(
            doc(
              db,
              "orders",
              user ? user?.email : email,
              "list",
              order.data.orderId
            ),
            resultData
          );

          dispatch({
            type: "EMPTY_BASKET",
          });
          navigate("/");
        },

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "red",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } else {
      alert("Please fill up the form properly");
    }
  };
  console.log("basket >>>", basket);
  return (
    <>
      <Navbar />
      <Container>
        <Main>
          <Heading>Checkout</Heading>
          <Data>
            <Information>
              {!user ? (
                <SignInForm>
                  <Header>1. Continue As Guest</Header>

                  <p>
                    If you want to Sign In&nbsp;
                    <span onClick={() => navigate("/login")}>Click Here</span>
                  </p>
                  <Inputcontainer
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </SignInForm>
              ) : (
                <h3>Hello, {user?.fullname}</h3>
              )}

              <AddressForm>
                <Header>{`${user ? "1" : "2"}. Address`}</Header>
                <Inputcontainer
                  placeholder="Full Name"
                  onChange={(e) =>
                    setAddress({ ...address, fullname: e.target.value })
                  }
                  value={address.fullname}
                  required
                />
                <Inputcontainer
                  placeholder="Address Line One"
                  onChange={(e) =>
                    setAddress({ ...address, lineOne: e.target.value })
                  }
                  value={address.lineOne}
                  required
                />
                <Inputcontainer
                  placeholder="Address Line Two"
                  onChange={(e) =>
                    setAddress({ ...address, lineTwo: e.target.value })
                  }
                  value={address.lineTwo}
                  required
                />
                <Inputcontainer
                  placeholder="Phone Number"
                  onChange={(e) =>
                    setAddress({ ...address, phoneNumber: e.target.value })
                  }
                  value={address.phoneNumber}
                  required
                />
                <div className="sc-cit789">
                  <Inputcontainer
                    placeholder="Zip Code"
                    onChange={(e) =>
                      setAddress({ ...address, zipcode: e.target.value })
                    }
                    value={address.zipcode}
                    required
                  />
                  <Inputcontainer
                    placeholder="City"
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    value={address.city}
                    required
                  />
                  <Inputcontainer
                    placeholder="State"
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    value={address.state}
                    required
                  />
                </div>
              </AddressForm>
              <button onClick={handlePayment}>Pay Now</button>
            </Information>
            <Items>
              <div className="sc-item345">
                {basket?.map((item) => (
                  <Product>
                    <div className="sc-456tyfg">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="sc-26ret">
                      <div className="sc-pro456">
                        <p>{item.name}</p>
                        <span>Size : 200ml</span>
                        <div className="sc-but678">
                          <button>Edit</button>
                        </div>
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
              </div>

              <Amount>
                <h4>Grand Total</h4>
                <p>₹ {getBasketTotal(basket)}</p>
              </Amount>
            </Items>
          </Data>
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

  @media only screen and (max-width: 1000px) {
    height: 1200px;
  }
`;

const Main = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;

  margin-top: 00px;

  @media only screen and (max-width: 1000px) {
    height: fit-content;
    width: 90%;
  }
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
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    height: fit-content;
  }
`;

const Information = styled.div`
  width: 40%;

  height: 500px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    height: fit-content;
    margin-top: 50px;
  }
  button {
    width: 100%;
    height: 40px;
    background-color: #000;
    color: #fff;
    margin-top: 20px;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
  }

  h3 {
    font-family: "Nunito", sans-serif;
    margin-bottom: 20px;
    font-size: 22px;
  }
`;

const Items = styled.div`
  width: 50%;

  padding-right: 10px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }

  .sc-item345 {
    height: fit-content;
    max-height: 340px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    padding-right: 10px;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #cdcdcd;
    }
  }
`;

const SignInForm = styled.div`
  p {
    font-size: 13px;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    margin-top: 15px;
    margin-left: 0px;

    span {
      font-weight: 700;
      font-size: 13px;
      padding-bottom: 20px;
      cursor: pointer;
    }
    span:hover {
      text-decoration: underline;
    }
  }

  margin-bottom: 30px;
`;

const AddressForm = styled.div`
  input {
    margin-top: 20px;
  }
  .sc-cit789 {
    display: flex;
    input {
      margin-right: 10px;
    }
  }
`;

const Header = styled.div`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding-bottom: 5px;
  color: #000000;

  border-bottom: 2px solid #000;
`;

const Inputcontainer = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 33px;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  font-size: 15px;
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
    background-color: white;
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

export default Checkout;
