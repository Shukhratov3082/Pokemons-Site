import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "../components/PokemonCard";

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let request = [];
    for (let i = 1; i <= 100; i++) {
      // forri ozi bilan osa bomidi promise all ishlatish kere
      request.push(
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(({ data }) => data)
      );
    }
    Promise.all(request).then((data) => setPokemons(data), setLoading(false));
  }, []);
  return (
    <Wrapper>
      {loading ? (
        <Loading>
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </Loading>
      ) : (
        pokemons.map(({ name, sprites, id }) => (
          <PokemonCard
            key={id}
            id={id}
            name={name}
            img={sprites.front_default}
          />
        ))
      )}
    </Wrapper>
  );
};

export default PokemonsList;
const Wrapper = styled.div`
  height: 100vh;
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 8em;
    animation: rotate4 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: hsl(0, 0%, 100%);
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
  }

  @keyframes rotate4 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash4 {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dashoffset: -125px;
    }
  }
`;
