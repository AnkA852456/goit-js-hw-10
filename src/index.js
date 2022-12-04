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
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.list.innerHTML = '';
      refs.countryInfo.innerHTML = '';
    });
}

function onCountryList(countries) {
  const showTheList = countries
    .map(
      country => `<li class="item" ><img width="40" height="40"src="${country.flags.svg}" alt="Flag of ${country}"><h1 class="title">${country.name.official}</h1>
  </li>`
    )
    .join('');
  refs.list.insertAdjacentHTML('beforeend', showTheList);

  // const numberOfCountries = countries.length();

  // if (numberOfCountries === 1) {
  //   const singleCountry = countries
  //     .map(
  //       country => `<li class="item" ><img width="40" height="40"src="${country.flags.svg}" alt="Flag of ${country.name}"><h1 class="title">${country.name.official}</h1>
  //   <p>${country.capital}</p><p>${country.population}</p><p>${country.languages}</p></li>`
  //     )
  //     .join('');
  //   refs.countryInfo.insertAdjacentHTML('beforeend', singleCountry);
  //   return;
  // }

  // if (numberOfCountries > 10) {
  //   Notify.warning(
  //     'Too many matches found. Please enter a more specific name.'
  //   );
  // }

  // refs.countryInfo.innerHTML = '';
}
