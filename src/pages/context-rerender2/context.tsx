import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';

const StoreContext = createContext(null);

interface InitState {
  [key: string]: any;
}

const useStoreData = (
  initState: InitState = {
    first: '',
    last: ''
  }
) => {
  const store = useRef(initState);
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

const useStore = (selector) => {
  const store = useContext(StoreContext);
  if (!store) {
    throw 'Error';
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );
  const dispatch = ({ type, payload }: { type: string; payload: any }) => {
    store.set({
      [type]: payload
    }); // 这里可以设置你需要的值
  };
  return [state, dispatch, store.set];
};

const TextInput = ({ value }) => {
  const [fieldValue, dispatch, setStore] = useStore((store) => store[value]);
  return (
    <div className="field">
      {value}:{' '}
      <input
        value={fieldValue}
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
