export function moveInfo() {
  return gsap
    .timeline({ yoyo: true })
    .from('.service-info', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power1.inOut',
    })
    .from(
      '.button-wrap',
      {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: 'power1.inOut',
      },
      '<'
    );
}
