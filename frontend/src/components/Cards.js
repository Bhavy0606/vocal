import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function Cards({
  id,
  image,
  name,
  type,
  price,
  setSidebarOpen,
  setSelectProduct,
}) {
  const navigate = useNavigate();
  const addProduct = (e) => {
    e.preventDefault();
    setSidebarOpen(true);

    setSelectProduct({
      name: name,
      image: image,
      size: "200 ml",
      quantity: 1,
      type: type,
      price: price,
      id: id,
      amount: 350,
    });
  };
  return (
    <Container>
      <Image onClick={() => navigate(`/product/${id}`)}>
        <img src={image} alt="" />
      </Image>

      <Info>
        <h4>{name}</h4>
        <p>{type}</p>
        <strong>₹ {price}</strong>
        <button onClick={addProduct}>ADD TO BAG</button>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  img {
    width: 60px;
  }
`;

const Info = styled.div`
  font-family: "Nunito", sans-serif;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
  h4 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    font-size: 13px;
    margin-bottom: 10px;
  }

  strong {
    font-size: 14px;
  }

  button {
    height: 30px;
    margin-top: 10px;
    background-color: transparent;
    border: 1px solid #000;
  }
`;
export default Cards;
