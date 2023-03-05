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

refs.inputEl.addEventListener(`input`,debounce(onInput,DEBOUNCE_DELAY)) 

function onInput(e) {
  e.preventDefault()
  const name = refs.inputEl.value.trim();
  if (name === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }
   
 fetchCountries(name)
       .then(countries => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';

      if (countries.length === 1) {
        refs.countryList.insertAdjacentHTML('beforestart',updateCountryList());
        refs.countryInfo.insertAdjacentHTML('beforestart',updateCountryInfo());
      } else if (countries.length >= 10) {
        Notiflix.Notify.info(
    `Too many matches found. Please enter a more specific name.`
  );
      } else {
        refs.countryList.insertAdjacentHTML('beforestart',updateCountryList());
      }
    })
        
   .catch(Notiflix.Notify.failure(`Oops, there is no country with that name`))
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


    