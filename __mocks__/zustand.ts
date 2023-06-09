const actualZustand = jest.requireActual('zustand');

const actualCreate = actualZustand.create;

const stores = new Set<Function>();

const create: typeof actualCreate = createState => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  stores.add(() => store.setState(initialState, true));

  return store;
};

// eslint-disable-next-line no-undef
afterEach(() => {
  stores.forEach(resetFn => resetFn());
});

const { createStore, useStore } = actualZustand;

export { create, createStore, useStore };
