import './App.css';
import Router from './router';
import Modal from '@components/Modal';
import NiceModal from '@src/lib';

function App() {
  return (
    <div className="App">
      <NiceModal.Provider>
        <Router />
        <Modal />
      </NiceModal.Provider>
    </div>
  );
}

export default App;
