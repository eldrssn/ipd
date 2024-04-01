import { moveInfo } from './moveInfo.js';

export function moveTitle(loop) {
  if (loop.isActive()) {
    return;
  }

  gsap
    .timeline({ repeat: 1, yoyo: true, ease: 'power1.inOut' })
    .fromTo(
      '.left',
      {
        left: '10px',
        duration: 0.4,
      },
      {
        left: '-10px',
        duration: 0.4,
      }
    )
    .fromTo(
      '.right',
      {
        right: '10px',
        duration: 0.4,
      },
      {
        right: '-10px',
        duration: 0.4,
      },
      '<'
    );

  moveInfo();
}
