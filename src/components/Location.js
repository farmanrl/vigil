import React, { Component, PropTypes } from 'react';
import {
  Modal,
  ControlLabel,
  ProgressBar,
  Badge,
} from 'react-bootstrap';
import Charts from './Charts';


class Location extends Component {
  static propTypes = {
    danger: PropTypes.object,
    safe: PropTypes.object,
    address: PropTypes.string,
    show: PropTypes.bool,
    close: PropTypes.func,
  }

  render() {
    const reports = this.props.safe.size + this.props.danger.size;
    const risk = this.props.danger.size / reports;
    let rating = null;
    if (risk <= 0.25) {
      rating = 'Low';
    } else if (risk <= 0.5) {
      rating = 'Moderate';
    } else if (risk <= 0.75) {
      rating = 'High';
    } else {
      rating = 'Extreme';
    }
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={{ background: '#5bc0de', color: 'white' }} closeButton>
          <Modal.Title>{this.props.address}</Modal.Title>
        </Modal.Header>

        {reports ?
         <Modal.Body>
           <Modal.Title>{rating} risk</Modal.Title>
           <hr />
           <ControlLabel>
             {this.props.filter} - Reports {' '}
             <Badge>{reports}</Badge>
           </ControlLabel>
           <ProgressBar>
             <ProgressBar
               now={this.props.safe.size}
               max={reports}
               label="safe"
               key={1}
             />
             <ProgressBar
               now={this.props.danger.size}
               max={reports}
               label="danger"
               bsStyle="danger"
               key={2}
             />
           </ProgressBar>
           <Charts safe={this.props.safe} danger={this.props.danger} />
         </Modal.Body>
         :
         <Modal.Body>
           <Modal.Title>No information for this location</Modal.Title>
         </Modal.Body>
        }

      </Modal>
    );
  }
}

export default Location;
