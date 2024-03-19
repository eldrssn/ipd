import { content } from './content.js';

export function createTitles() {
  const titles = content.map((el) => el.title);
  const services = document.querySelector('.services');
  const fragment = document.createDocumentFragment();

  titles.forEach((title) => {
    const p = document.createElement('p');
    p.textContent = title;
    p.classList.add('service');
    fragment.appendChild(p);
  });

  services.appendChild(fragment);
}
