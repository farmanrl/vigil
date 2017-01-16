import React, { Component, PropTypes } from 'react';
import {
  Accordion,
  Panel,
} from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

addStyle(Panel, 'dark');

const reports = {
  position: 'absolute',
  maxWidth: 300,
  top: 130,
  left: 10,
  zIndex: 1000
};

class Reports extends Component {
  static propTypes = {
    filter: PropTypes.string,
    total: PropTypes.number,
    safe: PropTypes.number,
    danger: PropTypes.number,
  }

  render() {
    return (
      <Accordion
        defaultActiveKey="0"
        style={reports}
      >
        <Panel
          bsSize="sm"
          bsStyle="dark"
          header={<p>{this.props.filter} - {this.props.total} reports</p>}
        >
          <p>{this.props.safe} <strong>safe</strong></p>
          <p>{this.props.danger} <strong>danger</strong></p>
        </Panel>
      </Accordion>
    );
  }
}

export default Reports;
