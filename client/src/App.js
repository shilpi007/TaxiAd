import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { store } from './store';
import AppRoute from './AppRoute';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {

  
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <AppRoute />
        </Provider>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </React.Fragment>
    );
  }
}

export default App;