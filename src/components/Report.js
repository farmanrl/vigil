import React, { Component, PropTypes } from 'react';
import {
  Modal,
  FormGroup,
  ControlLabel,
  Panel,
  Radio,
  Button,
  Alert,
  Tooltip,
  OverlayTrigger,
  Glyphicon,
} from 'react-bootstrap';
import firebase from 'firebase';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

addStyle(Panel, 'dark');

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: null,
      limit: null,
      valid: null,
      showModal: null,
      anon: firebase.auth().currentUser.isAnonymous
    };
  }

  limit = () => {
    if (this.state.report) {
      this.setState({ valid: true });
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`/users/${uid}`)
              .once('value').then((snapshot) => {
                if (snapshot.val()) {
                  const timestamp = snapshot.val().timestamp;
                  const time = Date.now() - timestamp;
                  console.log(time);
                  if (time > 600000) {
                    this.setState({ limit: 0 });
                    this.addNode();
                  } else {
                    const minutes = Math.floor((600000 - time) / 60000);
                    console.log(minutes);
                    this.setState({ limit: minutes });
                  }
                } else {
                  this.setState({ limit: 0 });
                  this.addNode();
                }
              });
    } else {
      this.setState({ valid: false });
    }
  }

  addNode = () => {
    const uid = firebase.auth().currentUser.uid;
    navigator.geolocation.getCurrentPosition((position) => {
      const id = firebase.database().ref().child('/nodes').push().key;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      const node = { lat, lng, timestamp };
      node.danger = this.state.report;
      const updates = {};
      updates[`/nodes/${id}`] = node;
      updates[`/users/${uid}`] = node;
      firebase.database().ref().update(updates)
              .then(() => this.getNodes());
      this.close();
    });
  }

  close = () => {
    this.setState({ report: null, showModal: false, valid: null, limit: null });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    const addNodeDisabledTip = (
      <Tooltip id="tooltip">You must login to report location</Tooltip>
    );
    const addNodeTip = (
      <Tooltip id="tooltip">Report location</Tooltip>
    );
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>

          <Modal.Header closeButton>
            <Modal.Title>Report Location</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Your location will be logged anonymously in our database.</p>
            <p>Your report will be displayed to other users on the map.</p>
            <p>This action cannot be undone, so use at your discretion.</p>
            <p>If you wish to continue, submit and stay safe!</p>

            <FormGroup>
              <ControlLabel>Report</ControlLabel>
              <Panel>
                <ControlLabel>Safe</ControlLabel>
                <br />
                <Radio
                  inline
                  checked={this.state.report === 'safe'}
                  onChange={() => this.setState({ report: 'safe' })}
                >
                  No danger
                </Radio>
                <hr />
                <ControlLabel>Danger</ControlLabel>
                <br />
                <Radio
                  inline
                  checked={this.state.report === 'low'}
                  onChange={() => this.setState({ report: 'low' })}
                >
                  Low
                </Radio>
                <Radio
                  inline
                  checked={this.state.report === 'medium'}
                  onChange={() => this.setState({ report: 'medium' })}
                >
                  Medium
                </Radio>
                <Radio
                  inline
                  checked={this.state.report === 'high'}
                  onChange={() => this.setState({ report: 'high' })}
                >
                  High
                </Radio>
              </Panel>
              <p>These options are placeholder and not final!</p>
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            {this.state.limit ?
              <Alert bsStyle="report">
                Please wait {this.state.limit} minutes before reporting again.
              </Alert>
             : null
            }
            {this.state.valid === false ?
              <Alert bsStyle="warning">
                You must select an option for your report!
              </Alert>
             : null
            }
            <Button onClick={this.close}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.limit}>Submit</Button>
          </Modal.Footer>

        </Modal>

        {!this.state.showModal && this.state.anon ?
          <OverlayTrigger placement="top" overlay={addNodeDisabledTip}>
            <button
              className="App-addNode-disabled"
              disabled={!this.state.anon}
            >
              <Glyphicon glyph="flag" />
            </button>
          </OverlayTrigger>
         : null
        }
        {!this.state.showModal && !this.state.anon ?
          <OverlayTrigger placement="top" overlay={addNodeTip}>
            <button
              className="App-addNode"
              onClick={this.open}
            >
              <Glyphicon glyph="flag" />
            </button>
          </OverlayTrigger>
          : null
         }
      </div>
    );
  }
}

export default Report;
