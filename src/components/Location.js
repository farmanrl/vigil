import React, { Component, PropTypes } from 'react';
import {
  Modal,
  ControlLabel,
  ProgressBar,
  Badge,
} from 'react-bootstrap';

class Location extends Component {
  static propTypes = {
    danger: PropTypes.number,
    safe: PropTypes.number,
    rating: PropTypes.string,
    reports: PropTypes.number,
    address: PropTypes.string,
    placeId: PropTypes.string,
    show: PropTypes.bool,
    close: PropTypes.func,
    getRating: PropTypes.func,
  }

  componentWillMount = () => {
    this.props.getRating(this.props.placeId);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header closeButton>
          <Modal.Title>{this.props.address}</Modal.Title>
        </Modal.Header>

        {this.props.reports ?
         <Modal.Body>
           <Modal.Title>{this.props.rating} risk</Modal.Title>
           <br />
           <ControlLabel>Reports <Badge>{this.props.reports}</Badge></ControlLabel>
           <ProgressBar>
             <ProgressBar
               now={this.props.safe}
               max={this.props.reports}
               label="safe"
               key={1}
             />
             <ProgressBar
               now={this.props.danger}
               max={this.props.reports}
               label="danger"
               bsStyle="danger"
               key={2}
             />
           </ProgressBar>
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
