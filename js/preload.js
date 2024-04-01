import { vehicleTypes } from './constants.js';
import { content } from './data/content.js';

const preloadedImages = document.querySelector('#preloadedImages');
let preloadedVehicleTypeseImgs = {};
let preloadedSponsorsImgs;
const preloadedCarImgs = [];
const carImgsHrefs = content.map((el) => el.carImg);

const sponsorNames = [
  ...new Set(content.map((el) => el.sponsors).flat()).keys(),
];

export const preload = () => {
  carImgsHrefs.forEach((el) => {
    const img = new Image();
    img.src = el;
    img.alt = 'Current Car';
    preloadedCarImgs.push(img);
    preloadedImages.append(img);
  });

  preloadedSponsorsImgs = sponsorNames.reduce((accum, next) => {
    const img = document.createElement('img');
    img.alt = next;
    img.src = `assets/images/${next}.png`;
    preloadedImages.append(img);
    accum[next] = img;
    return accum;
  }, {});

  preloadedVehicleTypeseImgs = vehicleTypes.reduce((accum, next) => {
    const img = document.createElement('img');
    img.alt = 'Vehicle Type';
    img.src = `assets/images/${next}.png`;
    preloadedImages.append(img);
    accum[next] = img;
    return accum;
  }, {});
};

export { preloadedVehicleTypeseImgs, preloadedCarImgs, preloadedSponsorsImgs };
