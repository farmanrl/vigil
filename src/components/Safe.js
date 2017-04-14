import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Button,
  Alert,
} from 'react-bootstrap';

const header = { background: '#337ab7', color: 'white' };

class Safe extends Component {
  static propTypes = {
    address: PropTypes.string,
    show: PropTypes.bool,
    limit: PropTypes.number,
    close: PropTypes.func,
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={header} closeButton>
          <Modal.Title>{this.props.address}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Modal.Title>Report Location - Safe</Modal.Title>
          <hr />
          <p>Your report will be displayed anonymously to other users on the heatmap.</p>
          <p>You can change your report after 10 minutes.</p>
          <p>If you wish to continue, press submit!</p>
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
