import React, { createContext, useContext, useState } from "react";

// creating a context
const StoreContext = createContext(null);

const TextInput = ({ value }) => {
  const [store, setStore] = useContext(StoreContext);
  return (
    <div className="field">
      {value}: {" "}
      <input
        value={store[value]}
        onChange={e => setStore({...store, [value]: e.target.value})}
      />
    </div>
  );
};

const Display = ({ value }) => {
  const [store] = useContext(StoreContext);
  return (
    <div className="value">
      {value}: {store[value]}
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
  const store = useState({ first: "", last: "" });
  return (
    <div className="container">
      <h5>App</h5>
      {/* Context provider */}
      <StoreContext.Provider value={store}>
        <div className="container">
          <h5>ContentContainer</h5>
          <FormContainer />
          <DisplayContainer />
        </div>
      </StoreContext.Provider>
    </div>
  );
}
