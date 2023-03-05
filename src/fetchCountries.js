
const COUNTRIES_LIST = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(countries) {
  return fetch(`${COUNTRIES_LIST}${countries}?${fields}`)
    .then(r => r.json())
    .catch(error => console.log(error));
}