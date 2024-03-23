export const moveResult = (id) => {
  return gsap
    .timeline()
    .to(id, {
      duration: 0.3,
      opacity: 0,
      y: 5,
      zIndex: 2,
    })
    .to(id, {
      duration: 0,
      y: -5,
      zIndex: 2,
    })
    .to(id, {
      duration: 0.3,
      opacity: 1,
      y: 0,
      zIndex: 2,
    });
};
