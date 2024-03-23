export const hideCalculator = () =>
  gsap
    .timeline()
    .to(
      '.calculator-wrapper',
      {
        opacity: 0,
        y: '-20%',
        duration: 0.6,
      },
      '<'
    )
    .to(
      '.calculation-section',
      {
        opacity: 0,
        duration: 0.9,
      },
      '<'
    );
