(function () {

  const searchbox = document.getElementById('pokemon-finder');
  const pokemonListEl = document.getElementById('pokemons');
  const statusEl = document.getElementById('status');
  const loadingNextPageEl = document.getElementById('loading-next-page');
  const API_ROOT = 'https://meowing-bristle-alamosaurus.glitch.me';

  const urlParams = new URLSearchParams(window.location.search);
  const chaos = urlParams.get('chaos');
  const flakey = urlParams.get('flakey');

  // !COPY PASTED FROM https://www.freecodecamp.org/news/javascript-debounce-example/
  // helper function to debounce searches by 300ms
  function debounce(func, timeout = 300){
    let timer;
    const fn = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
    return fn;
  }

  function setStatus (status) {
    statusEl.innerHTML = status;
  }

  // keeps track of what the user's most recent search term was
  // so if we return results from a different search, ignore it
  let mostRecentSearch = null;

  // fetches a list of pokemon that match text and then renders them in HTML
  function fetchPokemon (text, retries=3) {
    mostRecentSearch = text;
    if (text === '') {
      setStatus('Unrequested');
      setIsLoadingNextPage(false);
      return populatePokemon();
    }
    setIsLoadingNextPage(false);
    setStatus('Loading');
    pokemonListEl.innerHTML = '';
    
    
    let searchUrl = `/api/pokemon/search/${text}?`;
    hasRunningFetch = true;
    NS.get(searchUrl, {
      queryParams: {
        chaos: !!chaos + '',
      },
      onSuccess: ({ pokemon, nextPage }) => {
        if (mostRecentSearch !== text) return;
        populatePokemon(pokemon);
        if (nextPage) {
          fetchNextPage(text, nextPage);
        }
      },
      onError: (code) => {
        if (code === 404) {
          setStatus('Empty Results');
        }
      },
      retries,
    });
  }

  // get the next page of Pokemon
  // TODO: make this and fetchPokemon less repetitive
  function fetchNextPage (text, page, retries=3) {
    setIsLoadingNextPage(true);
    let searchUrl = `/api/pokemon/search/${text}`;
    NS.get(searchUrl, {
      onSuccess({ pokemon, nextPage }) {
        if (mostRecentSearch !== text) return;
        populatePokemon(pokemon);
        if (nextPage) {
          fetchNextPage(text, nextPage);
        } else {
          setIsLoadingNextPage(false);
        }
      },
      onError(status) {
        if (mostRecentSearch !== text) return;
        if (status === 500 && retries > 0) {
          fetchNextPage(text, page, retries - 1);
        }
      },
      retries,
      queryParams: {
        chaos: !!chaos + '',
      },
    });
  }

  // set an indicator showing if the next page of results is loading
  function setIsLoadingNextPage (isLoading) {
    loadingNextPageEl.innerHTML = isLoading ? 'Next page is loading...' : '';
  }

  // debounce the searches so that there isn't a search on every single keystroke
  const fetchPokemonHandler = debounce(fetchPokemon);

  // add a list of pokemons to the HTML
  function populatePokemon (pokemons) {
    if (!pokemons) {
      pokemonListEl.innerHTML = '';
      return;
    }
    setStatus('Fetched results');
    for (const pokemon of pokemons) {
      const li = document.createElement('li');
      li.innerHTML = `<a href='pokemon.html?id=${pokemon.id}'>${pokemon.name}</a>`;
      pokemonListEl.appendChild(li);
    }
  }
  
  // call fetchPokemonHandler when user inputs text
  searchbox
    .addEventListener('input', (evt) => {
      fetchPokemonHandler(evt.target.value);
    });

})();