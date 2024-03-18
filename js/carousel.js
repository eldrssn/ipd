import { throttle } from './utils.js';

const boxes = gsap.utils.toArray('.service');

let activeElement;

const loop = horizontalLoop(boxes, {
  duration: 1.5,
  paused: true,
  draggable: false,
  center: true,
  onChange: (element, index) => {
    activeElement && activeElement.classList.remove('active');
    element.classList.add('active');
    activeElement = element;
    const length = boxes.length;

    const incrementIndex = (num) =>
      index - num < 0 ? length + index - num : index - num;

    const decrementIndex = (num) => {
      if (index + num === length + 1) return index + num - length;
      return index + num >= length ? length - index - num : index + num;
    };

    boxes.forEach((box, i) => {
      i === incrementIndex(1) || i === decrementIndex(1)
        ? box.classList.add('secondary')
        : box.classList.remove('secondary');

      i === incrementIndex(2) || i === decrementIndex(2)
        ? box.classList.add('thirty')
        : box.classList.remove('thirty');
    });
  },
});

function timeline() {
  if (loop.isActive()) {
    return;
  }

  const arrows = gsap
    .timeline({ repeat: 1, yoyo: true, ease: 'power1.inOut' })
    .fromTo(
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

  const text = gsap
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
    )
    .from(
      '.brand',
      {
        stagger: 0.1,
        opacity: 0,
        y: 10,
        delay: 0.2,
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

boxes.forEach((box, i) =>
  box.addEventListener(
    'click',
    throttle(() => {
      if (i !== loop.current()) {
        loop.toIndex(i, { duration: 0.8, ease: 'power1.inOut' });
        timeline();
      }
    })
  )
);

document.addEventListener(
  'keydown',
  throttle((event) => {
    if (event.key === 'ArrowRight') {
      loop.next({ duration: 0.4, ease: 'power1.inOut' });
      timeline();
    }

    if (event.key === 'ArrowLeft') {
      loop.previous({ duration: 0.4, ease: 'power1.inOut' });
      timeline();
    }
  })
);

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let onChange = config.onChange,
    lastIndex = 0,
    tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        function () {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        },
      paused: config.paused,
      defaults: { ease: 'none' },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    spaceBefore = [],
    xPercents = [],
    curIndex = 0,
    indexIsDirty = false,
    center = config.center,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    timeOffset = 0,
    container =
      center === true
        ? items[0].parentNode
        : gsap.utils.toArray(center)[0] || items[0].parentNode,
    totalWidth,
    getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], 'scaleX') +
      (parseFloat(config.paddingRight) || 0),
    populateWidths = () => {
      let b1 = container.getBoundingClientRect(),
        b2;
      items.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i]) * 100 +
            gsap.getProperty(el, 'xPercent')
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, {
        xPercent: (i) => xPercents[i],
      });
      totalWidth = getTotalWidth();
    },
    timeWrap,
    populateOffsets = () => {
      timeOffset = center
        ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
        : 0;
      center &&
        times.forEach((t, i) => {
          times[i] = timeWrap(
            tl.labels['label' + i] +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset
          );
        });
    },
    getClosest = (values, value, wrap) => {
      let i = values.length,
        closest = 1e10,
        index = 0,
        d;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) {
          d = wrap - d;
        }
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    },
    populateTimeline = () => {
      let i, item, curX, distanceToStart, distanceToLoop;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add('label' + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    },
    refresh = (deep) => {
      let progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      deep && populateTimeline();
      populateOffsets();
      deep && tl.draggable
        ? tl.time(times[curIndex], true)
        : tl.progress(progress, true);
    },
    proxy;
  gsap.set(items, { x: 0 });
  populateWidths();
  populateTimeline();
  populateOffsets();
  window.addEventListener('resize', () => refresh(true));
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex && index !== curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    if (time < 0 || time > tl.duration()) {
      vars.modifiers = { time: timeWrap };
    }
    curIndex = newIndex;
    vars.overwrite = true;
    gsap.killTweensOf(proxy);
    return vars.duration === 0
      ? tl.time(timeWrap(time))
      : tl.tweenTo(time, vars);
  }
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.closestIndex = (setCurrent) => {
    let index = getClosest(times, tl.time(), tl.duration());
    if (setCurrent) {
      curIndex = index;
      indexIsDirty = false;
    }
    return index;
  };
  tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
  tl.next = (vars) => toIndex(tl.current() + 1, vars);
  tl.previous = (vars) => toIndex(tl.current() - 1, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  tl.closestIndex(true);
  lastIndex = curIndex;
  onChange && onChange(items[curIndex], curIndex);
  return tl;
}
