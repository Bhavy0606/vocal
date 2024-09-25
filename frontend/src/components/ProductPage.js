import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";

import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";

import MistPerfume from "./Data";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
function ProductPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { product } = useParams();
  const [{ basket }, dispatch] = useStateValue();
  const [selectProduct, setSelectProduct] = useState({
    name: "",
    type: "",
    quantity: 1,
    price: 0,
    size: "",
    image: "",
    id: "",
    amount: 0,
  });

  useEffect(() => {
    setSelectProduct({
      name: MistPerfume[product].name,
      type: "Mist Perfume",
      quantity: 1,
      price: MistPerfume[product].price,
      image: MistPerfume[product].image,
      id: product,
      amount: 350,
    });
  }, [product]);

  const addToBag = (e) => {
    e.preventDefault();

    const index = basket.findIndex((item) => item.id === selectProduct.id);

    if (index === -1) {
      dispatch({
        type: "ADD_TO_BAG",
        item: selectProduct,
      });
    } else if (index > -1) {
      let newQuantity = basket[index].quantity + selectProduct.quantity;
      let newProduct = {
        ...selectProduct,
        quantity:
          basket[index].quantity < 5 ? newQuantity : basket[index].quantity,
        amount:
          basket[index].quantity < 5
            ? newQuantity
            : basket[index].quantity * 350,
      };
      dispatch({
        type: "ADD_EXIST_PRODUCT",
        item: newProduct,
        index: index,
      });
    }

    setSelectProduct({
      name: "",
      type: "",
      quantity: 1,
      price: 0,
      size: "",
      image: "",
      id: "",
      amount: 0,
    });

    setSidebarOpen(false);
  };
  return (
    <>
      <Navbar />
      <Container sideBarOpen={sidebarOpen}>
        {sidebarOpen && <BackGroundBlur />}
        <SideMenu className={sidebarOpen ? "sidebar-active" : ""}>
          <div className="sidebar_data">
            <img
              className="cross"
              onClick={() => setSidebarOpen(false)}
              src="https://ik.imagekit.io/euo36lugk/Vocal/x_Jq70AyZwe.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300817121"
              alt=""
            />
            <h1>Rising Energy</h1>

            <div className="product_data">
              <img src={MistPerfume[product].image} alt="" />
              <div className="product_detail">
                <div className="sc-44jh">
                  <h4>Mist Perfume</h4>
                  <strong> ₹ {MistPerfume[product].price}</strong>
                  <p>Size : 200ml</p>
                </div>
                <button className="add_to_cart" onClick={addToBag}>
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </SideMenu>
        <Main sideBarOpen={sidebarOpen}>
          <ImageSection sideBarOpen={sidebarOpen}>
            <div className="img">
              <img src={MistPerfume[product].image} alt="" />
            </div>
            <div className="img">
              <img src={MistPerfume[product].imageTwo} alt="" />
            </div>
          </ImageSection>
          <DetailSection sideBarOpen={sidebarOpen}>
            <ProductDetail>
              <p>New Arrival</p>
              <h1>{MistPerfume[product].name}</h1>
              <Rating
                name="read-only"
                value={MistPerfume[product].rating}
                readOnly
              />
              <strong>₹ {MistPerfume[product].price}</strong>
              <button onClick={() => setSidebarOpen(true)}>ADD TO BAG</button>
            </ProductDetail>
            <ProductDescription>
              <Tab>
                <button>Description</button>
              </Tab>

              <Info>
                <h3>Product</h3>
                <p>{MistPerfume[product].description.productDetail}</p>

                <h3>Composition</h3>

                <p>{MistPerfume[product].description.composition}</p>
              </Info>
            </ProductDescription>
          </DetailSection>
        </Main>

        <Footer />
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  overflow-x: hidden;
  background-color: ${(props) =>
    props.sideBarOpen ? "rgba(0,0,0,0.7)" : "transparent"};

  .sidebar-active {
    right: 0px;
    transition: all 0.5s ease-in-out;
    display: block;
    z-index: 1000;
    opacity: 1;
  }

  @media only screen and (max-width: 975px) {
    height: fit-content;
    width: 100vw;
    overflow-x: hidden;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;

  margin-top: 150px;

  @media only screen and (max-width: 975px) {
    flex-direction: column;
    margin-top: 50px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  width: 40%;

  z-index: ${(props) => (props.sideBarOpen ? "-1" : "1")};
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  height: 500px;
  justify-content: space-between;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  .img {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .img:nth-child(2) {
    img {
      margin-top: 100px;
      width: 346px;
      height: 421px;
    }
  }

  @media only screen and (max-width: 975px) {
    width: 100vw;
    margin-top: 80px;
  }

  img {
    &:nth-child(1) {
      height: 500px;
      margin-bottom: 50px;

      @media only screen and (max-width: 975px) {
        height: 400px;
      }
    }
  }
`;

const DetailSection = styled.div`
  width: 50%;
  height: 100%;

  z-index: ${(props) => (props.sideBarOpen ? "-100" : "1")};
  margin: auto;
  @media only screen and (max-width: 975px) {
    width: 90%;
    padding-top: 50px;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    text-transform: uppercase;

    color: #bc2103;
    margin-bottom: 10px;
  }

  h1 {
    font-family: "Nanum Myeongjo";
    font-style: normal;
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 60px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;

    color: #000000;

    @media only screen and (max-width: 975px) {
      font-size: 45px;
      line-height: 55px;
      margin-bottom: 10px;
    }
  }

  strong {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 25px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin-bottom: 30px;
    margin-top: 10px;

    color: #000000;

    @media only screen and (max-width: 975px) {
      font-size: 16px;
      margin-top: 10px;
    }
  }

  button {
    background: #000000;
    border: 1px solid #000000;
    width: 249px;
    height: 50px;
    margin-bottom: 10px;
    font-family: "Nunito";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.02em;
    text-transform: capitalize;

    color: #ffffff;

    @media only screen and (max-width: 975px) {
      width: 150px;
      font-size: 14px;
    }
  }
`;

const ProductDescription = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const Tab = styled.div`
  margin-bottom: 20px;
  button {
    background-color: transparent;

    margin-right: 20px;
    height: 33px;
    font-size: 17px;
    border: none;

    &:nth-child(1) {
      border-bottom: 3px solid black;
      font-weight: 700;
    }
  }
`;

const Info = styled.div`
  padding: 15px;
  width: 100%;
  h3 {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    text-transform: capitalize;

    color: #000000;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  p {
    width: 90%;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  width: 400px;
  height: 100vh;
  background-color: #fff;
  right: -500px;
  z-index: 100;
  transition: all 0.5s ease-in-out;
  opacity: 0;

  .cross {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }

  .sidebar_data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    h1 {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 800;
      font-size: 40px;
      line-height: 89px;
      display: flex;
      align-items: center;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      border-bottom: 6px solid #000;
      color: #000000;
    }

    .product_data {
      display: flex;
      align-items: center;
      margin-top: 40px;
      width: 60%;
      justify-content: space-between;

      img {
        height: 200px;
      }

      .product_detail {
        .sc-44jh {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h4 {
            font-family: "Nunito";
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 25px;
            display: flex;
            align-items: center;
            letter-spacing: 0.02em;
            text-transform: uppercase;

            color: #000000;
            margin-bottom: 0px;
          }

          strong {
            font-family: "Nunito";
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 25px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            margin-bottom: 0px;
            color: #000000;
          }

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
            margin-bottom: 10px;

            color: #606060;
          }

          .quantiy_buttons {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
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

        .add_to_cart {
          height: 40px;
          width: 150px;
          margin-top: 40px;
          background-color: transparent;
          border: 2px solid #000;
          font-weight: 600;
        }
      }
    }
  }
`;

const BackGroundBlur = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  z-index: 100;
`;
export default ProductPage;
