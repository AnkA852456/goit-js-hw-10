import './css/styles.css';
import { refs } from './js/refs';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onCountryChoice, DEBOUNCE_DELAY));

function onCountryChoice(evt) {
  const chosenCountry = evt.target.value.trim();
  fetchCountries(chosenCountry)
    .then(onCountryList)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function onCountryList(countries) {
  // const numberOfCountries = countries.length();

  const showTheList = countries
    .map(
      country => `<li><img src="${country.flags.svg}" alt="Flag of ${country}"><h1>${country.name.official}</h1>
  </li>`
    )
    .join('');
  refs.list.insertAdjacentHTML('beforeend', showTheList);
}
