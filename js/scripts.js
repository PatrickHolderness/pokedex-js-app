const pokemonList = [
  {
    name: 'Pikachu',
    height: 4,
    types: ['electric'],
    category: 'mouse' 
  },
  {
    name: 'Bulbasaur',
    height: 7,
    types: ['grass', 'poison'],
    category: 'seed'
  },
  {
      name: 'Mewtwo',
    height: 20,
    types: ['psychic'],
    category: 'genetic'
  },
  {
    name: 'Charmander',
    height: 2,
    types: ['fire'],
    category: 'Lizard'
  },
  
];

pokemonList.forEach(function (pokemon) {
  document.write('<p>' + pokemon.name, '(height: ' + pokemon.height + ')</p>');
  });

  
