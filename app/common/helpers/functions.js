
const EMPTY_COMPOSE = Symbol('EMPTY_COMPOSE');

export const compose =
  (...funcs) =>
  (...value) =>
  funcs.reduceRight((prev, func) => (prev === EMPTY_COMPOSE ?
    func(...value) :
    func(prev)
  ), EMPTY_COMPOSE);
