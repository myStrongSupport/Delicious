import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Veggie = () => {
  const [Veggie, setVeggie] = useState([]);
  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=77a723fe14ec4ddb8a9164a9a90bf38f&number=9`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  useEffect(() => {
    getVeggie();
  }, []);
  return (
    <Wrapper>
      <h3>Veggie Picks</h3>
      <Splide
        options={{
          perPage: 3,
          gap: "5rem",
          pagination: false,
          drag: "free",
        }}
      >
        {Veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Link to={"/recipes/" + recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt="" />
                  <Gradient />
                </Card>
              </Link>
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

export default Veggie;
