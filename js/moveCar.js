export function moveCar(loop) {
  const car = gsap
    .timeline({ yoyo: true })
    .to('.car-wrapper', {
      opacity: 0,
      x: loop.direction() === 'right' ? '50%' : '-50%',
      duration: 0.5,
      ease: 'power1.inOut',
    })
    .to('.car-wrapper', {
      x: loop.direction() === 'right' ? '-50%' : '50%',
      duration: 0,
    })
    .to('.car-wrapper', {
      x: 0,
      opacity: 1,
      duration: 0.3,
    });
  return car;
}
