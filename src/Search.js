import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import SearchBar from 'material-ui-search-bar';
// import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
    this.searchBarStyle = {
      width: 'calc(100% - 100px)',
      display: 'inline-block'
    }
    this.buttonRowStyle = {
      display: 'inline-block',
      width: '100px'
    }
    this.buttonStyle = {
      margin: '12px'
    }
  }

  render() {
    return (
      <div className="search-bar">
        <div style={this.searchBarStyle}>
          <SearchBar
            dataSource={this.state.dataSource}
            onChange={(value) => this.setState({ dataSource: [value, value + value, value + value + value] })}
            onRequestSearch={() => console.log('onRequestSearch')}
            hintText="Find a Doctor"
          />
        </div>
        <div style={this.buttonRowStyle}>
          <RaisedButton
            label="Search"
            primary={true}
            style={this.buttonStyle}
          />
        </div>
      </div>
    );
  }

}

export default Search;
