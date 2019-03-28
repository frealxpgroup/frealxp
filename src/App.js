import React, { Component } from 'react';
import './reset.css'
import './App.css';
import routes from './routes';
import { store, persistor } from './ducks/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <header className="App-header">
              {routes}
            </header>
          </div>
        </PersistGate>
      </Provider >
    );
  }
}

export default App;
