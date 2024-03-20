export function moveCar(loop) {
  const car = gsap
    .timeline({ yoyo: true })
    .to('.car-wrapper', {
      opacity: 0,
      x: loop.direction() === 'right' ? '50%' : '-50%',
      y: loop.direction() === 'right' ? '-90%' : '90%',
      duration: 0.4,
      ease: 'power1.inOut',
    })
    .to('.car-wrapper', {
      x: loop.direction() === 'right' ? '-50%' : '50%',
      y: loop.direction() === 'right' ? '90%' : '-90%',
      duration: 0,
    })
    .to('.car-wrapper', {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.4,
    });
  return car;
}
