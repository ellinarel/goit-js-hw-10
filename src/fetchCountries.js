
const COUNTRIES_LIST = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(countriesName) {
  return fetch(`${COUNTRIES_LIST}${countriesName}?${fields}`)
    .then(response => {
      if (!response.ok) {
        return Notiflix.Notify.warning('Oops, there is no country with that name.');
      }
    return response.json();
  });
}