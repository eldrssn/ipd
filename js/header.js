const menuOpenButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');
menuOpenButton.addEventListener('click', () => {
  menu.classList.add('visible');

  const menuCloseButton = menu.querySelector('.menu-close');
  const closeMenu = () => {
    menu.classList.remove('visible');
    menuCloseButton.removeEventListener('click', closeMenu);
  };

  menuCloseButton.addEventListener('click', closeMenu);
});
