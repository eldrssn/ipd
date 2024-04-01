import { throttle } from './utils/throttle.js';
import { content } from './data/content.js';
import { createTitles } from './createTitles.js';
import { setSponsors } from './animation/setSponsors.js';
import { horizontalLoop } from './utils/horizontalLoop.js';
import { moveCar } from './animation/moveCar.js';
import { moveTitle } from './animation/moveTitle.js';
import { calculateCost } from './calculateCost.js';
import { preload, preloadedCarImgs } from './preload.js';
import { showCalculator } from './animation/showCalculator.js';
import { hideCalculator } from './animation/hideCalculator.js';
import { dependencies } from './constants.js';
import { setDependencies } from './utils/setDependencies.js';
import { moveInfo } from './animation/moveInfo.js';

window.addEventListener('load', () => {
  preload();

  createTitles();

  const serviceText = document.querySelector('#service-text');
  const car = document.querySelector('.car');
  const carWrapper = document.querySelector('.car-wrapper');
  const sponsorList = document.querySelector('.sponsor-list');
  const buttonCost = document.querySelector('.button');
  const calculator = document.querySelector('.calculation-section');
  const closeButton = document.querySelector('.close-button');

  const boxes = gsap.utils.toArray('.service');

  let activeElement;

  const loop = horizontalLoop(boxes, {
    duration: 1.5,
    paused: true,
    draggable: true,
    center: true,
    onThrowingComplete: (tl) => {
      moveCar(tl);
      setService(tl.current());
      moveInfo();
    },
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
      car.innerHTML = '';
      car.appendChild(preloadedCarImgs[curIndex]);
      setSponsors(sponsorList, content[curIndex].sponsors);
    }, 300);
  }

  setService(loop.current());

  boxes.forEach((box, i) => {
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
    );
  });

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

  carWrapper.addEventListener(
    'wheel',
    throttle((event) => {
      if (event.deltaX !== 0) {
        if (event.deltaX > 0) {
          loop.next({ duration: 0.4, ease: 'power1.inOut' });
          setService(loop.current());
          moveCar(loop);
          moveTitle(loop);
        } else {
          loop.previous({ duration: 0.4, ease: 'power1.inOut' });
          setService(loop.current());
          moveCar(loop);
          moveTitle(loop);
        }
      }
    })
  );

  let touchStartX = 0;
  let touchEndX = 0;

  carWrapper.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  carWrapper.addEventListener(
    'touchend',
    (event) => {
      touchEndX = event.changedTouches[0].clientX;

      const swipeThreshold = 20;

      if (touchEndX - touchStartX > swipeThreshold) {
        loop.previous({ duration: 0.4, ease: 'power1.inOut' });
        setService(loop.current());
        moveCar(loop);
        moveTitle(loop);
      } else if (touchStartX - touchEndX > swipeThreshold) {
        loop.next({ duration: 0.4, ease: 'power1.inOut' });
        setService(loop.current());
        moveCar(loop);
        moveTitle(loop);
      }
    },
    { passive: true }
  );

  const resetServices = () => {
    const inputs = document.querySelectorAll('input[name="services"]');
    inputs.forEach((el) => el.removeAttribute('checked'));
  };

  const closeCalculator = (event) => {
    hideCalculator();
    gsap.to(calculator, {
      duration: 0.9,
      onComplete: () => {
        calculator.style.overflow = 'hidden';
        calculator.style.display = 'none';
      },
    });

    resetServices();
    closeButton.removeEventListener('click', closeCalculator);
  };

  calculator.addEventListener('click', (event) => {
    if (event.target === calculator) {
      closeCalculator();
    }
  });

  const setDefaultService = (id) => {
    const input = document.querySelector(`input[id="${id}"]`);
    input.setAttribute('checked', 'true');

    const box = calculator.querySelector('.calculator-services');
    const dependenciesList = dependencies[input.getAttribute('id')];
    dependenciesList && setDependencies(input, box, dependenciesList);
  };

  buttonCost.addEventListener('click', () => {
    showCalculator();

    gsap.to(calculator, {
      duration: 0,
      onComplete: () => {
        calculator.style.display = 'block';
        setDefaultService(activeElement.getAttribute('data-id'));
      },
    });

    closeButton.addEventListener('click', closeCalculator);
  });

  calculateCost();
});
