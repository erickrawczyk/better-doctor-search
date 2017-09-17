import React, { Component } from 'react';
import './App.css';

import Search from './Search'

class App extends Component {
  constructor(props) {
    super(props);

    this.limitedWidth = {
      margin: '20% auto',
      maxWidth: '800px',
      padding: '10px'
    }

    this.centered = {
      margin: '0 auto',
      display: 'block'
    }
  }

  componentDidMount() {
    fetch('/api/doctors?q=george')
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  }

  render() {
    return (
      <div style={this.limitedWidth}>
        <img
          src="logo.png"
          alt="BetterDoctor"
          style={this.centered}
        />
        <Search style={this.centered}/>
      </div>
    );
  }

  handleUpdateInput() {
    console.log('yeep');
  }
}

export default App;
