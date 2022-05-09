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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 10) { // Highlighting special pokemon 
    document.write('<p class="special">' + pokemonList[i].name, '(height: ' + pokemonList[i].height + ')-Wow! that\'s big</p>');
  } else {
    document.write('<p>' + pokemonList[i].name, '(height: ' + pokemonList[i].height + ')</p>');
  }
}
  
