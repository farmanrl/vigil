import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

class Filters extends Component {
  static propTypes = {
    changeFilter: PropTypes.func,
    filter: PropTypes.string,
  }

  handleSelect = (eventKey) => {
    this.props.changeFilter(eventKey);
  }

  render() {
    return (
      <Nav
        bsStyle="pills"
        justified
        onSelect={this.handleSelect}
        activeKey={this.props.filter}
      >
        <NavItem eventKey="Day">
          Day
        </NavItem>
        <NavItem eventKey="Week">
          Week
        </NavItem>
        <NavItem eventKey="Month">
          Month
        </NavItem>
        <NavItem eventKey="Year">
          Year
        </NavItem>
        <NavItem eventKey="All">
          All
        </NavItem>
      </Nav>
    );
  }
}

export default Filters;
