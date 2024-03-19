export function setSponsors(node, imgs, list) {
  node.innerHTML = '';
  const fragment = document.createDocumentFragment();

  list.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('sponsor');

    li.appendChild(imgs[el]);
    fragment.appendChild(li);
  });

  node.appendChild(fragment);

  gsap
    .timeline()
    .from(
      '.sponsor',
      {
        stagger: 0.1,
        opacity: 0,
        y: 10,
        delay: 0.4,
      },
      '<'
    )
    .from(
      '.info',
      {
        opacity: 0,
        duration: 0.8,
      },
      '<'
    );
}
