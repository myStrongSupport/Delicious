import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setAciveTab] = useState("instructions");

  const fetchDetails = async (name) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${name}/information?apiKey=c25f524b82c64a11ad958b29b085752b`
    );
    const data = await api.json();
    setDetails(data);
    console.log(data);
  };

  const param = useParams();

  useEffect(() => {
    fetchDetails(param.name);
  }, [param.name]);

  return (
    <DetailWrapper
      animate={{ opacity: 1, transform: "translateX(50px)" }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {console.log(details)}
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setAciveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setAciveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    > div {
      text-align: center;
      margin-bottom: 2rem;
    }
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  h3 {
    text-align: left;
  }

  p {
    font-size: 1.2rem;
    line-height: 2.5rem;
    text-align: left;
  }
  li {
    text-align: left;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    border-radius: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px black solid;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
  @media screen and (max-width: 1200px) {
    margin-left: 0;
    text-align: left;
  }
`;
export default Recipe;
