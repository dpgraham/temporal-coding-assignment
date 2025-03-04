(function () {

window.NS = window.NS || {};

const API_ROOT = 'https://meowing-bristle-alamosaurus.glitch.me';

const noop = function() {};

window.NS.get = function (url, { onSuccess=noop, onError=noop, retries=0, queryParams={} }) {
    const fullUrl = new URL(url, API_ROOT);
    for (const [key, val] of Object.entries(queryParams)) {
      fullUrl.searchParams.set(key, val);
    }
    fetch(fullUrl)
      .then((res) => {
         if (res.status >= 500 && retries > 0) {
            get(url, { onSuccess, onError, retries: retries - 1, queryParams});
            return;
        } else if (res.status > 400) {
            return onError(res.status);
        }
        res.json()
          .then(onSuccess)
        });
}

})();