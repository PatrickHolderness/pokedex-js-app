let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let input = $('input');
  input.on('input', filterList);

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (pokemon.name && pokemon.detailsUrl) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct!');
    }
  }

  function addListItem(pokemon) {
    // select List & create list item
    let ul = document.querySelector('ul');
    let listItem = document.createElement('li');
    listItem.classList.add('col-sm-8');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.addEventListener('click', (event) => {
      showDetails(pokemon);
      event.target.blur();
    });
    //Add classes & attributes to list item
    button.classList.add('btn', 'btn-block', 'btn-outline-primary');
    button.classList.add('m-1', 'bg-blue');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');

    // Add item to list
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
      //modal.show(pokemon.name, pokemon.height, pokemon.types, pokemon.svgUrl);
    });
  }

  function showModal(pokemon) {
    // Get Node Elements
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // Clear previous content
    modalTitle.empty();
    modalBody.empty();

    // Create Pokemon Elements
    let pokemonName = $(`<h1>${pokemon.name}</h1>`);
    let pokemonImage = $(
      `<img class="modal-img mx-auto" src="${pokemon.svgUrl}" alt="Drawing of Pokemon ${pokemon.name}">`
    );
    let pokemonHeight = $(
      `<p class="ml-4 mt-3 mb-0" "text-capitalize">Height: ${pokemon.height}</p>`
    );
    let pokemonWeight = $(`<p class="ml-4 mb-0">Weight: ${pokemon.weight}</p>`);
    let pokemonTypes = $(
      `<p class="ml-4">Types: ${pokemon.types.join(', ')}</p>`
    );

    // Append Pokemon Elements
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((err) => console.log(err));
  }

  function filterList() {
    let inputValue = $('input').val();
    let list = $('li');
    list.each(function () {
      let item = $(this);
      let name = item.text();
      if (name.startsWith(inputValue)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((res) => res.json())
      .then((details) => {
        //add details to item
        item.weight = details.weight;
        item.imageUrl = details.sprites.front_default;
        item.svgUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
      })
      .catch((err) => console.log(err));
  }

  return {
    getAll,
    add,
    loadList,
    loadDetails,
    addListItem,
    filterList,
  };
})();

// Create & display list of Pokemon
pokemonRepository.loadList().then(() => {
  pokemonRepository
    .getAll()
    .sort((a, b) => a.name > b.name)
    .forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
});