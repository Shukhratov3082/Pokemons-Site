import React from 'react';
import { Routes, Route } from 'react-router-dom'
import PokemonDetails from './containers/PokemonDetails';
import PokemonsList from './containers/PokemonsList';
import Home from './components/Home';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pokemons' element={<PokemonsList />} />
      <Route path='/pokemons/:id' element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
