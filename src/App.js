// import './App.css';

import { ToastContainer } from 'react-toastify';
import { AllRoutes } from './routes';
import { initializeFirebase } from './firebase.config';
import 'react-toastify/dist/ReactToastify.css';

initializeFirebase();
function App() {
  return (
    <>
      {' '}
      <ToastContainer /> <AllRoutes />
    </>
  );
}

export default App;
