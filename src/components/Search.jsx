import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [Input, SetInput] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + Input);
  };

  return (
    <FormStyled onSubmit={onSubmitHandler}>
      <FaSearch />
      <input
        onChange={(e) => {
          const val = e.target.value;
          SetInput(val);
        }}
        type="text"
        value={Input}
      />
    </FormStyled>
  );
};

const FormStyled = styled.form`
  width: 50%;
  margin: 0 auto;
  position: relative;

  input {
    width: 100%;
    font-size: 1.5rem;
    color: #fff;
    padding: 1rem 3rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    background: linear-gradient(35deg, #494949, #313131);
  }
  svg {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translate(0, -50%);
  }
`;

export default Search;
