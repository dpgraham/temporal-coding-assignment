(function () {
  const API_ROOT = 'https://meowing-bristle-alamosaurus.glitch.me';

  const urlParams = new URLSearchParams(window.location.search);
  const chaos = urlParams.get('chaos');
  const flakey = urlParams.get('flakey');
  const id = urlParams.get('id');
  const statsTable = document.getElementById('stats');
  const loadingEl = document.getElementById('status');
  const nameEl = document.getElementById('pokemon');

  // fill the table 
  function populateStats (stats) {
    loadingEl.parentElement.removeChild(loadingEl);
    nameEl.style.display = '';
    nameEl.innerHTML = stats.name;
    for (let [name, value] of Object.entries(stats)) {
      let tr = document.createElement('tr');
      if (Array.isArray(value)) {
        value = value.join(', ');
      }
      tr.innerHTML = `<td>${name}</td><td>${value}</td>`;
      statsTable.appendChild(tr);
    }
  }

  function fetchPokemon(retries=3) {
    let url = `${API_ROOT}/api/pokemon/${id}?`;
    if (chaos) url += 'chaos=true&';
    if (flakey && retries > 2) url += 'flakiness=1&'

  NS.get(`/api/pokemon/${id}`, {
    onSuccess(stats) {
      populateStats(stats);
    },
    onError(status) {
      if (status === 404) {
        loadingEl.innerHTML = 'Could not find this Pokemon';
      }
      if (retries > 0) {
        fetchPokemon(retries - 1);
      } else {
          loadingEl.innerHTML = 'An error occurred. Failed to fetch Pokemon';
      }
      return;
    },
    queryParams: {
      chaos: !!chaos && 'true',
    },
  });
  }
  
  fetchPokemon();
})();