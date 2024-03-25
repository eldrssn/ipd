export const showCalculator = () =>
  gsap
    .timeline()
    .fromTo(
      '.calculation-section',
      {
        opacity: 0,
        overflow: 'hidden',
      },
      { opacity: 1, y: 0, overflow: 'hidden', duration: 0.9, overflow: 'auto' }
    )
    .fromTo(
      '.calculator-wrapper',
      {
        opacity: 0,
        y: '-20%',
      },
      { opacity: 1, y: 0, overflow: 'hidden', duration: 0.6 },
      '<'
    );
