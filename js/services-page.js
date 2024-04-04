window.addEventListener('load', () => {
  const serviceItems = document.querySelectorAll('.service-item');
  const wrapper = document.querySelector('.service-body-wrapper');

  const setItem = (id) => {
    const template = document.getElementById(`${id}-text`);
    const templateClone = template.content.cloneNode(true);
    // console.log(id);

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
        onStart: () => {
          wrapper.appendChild(templateClone);
        },
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
    item.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('service-item') ||
        event.target.tagName === 'LABEL'
      ) {
        serviceItems.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
        const dataId = item.getAttribute('data-id');
        setItem(dataId);
      }
    });
  });

  function setMobileList() {
    const selectBtn = document.querySelector('.select-button');
    const customSelect = document.querySelector('.custom-select');
    const selectedValue = customSelect.querySelector('.selected-value');
    const optionsList = customSelect.querySelectorAll('.select-dropdown li');

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
          const text = this.children[1].textContent;
          selectedValue.innerHTML = '';
          selectedValue.textContent = text;
          customSelect.classList.remove('active');
        }
      }
      option.addEventListener('click', handler);
    });
  }

  setMobileList();
});
