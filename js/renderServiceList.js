import { dependencies } from './constants.js';
import { setDependencies } from './utils/setDependencies.js';

const serviceBox = document.querySelector('.calculator-services');

export const renderServiceList = (services) => {
  serviceBox.innerHTML = '';

  const fragment = document.createDocumentFragment();

  services.forEach((el) => {
    const label = document.createElement('label');
    label.textContent = el.service;
    label.classList.add('checkbox-wrapper');
    label.setAttribute('for', el.slug);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', el.slug);
    input.setAttribute('value', el.slug);
    input.setAttribute('name', 'services');

    if (!el.price) {
      input.setAttribute('disabled', 'true');
    }
    label.appendChild(input);

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    label.appendChild(checkmark);

    fragment.appendChild(label);

    const dependenciesList = dependencies[el.slug];

    input.addEventListener('click', () => {
      input.hasAttribute('checked')
        ? input.removeAttribute('checked')
        : input.setAttribute('checked', 'true');
      dependenciesList && setDependencies(input, serviceBox, dependenciesList);
    });
  });

  serviceBox.appendChild(fragment);
};
