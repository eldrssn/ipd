import { content } from './data/content.js';

export function createTitles() {
  const titles = content.map((el) => ({ title: el.title, id: el.slug }));
  const services = document.querySelector('.services');
  const fragment = document.createDocumentFragment();

  titles.forEach(({ title, id }) => {
    const p = document.createElement('p');
    p.textContent = title;
    p.classList.add('service');
    p.setAttribute('data-id', id);
    fragment.appendChild(p);
  });

  services.appendChild(fragment);
}
