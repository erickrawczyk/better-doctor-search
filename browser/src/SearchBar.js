import React, { Component } from 'react';
import { RaisedButton, AutoComplete } from 'material-ui';

class SearchBar extends Component {
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

  handleUpdateInput(value) {
    // return if there's no value
    if (!value) return;

    // fetch doctors
    fetch('/api/doctors?limit=5&q=' + value)
      .then(res => res.json())
      .then(res => {
        const names = res.map(doctor => `${doctor.profile.first_name} ${doctor.profile.last_name}`);
        this.setState({ dataSource: names });
      })
      .catch(err => {
        console.error('Error Searching for Doctors:', err);
      })
  }

  search() {
    this.props.submitRequest(this.refs.autocomplete.state.searchText)
  }

  render() {
    return (
      <div className="search-bar">
        <div style={this.searchBarStyle}>
          <AutoComplete
            hintText="Find a Doctor"
            dataSource={this.state.dataSource}
            onUpdateInput={(val) => this.handleUpdateInput(val)}
            onNewRequest={(val) => this.props.submitRequest(val)}
            ref="autocomplete"
            floatingLabelText="Find a Doctor"
            filter={AutoComplete.fuzzyFilter}
            maxSearchResults={5}
            fullWidth={true}
          />
        </div>
        <div style={this.buttonRowStyle}>
          <RaisedButton
            label="Search"
            primary={true}
            style={this.buttonStyle}
            onClick={() => this.search()}
          />
        </div>
      </div>
    );
  }

}

export default SearchBar;