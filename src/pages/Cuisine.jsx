import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);

  let apiKey = "c25f524b82c64a11ad958b29b085752b";
  let params = useParams();

  useEffect(() => {
    const getCuisine = async (name) => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`
      );
      const recipes = await data.json();
      setCuisine(recipes.results);
    };
    getCuisine(params.type);
  }, [params, apiKey]);
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((cuisine) => {
        return (
          <Link to={"/recipes/" + cuisine.id}>
            <Card key={cuisine.id}>
              <img src={cuisine.image} alt="" />
              <h4>{cuisine.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(15rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
export default Cuisine;
