export function moveCar(loop) {
  const car = gsap
    .timeline({ yoyo: true })
    .to('.car', {
      opacity: 0,
      x: loop.direction() === 'right' ? '50%' : '-50%',
      y: loop.direction() === 'right' ? '-90%' : '90%',
      duration: 0.4,
      ease: 'power1.inOut',
    })
    .to(
      '.car-shadow',
      {
        opacity: 0,
      },
      '<'
    )
    .to('.car', {
      x: loop.direction() === 'right' ? '-50%' : '50%',
      y: loop.direction() === 'right' ? '90%' : '-90%',
      duration: 0,
    })
    .to('.car', {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.4,
    })
    .to(
      '.car-shadow',
      {
        opacity: 0.7,
        duration: 0.4,
      },
      '>'
    );
  return car;
}
