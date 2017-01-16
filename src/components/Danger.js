import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Button,
  Alert,
} from 'react-bootstrap';

class Danger extends Component {
  static propTypes = {
    address: PropTypes.string,
    show: PropTypes.bool,
    limit: PropTypes.number,
    close: PropTypes.func,
    submit: PropTypes.func
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={{background: '#d9534f', color: 'white'}} closeButton>
          <Modal.Title>{this.props.address}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Modal.Title>Mark Location as Danger</Modal.Title>
          <hr />
          <p>Your location will be logged anonymously in our database.</p>
          <p>Your report will be displayed to other users on the map.</p>
          <p>This action cannot be undone, so use at your discretion.</p>
          <p>If you wish to continue, submit and stay safe!</p>
        </Modal.Body>

        <Modal.Footer>
          {this.props.limit ?
            <Alert bsStyle="danger">
              Please wait {this.props.limit} minutes before reporting again.
            </Alert>
           : null
          }
          <Button onClick={this.props.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={() => this.props.submit('danger')}>Submit</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default Danger;
