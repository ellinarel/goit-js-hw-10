import fetchCountries from './fetchCountries';
import './css/styles.css';

const refs = {
inputEl : document.querySelector(`#search-box`),
countryList : document.querySelector(`.country-list`),
countryList : document.querySelector(`.country-info`),
}

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener(`input`, onInput) 
function onInput(e){
    e.preventDefault()
    const name = refs.inputEl.value.trim();
}





    