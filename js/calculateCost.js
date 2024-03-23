import { servicesData } from './data/services';
import { renderServiceList } from './renderServiceList';
import { getMaxTime } from './utils/getMaxTime';
import { calculateTotalPrice } from './utils/calculateTotalPrice';
import { vehicleTypes } from './constants';
import { preloadedVehicleTypeseImgs } from './preload';
import { moveResult } from './animation/moveResult';

const vehicleTypeImgWrapper = document.querySelector('.type-img');
const vehicleTypeRadios = document.querySelectorAll(
  'input[name="vehicle-type"]'
);
const customSelect = document.querySelector('.custom-select');
const selectBtn = document.querySelector('.select-button');
const selectedValue = customSelect.querySelector('.selected-value');
const optionsList = customSelect.querySelectorAll('.select-dropdown li');
const form = document.querySelector('.calculator-inputs-body');
const price = document.querySelector('#price');
const time = document.querySelector('#time');

let selectedVehicleType = vehicleTypes[0];
let serviceList = servicesData[selectedVehicleType];

const resetResult = () => {
  price.textContent = 'Choose services';
  time.textContent = 'Choose services';
};

export const calculateCost = () => {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const choosenServices = formData.getAll('services');

    if (choosenServices.length === 0) return;

    const totalPrice = calculateTotalPrice(choosenServices, serviceList);
    const maxTime = getMaxTime(choosenServices, serviceList);

    const setResults = () => {
      price.textContent =
        totalPrice === 0 ? 'Choose services' : '~AED ' + totalPrice;
      time.textContent = maxTime ? maxTime : 'Choose services';
    };

    moveResult(time);
    moveResult(price);
    setTimeout(setResults, 300);
    clearTimeout(setResults);
  });

  renderServiceList(serviceList);

  selectBtn.addEventListener('click', () => {
    customSelect.classList.toggle('active');
    selectBtn.setAttribute(
      'aria-expanded',
      selectBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });

  optionsList.forEach((option) => {
    function handler(e) {
      if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {
        optionsList.forEach((el) =>
          el.querySelector('input').removeAttribute('checked')
        );

        this.children[0].setAttribute('checked', true);
        const node = this.children[1].querySelector('p').cloneNode(true);
        selectedValue.innerHTML = '';
        selectedValue.appendChild(node);
        customSelect.classList.remove('active');

        vehicleTypeRadios.forEach((radio) => {
          if (radio.checked) {
            selectedVehicleType = radio.id;
          }
        });

        if (selectedVehicleType !== 'undefined') {
          serviceList = servicesData[selectedVehicleType];
          renderServiceList(serviceList);
          resetResult();

          const setVehicle = () => {
            vehicleTypeImgWrapper.innerHTML = '';
            vehicleTypeImgWrapper.append(
              preloadedVehicleTypeseImgs[selectedVehicleType]
            );
          };

          moveResult(vehicleTypeImgWrapper);
          setTimeout(setVehicle, 300);
          clearTimeout(setVehicle);
        }
      }
    }

    option.addEventListener('click', handler);
  });
};
