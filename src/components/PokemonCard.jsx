import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const PokemonCard = ({ img, name, id }) => {
    return (
        <StyledLink to={`/pokemons/${id}`}>
            <img src={img} alt="img" />
            <p>{name}</p>

        </StyledLink>
    );
}

export default PokemonCard;
const StyledLink = styled(Link)`
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid black;
    cursor: pointer;
    background-color: #00b3ff;
    transition: 0.3s ease;
    text-decoration: none;
    color: white;
    &:hover{
        transform: translateY(-10px);
    }
    img{
        display: block;
        margin: auto;
    }
    p{
        text-align: center;
    }
`
