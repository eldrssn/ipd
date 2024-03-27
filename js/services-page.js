const serviceItems = document.querySelectorAll('.service-item');
const wrapper = document.querySelector('.service-body-wrapper');

const setItem = (id) => {
  const template = document.getElementById(id);
  const templateClone = template.content.cloneNode(true);

  gsap
    .timeline()
    .to(wrapper, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => (wrapper.innerHTML = ''),
    })
    .to(wrapper, {
      opacity: 1,
      duration: 0.3,
      onStart: () => wrapper.appendChild(templateClone),
    });
};

const setDefaultItem = () => {
  const defaultItem = serviceItems[0];
  defaultItem.classList.add('active');
  const defaultId = defaultItem.getAttribute('data-id');
  setItem(defaultId);
};
setDefaultItem();

serviceItems.forEach((item) => {
  item.addEventListener('click', () => {
    serviceItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');
    const dataId = item.getAttribute('data-id');
    setItem(dataId);
  });
});
