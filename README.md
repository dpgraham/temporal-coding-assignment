# TEMPORAL POKEMON TAKE HOME ASSIGNMENT

## INSTRUCTIONS
* Clone this repository
* Open your browser to index.html
* Set "chaos=true" in query params to use chaos API calls
* Set "flakey=true" in query params to make the API calls retry twice

## COMMENTS
* I chose Vanilla HTML to prove that I know how Javascript/HTML API's work and 
  so I can avoid the bloat and boilerplate of adding a framework
* No AI was used for this. I only did Google Searches, mostly reading MDN for refreshers on the API's

## MISSING PIECES
* It doesn't autosearch when you revisit the page and the search is already pre-populated
* When a fetch becomes "invalidated" (ie: user types a new search) it doesn't cancel the fetch
  it only ignores the result
* It uses "appendChild" to add results to HTML. Probably would be better if it added the entire element
  whole cloth.
