import React, { Component } from 'react';
import './reset.css'
import './App.css';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {routes}
        </header>
      </div>
    );
  }
}

export default App;
