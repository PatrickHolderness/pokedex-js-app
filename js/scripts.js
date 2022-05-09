
const pokemonRepository = (function () {
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
  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll () {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();
console.log(pokemonRepository.getAll());

pokemonRepository.add({ name: 'Overkwil', height: 24, types: ['dark', 'poison'], category: 'Pin cluster' });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 10) {
    document.write('<p class="special">' + pokemon.name, '(height: ' + pokemon.height + ')-Wow!-that\'s big</p>');
  } else {
    document.write('<p>' + pokemon.name, '(height: ' + pokemon.height + ')</p>');
  }
});
