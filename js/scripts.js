
let pokemonRepository = (function () {
  let pokemonList = [
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
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-list-button");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addEvent(button, pokemon);
  }
  function addEvent(button,pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
    function showDetails(pokemon) {
        console.log(pokemon);
    }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: 'Overkwil', height: 24, types: ['dark', 'poison'], category: 'Pin cluster' });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});