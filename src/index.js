import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix'
import debounce from 'lodash.debounce';
import './css/styles.css';

const refs = {
inputEl : document.querySelector(`#search-box`),
countryList : document.querySelector(`.country-list`),
countryInfo : document.querySelector(`.country-info`),
}

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener(`input`,debounce(onInput, DEBOUNCE_DELAY)) 
function onInput(e) {
  e.preventDefault()
  const seacrhname = refs.inputEl.value.trim();
   clearMarkup()

  fetchCountries(seacrhname)
   .then(countries => {
      if (countries.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', updateCountryInfo(countries));
      } else if (countries.length >= 10) {
        Notiflix.Notify.info(
    `Too many matches found. Please enter a more specific name.`
  );
      } else {
        refs.countryList.insertAdjacentHTML('beforeend',updateCountryList(countries));
      }
   })
  .catch(()=> Notiflix.Notify.failure(`Oops, there is no country with that name`));
}
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}



function updateCountryList(countries) {
   const markup = countries
     .map(
      ({ flags, name }) => `
        <li>
            <div class="wrapper">
                <img
                    src="${flags.svg}"
                    alt="${name.common}"
                    class="image"
                     width="35px"
                      height="25px"
                />
                <span class="details-value">${name.common}</span>
            </div>
        </li>
    `
    )
     .join('');
  return markup
}

function updateCountryInfo(countries) {
   const markup = countries
    .map(({ capital, population, languages }) => {
      return `
      <ul>
          <li><p><b>Capital:</b> ${capital}</p></li>
          <li><p><b>Population:</b> ${population}</p></li>
          <li><p><b>Languages:</b> ${Object.values(languages)}</p></li>
      </ul>`;
    })
    .join('');
  return markup;
}


    