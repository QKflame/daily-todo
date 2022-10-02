export function asyncThrottle(fn) {
  let locked = false;
  return async (...args) => {
    if (locked) {
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await fn.call(this, args);
      locked = false;
    } catch {
      locked = false;
    }
  };
}
