import { throttle } from './utils.js';
import { content } from './content.js';
import { createTitles } from './createTitles.js';
import { setSponsors } from './setSponsors.js';
import { horizontalLoop } from './horizontalLoop.js';
import { moveCar } from './moveCar.js';
import { moveTitle } from './moveTitle.js';

createTitles();

const preloadedImages = document.querySelector('#preloadedImages');

const carImgsHref = content.map((el) => el.carImg);
const preloadedCarImgs = [];

carImgsHref.forEach((el) => {
  const img = new Image();
  img.src = el;
  img.alt = 'Current Car';
  preloadedCarImgs.push(img);
  preloadedImages.append(img);
});

const sponsorNames = [
  ...new Set(content.map((el) => el.sponsors).flat()).keys(),
];

const preloadedSponsorsImgs = sponsorNames.reduce((accum, next) => {
  const img = document.createElement('img');
  img.alt = next;
  img.src = `assets/images/${next}.png`;
  preloadedImages.append(img);
  accum[next] = img;
  return accum;
}, {});

const serviceText = document.querySelector('#service-text');
const carWrapper = document.querySelector('.car-wrapper');
const sponsorList = document.querySelector('.sponsor-list');

const boxes = gsap.utils.toArray('.service');

let activeElement;

const loop = horizontalLoop(boxes, {
  duration: 1.5,
  paused: true,
  draggable: false,
  center: true,
  onChange: (element, index) => {
    activeElement && activeElement.classList.remove('active');
    element.classList.add('active');
    activeElement = element;
    const length = boxes.length;

    const incrementIndex = (num) =>
      index - num < 0 ? length + index - num : index - num;

    const decrementIndex = (num) => {
      if (index + num === length + 1) return index + num - length;
      return index + num >= length ? length - index - num : index + num;
    };

    boxes.forEach((box, i) => {
      i === incrementIndex(1) || i === decrementIndex(1)
        ? box.classList.add('secondary')
        : box.classList.remove('secondary');

      i === incrementIndex(2) || i === decrementIndex(2)
        ? box.classList.add('thirty')
        : box.classList.remove('thirty');
    });
  },
});

function setService(curIndex) {
  serviceText.textContent = content[curIndex].text;
  setTimeout(() => {
    carWrapper.innerHTML = '';
    carWrapper.appendChild(preloadedCarImgs[curIndex]);
    setSponsors(sponsorList, preloadedSponsorsImgs, content[curIndex].sponsors);
  }, 300);
}

setService(loop.current());

boxes.forEach((box, i) =>
  box.addEventListener(
    'click',
    throttle(() => {
      if (i !== loop.current()) {
        loop.toIndex(i, { duration: 0.8, ease: 'power1.inOut' });
        moveCar(loop);
        setService(loop.current());
        moveTitle(loop);
      }
    })
  )
);

document.addEventListener(
  'keydown',
  throttle((event) => {
    if (event.key === 'ArrowRight') {
      loop.next({ duration: 0.4, ease: 'power1.inOut' });
      setService(loop.current());
      moveCar(loop);
      moveTitle(loop);
    }

    if (event.key === 'ArrowLeft') {
      loop.previous({ duration: 0.4, ease: 'power1.inOut' });
      setService(loop.current());
      moveCar(loop);
      moveTitle(loop);
    }
  })
);
