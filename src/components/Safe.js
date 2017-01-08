import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Button,
  Alert,
} from 'react-bootstrap';

const header = { background: '#337ab7', color: 'white' };

class Safe extends Component {
  static propTypes = {
    show: PropTypes.bool,
    limit: PropTypes.number,
    close: PropTypes.func,
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={header} closeButton>
          <Modal.Title>Mark Location as Safe</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
          <Button bsStyle="primary" onClick={() => this.props.submit('safe')}>Submit</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default Safe;
