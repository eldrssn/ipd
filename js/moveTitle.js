export function moveTitle(loop) {
  if (loop.isActive()) {
    return;
  }

  gsap.timeline({ repeat: 1, yoyo: true, ease: 'power1.inOut' }).fromTo(
    '.arrows',
    {
      left: '10px',
      right: '10px',
      duration: 0.4,
    },
    {
      left: '-10px',
      right: '-10px',
      duration: 0.4,
    }
  );

  gsap
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
