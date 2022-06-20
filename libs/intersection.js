let listenerCallbacks = new WeakMap();

let observer;

function handleIntersections(entries) {
  entries.forEach((entry) => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      root: null,
      rootMargin: '100px',
      threshold: 0.9,
    });
  }

  return observer;
}

export default function watchIntersection(elem, callback) {
  let target = elem.current;

  if (!target) return;

  let observer = getIntersectionObserver();

  listenerCallbacks.set(target, callback);

  observer.observe(target);

  return () => {
    listenerCallbacks.delete(target);
    observer.unobserve(target);
  };
}