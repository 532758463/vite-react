import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';

const StoreContext = createContext(null);

const useStoreData = () => {
  const store = useRef({ first: '', last: '' });
  const get = useCallback(() => store.current, []);
  const subscribers = useRef(new Set());
  const set = useCallback((value) => {
    store.current = { ...store.current, ...value };
    return subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return { get, set, subscribe };
};

const useStore = (selector?: any) => {
  const store = useContext(StoreContext);
  if (!store) {
    throw 'Error';
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector ? selector(store.get()) : store.get()
  );
  return [state, store.set];
};

const TextInput = ({ value }) => {
  const [fieldValue, setStore] = useStore();
  return (
    <div className="field">
      {value}:{' '}
      <input
        value={fieldValue[value]}
        onChange={(e) => setStore({ [value]: e.target.value })}
      />
    </div>
  );
};

const Display = ({ value }) => {
  const [fieldValue] = useStore((store) => store[value]);
  return (
    <div className="value">
      {value}: {fieldValue}
    </div>
  );
};

const FormContainer = () => (
  <div className="container">
    <h5>FormContainer</h5>
    <TextInput value="first" />
    <TextInput value="last" />
  </div>
);

const DisplayContainer = () => (
  <div className="container">
    <h5>DisplayContainer</h5>
    <Display value="first" />
    <Display value="last" />
  </div>
);

export default function App() {
  return (
    <div className="container">
      <h5>App</h5>
      <StoreContext.Provider value={useStoreData()}>
        <div className="container">
          <h5>ContentContainer</h5>
          <FormContainer />
          <DisplayContainer />
        </div>
      </StoreContext.Provider>
    </div>
  );
}
