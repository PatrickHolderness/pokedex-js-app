let pokemonRepository = (function () {
  let pokemonList= [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonKeys = ['name', 'detailsUrl', 'imageUrl', 'height', 'types'];
  let modalContainer = document.querySelector('#modal-container');
  
  function getAll() {
    return pokemonList;
  }
  
  function add(pokemon) {
    pokemonList.push(pokemon);
    }
  

  function addListItem(pokemon){
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-list-button");
    listItem.appendChild(button);
    list.appendChild(listItem);
    addListener(button, pokemon);
  }

  function addListener(button, pokemon) {

  button.addEventListener('click', () => showDetails(pokemon));
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
        modal.show(pokemon.name, pokemon.height, pokemon.types, pokemon.svgUrl);
      });
      }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
             let pokemon = {
             name: item.name,
             detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
    }


    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.svgUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;

      }).catch(function (e) {
        console.error(e);
      });
    }



    let modal = (function () {
      let modalContainer = document.querySelector("#modal-container");
  
      function show(name, height, types, svgUrl) {
        modalContainer.innerHTML = "";
        let modal = document.createElement("div");
        modal.classList.add("modal");
  
        let closeButton = document.createElement("button");
        closeButton.classList.add("modal__close-button");
        closeButton.innerText = "close";
        closeButton.addEventListener("click", hideModal);
  
        let pokemonName = document.createElement("h1");
        pokemonName.innerText = name;
  
        let pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("src", svgUrl);
  
        let pokemonHeight = document.createElement("p");
        pokemonHeight.innerText = "Height: " + height;
  
        let pokemonTypes = document.createElement("p");
        pokemonTypes.innerText = "Types: " + types.join(", ");
  
        let textContainer = document.createElement("div");
        textContainer.classList.add("modal__text-container");
        textContainer.appendChild(pokemonName);
        textContainer.appendChild(pokemonHeight);
        textContainer.appendChild(pokemonTypes);
  
        modal.appendChild(closeButton);
        modal.appendChild(pokemonImage);
        modal.appendChild(textContainer);
  
        modalContainer.appendChild(modal);
        modalContainer.classList.add("is-visible");
      }
  
      function hideModal() {
        modalContainer.classList.remove("is-visible");
      }
  
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          hideModal();
        }
      });
  
      modalContainer.addEventListener("click", (e) => {
        if (e.target === modalContainer) {
          hideModal();
        }
      });
  
      return {
        show,
      };
    })();

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();


pokemonRepository.loadList (). then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});