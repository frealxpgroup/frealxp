import React, { Component } from 'react';
import './reset.css'
import './App.css';
import routes from './routes';
import store from './ducks/store'
import {Provider} from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <header className="App-header">
          {routes}
        </header>
      </div>
      </Provider>
    );
  }
}

export default App;
