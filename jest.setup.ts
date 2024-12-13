
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: Function) => fn,
}));