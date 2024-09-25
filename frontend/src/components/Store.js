import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cards from "./Cards";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { useStateValue } from "../StateProvider";
function Store() {
  const [dimension, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    const handleSize = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleSize);
  }, []);

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
          basket[index].quantity <= 5 ? newQuantity : basket[index].quantity,
        amount:
          basket[index].quantity <= 5
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
  console.log("basket >>>", basket);
  return (
    <Container>
      {sidebarOpen && <BackGroundBlur />}
      <h2>Our Store</h2>

      <SideMenu className={sidebarOpen ? "sidebar-active" : ""}>
        <img
          className="cross"
          onClick={() => setSidebarOpen(false)}
          src="https://ik.imagekit.io/euo36lugk/Vocal/x_Jq70AyZwe.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667300817121"
          alt=""
        />

        <div className="sidebar_data">
          <h1>{selectProduct.name}</h1>

          <div className="product_data">
            <img src={selectProduct.image} alt="" />
            <div className="product_detail">
              <div className="sc-44jh">
                <h4>Mist Perfume</h4>
                <strong> ₹ {selectProduct.price}</strong>
                <p>Size : {selectProduct.size}</p>
              </div>
              <button onClick={addToBag} className="add_to_cart">
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </SideMenu>
      <Products>
        <Swiper
          slidesPerView={dimension.width < 790 ? 2 : 3}
          spaceBetween={50}
          centeredSlidesBounds
          navigation
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <Cards
              id={"item_Kd0o6Xb03jXpkB"}
              image="https://ik.imagekit.io/euo36lugk/Vocal/Rising_RFaP0zCSG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497251928"
              name="Rising Energy"
              type={"Mist Perfume"}
              price={350}
              setSidebarOpen={setSidebarOpen}
              setSelectProduct={setSelectProduct}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              id={"item_Kd0oIq9ELS9UO9"}
              image="https://ik.imagekit.io/euo36lugk/Vocal/Aqua_u-4Ipa01O.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497251359"
              name="Aqua Romance"
              type={"Mist Perfume"}
              price={350}
              setSidebarOpen={setSidebarOpen}
              setSelectProduct={setSelectProduct}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              id={"item_Kd0oTvxPxY3F4y"}
              image="https://ik.imagekit.io/euo36lugk/Vocal/Pear_3hV1qGqeAn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666497251988"
              name="Pear Passion"
              type={"Mist Perfume"}
              price={350}
              setSidebarOpen={setSidebarOpen}
              setSelectProduct={setSelectProduct}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              id={"item_Kd0owxiSBcECFp"}
              image="https://ik.imagekit.io/euo36lugk/Vocal/Frame_1000007091_-uUfW3wgA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666931353451"
              name="Citrus Spirit"
              type={"Mist Perfume"}
              price={350}
              setSidebarOpen={setSidebarOpen}
              setSelectProduct={setSelectProduct}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              id={"item_Kd0ohyceFUsGiO"}
              image="https://ik.imagekit.io/euo36lugk/Vocal/Frame_1000007091__1__qqpT2gyRz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666931355656"
              name="Creamy Touch"
              type={"Mist Perfume"}
              price={350}
              setSidebarOpen={setSidebarOpen}
              setSelectProduct={setSelectProduct}
            />
          </SwiperSlide>
        </Swiper>
      </Products>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-color: ${(props) =>
    props.sideBarOpen ? "rgba(0,0,0,0.7)" : "transparent"};

  .sidebar-active {
    right: 0px;
    transition: all 0.5s ease-in-out;
    display: block;
    z-index: 1000;
    opacity: 1;
  }

  h2 {
    font-size: 40px;
  }

  @media only screen and (max-width: 954px) {
    margin-top: 40px;
  }
`;

const Products = styled.div`
  width: 70%;
  height: 400px;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;

  @media only screen and (max-width: 954px) {
    width: 90%;
  }

  .swiper {
  }

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
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
  top: 0;

  .cross {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
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
            margin-bottom: 5px;

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
export default Store;
