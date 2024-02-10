import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const [Popular, setPopular] = useState([]);
  let apiKey = "c25f524b82c64a11ad958b29b085752b";

  useEffect(() => {
    const getPopular = async () => {
      const check = localStorage.getItem("popular");

      if (check) {
        setPopular(JSON.parse(check));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`
        );
        const data = await api.json();
        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
      }
    };
    getPopular();
  }, [apiKey]);
  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          gap: "5rem",
          pagination: false,
          drag: "free",
        }}
      >
        {Popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={"/recipes/" + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt="" />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem 0rem;
  padding: 10px;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
  }
  p {
    height: 40%;
    z-index: 10;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    text-align: center;
    font-weight: 600;
    color: white;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default Popular;
