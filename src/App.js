import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>deliciouss</Logo>
      </Nav>
      <Search />
      <Category />
      <Pages />
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4rem 0;
  svg {
    font-size: 2rem;
  }
`;

export default App;
