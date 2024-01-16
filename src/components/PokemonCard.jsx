import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const PokemonCard = ({ img, name, id }) => {
  return (
    <StyledLink to={`/pokemons/${id}`}>
      <img src={img} alt="img" />
      <p>{name}</p>
    </StyledLink>
  );
};

export default PokemonCard;
const StyledLink = styled(Link)`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  border-radius: 33px;
  background: #ede7ee;
  box-shadow: inset 6px 6px 11px #1e8bf2, inset -6px -6px 11px #72357a;
  cursor: pointer;
  background: linear-gradient(155deg, rgb(0 82 251) 8%, rgb(214 56 202) 79%);
  transition: 0.3s ease;
  text-decoration: none;
  color: white;
  &:hover {
    transform: translateY(-10px);
  }
  img {
    display: block;
    margin: auto;
  }
  p {
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
  }
`;
