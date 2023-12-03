import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PokemonCard from '../components/PokemonCard';

const PokemonsList = () => {
    const [pokemons, setPokemons] = useState([])


    useEffect(() => {

        let request = []
        for (let i = 1; i <= 100; i++) { // forri ozi bilan osa bomidi promise all ishlatish kere
            request.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(({ data }) => data))
        }
        Promise.all(request).then(data => setPokemons(data))// botta hammasi keganidan keyin berilvotti
    }, [])
    console.log(pokemons)
    return (
        <Wrapper>
            {pokemons.map(({ name, sprites, id }) => <PokemonCard key={id} id={id} name={name} img={sprites.front_default} />)}
        </Wrapper >
    );
}

export default PokemonsList;
const Wrapper = styled.div`
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
    gap: 20px;
`
