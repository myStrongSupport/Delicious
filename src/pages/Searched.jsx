import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const Searched = () => {
  const [searched, SetSearched] = useState([]);
  const param = useParams();
  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=c25f524b82c64a11ad958b29b085752b&query=${name}`
    );
    const recipes = await data.json();
    SetSearched(recipes.results);
  };

  useEffect(() => {
    getSearched(param.search);
  }, [param]);
  return (
    <Grid>
      {searched.map((item) => {
        return (
          <Link to={"/recipes/" + item.id}>
            <Card key={item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
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

export default Searched;
