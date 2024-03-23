export function getMaxTime(choosenServices, serviceList) {
  let maxTime = { count: [], units: '' };

  for (const service of serviceList) {
    if (choosenServices.includes(service.slug)) {
      const time = service.time;
      if (typeof time === 'string') return time;

      if (!maxTime.units) {
        maxTime = time;
      } else {
        const maxTimeInMinutes =
          maxTime.units === 'minutes'
            ? maxTime.count[0]
            : maxTime.units === 'hours'
            ? maxTime.count[0] * 60
            : maxTime.count[0] * 60 * 24;
        const timeInMinutes =
          time.units === 'minutes'
            ? time.count[0]
            : time.units === 'hours'
            ? time.count[0] * 60
            : time.count[0] * 60 * 24;

        if (timeInMinutes > maxTimeInMinutes) {
          maxTime = time;
        }
      }
    }
  }

  return '~ ' + maxTime.count.join('-') + ' ' + maxTime.units;
}
