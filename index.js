(function () {

  const searchbox = document.getElementById('pokemon-finder');
  const pokemonListEl = document.getElementById('pokemons');
  const statusEl = document.getElementById('status');
  const API_ROOT = 'https://meowing-bristle-alamosaurus.glitch.me';

  // !COPY PASTED FROM https://www.freecodecamp.org/news/javascript-debounce-example/
  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  function setStatus (status) {
    statusEl.innerHTML = status;
  }

  function fetchPokemon (text) {
    if (text === '') {
      setStatus('Unrequested');
      return populatePokemon();
    }
    setStatus('Loading');
    
    hasRunningFetch = true;
    fetch(`${API_ROOT}/api/pokemon/search/${text}`)
      .then((res) => {
        res.json()
          .then(({ pokemon }) => populatePokemon(pokemon));
          // TODO: catch when something not working
      });
  }

  const fetchPokemonHandler = debounce(fetchPokemon);

  function populatePokemon (pokemons) {
    if (!pokemons) {
      pokemonListEl.innerHTML = '';
      return;
    }
    setStatus('Fetched results');
    for (const pokemon of pokemons) {
      const li = document.createElement('li');
      li.innerHTML = pokemon.name;
      pokemonListEl.appendChild(li);
    }
  }
  
  // bind to the input tag
  searchbox
    .addEventListener('input', (evt) => {
      fetchPokemonHandler(evt.target.value);
    });

})();