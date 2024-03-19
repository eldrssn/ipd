export function setSponsors(node, list) {
  node.innerHTML = '';
  const fragment = document.createDocumentFragment();

  list.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('sponsor');
    const img = document.createElement('img');

    img.src = `/public/images/${el}.png`;

    li.appendChild(img);
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
