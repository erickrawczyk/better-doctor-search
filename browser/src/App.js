import React, { Component } from 'react';

import SearchBar from './SearchBar'
import Doctor from './Doctor'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasResults: false,
      doctors: []
    }

    this.limitedWidthMiddle = {
      margin: '20% auto',
      maxWidth: '800px',
      padding: '10px',
    }

    this.limitedWidthTop = Object.assign({}, this.limitedWidthMiddle, { margin: '0 auto' });

    this.centered = {
      margin: '0 auto',
      display: 'block'
    }
  }

  submitRequest(value) {
    // return if there's no value
    if (!value) return;

    // fetch doctors
    fetch('/api/doctors?q=' + value)
      .then(res => res.json())
      .then(res => {
        this.setState(Object.assign({}, this.state, { hasResults: true, doctors: res }))
      })
      .catch(err => {
        console.error('Error Searching for Doctors:', err);
      })

  }

  render() {
    return (
      <div style={this.state.hasResults ? this.limitedWidthTop : this.limitedWidthMiddle}>
        <img
          src="wordmark.png"
          alt="BetterDoctor"
          width="275"
          style={this.centered}
        />
        <SearchBar submitRequest={(val) => this.submitRequest(val)} style={this.centered} />
        { this.state.doctors.map(doc => <Doctor doctor={doc} key={doc.uid} /> )}
      </div>
    );
  }

}

export default App;
