import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';
import App from './App';

class Root extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <App />
      </MuiThemeProvider>
    );
  }
}

export default Root;
