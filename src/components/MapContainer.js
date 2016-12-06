import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../redux/auth';
import { Nav, NavItem, Modal, Button, Glyphicon, OverlayTrigger, Tooltip, FormGroup, ControlLabel, Panel, Checkbox, Radio } from 'react-bootstrap';
import firebase from 'firebase';
import Map from './Map';
import './App.css';
import './MapContainer.css';

class MapContainer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      nodes: null,
      filter: 'all',
      start: 0,
      showModal: false,
      location: null,
      key: null,
      reasons: {
        behavior: null,
        environment: null,
      },
      danger: null,
    };
  }

  componentDidMount() {
    this.getNodes();
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude, lng: position.coords.longitude
      };
      this.setState({ location: coords });
    });
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude, lng: position.coords.longitude
      };
      this.setState({ location: coords, key: Date.now() });
    });
  }

  getNodes = () => {
    firebase.database().ref('nodes/')
            .once('value', (snapshot) => {
              const nodes = [];
              snapshot.forEach((data) => {
                if (data.val().timestamp > this.state.start) {
                  nodes.push(data.val());
                }
              });
              this.setState({ nodes, key: Date.now() });
            });
  }

  addNode = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const id = firebase.database().ref().child('/nodes').push().key;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      const node = { lat, lng, timestamp };
      if (this.state.reasons) {
        const reasons = [];
        if (this.state.reasons['environment'] === true) {
          reasons.push('environment');
        }
        if (this.state.reasons['behavior'] === true) {
          reasons.push('behavior');
        }
        node.reasons = reasons;
      }
      if (this.state.danger) {
        node.danger = this.state.danger;
      }
      const updates = {};
      updates[`/nodes/${id}`] = node;
      firebase.database().ref().update(updates)
              .then(() => this.getNodes());
    });
    this.close();
  }

  handleCheck = (key) => {
    const state = this.state.reasons;
    state[key] = !this.state.reasons[key];
    this.setState({ reasons: state });
  }

  close = () => {
    const reasons = this.state.reasons;
    reasons['environment'] = null;
    reasons['behavior'] = null;
    this.setState({ reasons, danger: null, showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleFilter = (key) => {
    const time = Date.now();
    switch (key) {
      case 'day': {
        const day = 86400000;
        this.setState({ filter: key, start: time - day }, this.getNodes());
        break;
      }
      case 'week': {
        const week = 604800000;
        this.setState({ filter: key, start: time - week }, this.getNodes());
        break;
      }
      case 'month': {
        const month = 2629746000;
        this.setState({ filter: key, start: time - month }, this.getNodes());
        break;
      }
      case 'year': {
        const year = 31536000000;
        this.setState({ filter: key, start: time - year }, this.getNodes());
        break;
      }
      case 'all':
        this.setState({ filter: key, start: 0 }, this.getNodes());
        break;
      default:
        this.setState({ filter: null, start: 0 }, this.getNodes());
    }
  }

  render() {
    const addNodeDisabledTip = (
      <Tooltip id="tooltip">You must login to report location</Tooltip>
    );
    const addNodeTip = (
      <Tooltip id="tooltip">Report location</Tooltip>
    );
    const getLocationTip = (
      <Tooltip id="tooltip">Get location</Tooltip>
    );
    return (
      <div>
        <Nav
            bsStyle="pills"
            justified
            onSelect={this.handleFilter}
            activeKey={this.state.filter}
        >
          <NavItem eventKey="day">
            Day
          </NavItem>
          <NavItem eventKey="week">
            Week
          </NavItem>
          <NavItem eventKey="month">
            Month
          </NavItem>
          <NavItem eventKey="year">
            Year
          </NavItem>
          <NavItem eventKey="all">
            All
          </NavItem>
        </Nav>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Report Location</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Your location will be logged anonymously in our database.</p>
            <p>A marker will be displayed to other users as a warning.</p>
            <p>This action cannot be undone, so use at your discretion.</p>
            <p>If you wish to continue, submit and stay safe!</p>

            <FormGroup>
              <ControlLabel>Optional Information</ControlLabel>
              <Panel>
                <ControlLabel>Reasons</ControlLabel>
                <Checkbox onChange={() => this.handleCheck('environment')}>
                  Environment
                </Checkbox>
                <Checkbox onChange={() => this.handleCheck('behavior')}>
                  Behavior
                </Checkbox>
                <br />
                <ControlLabel>Danger</ControlLabel>
                <br />
                <Radio
                    inline
                    checked={this.state.danger === 'low'}
                    onChange={() => this.setState({ danger: 'low' })}
                >
                  Low
                </Radio>
                <Radio
                    inline
                    checked={this.state.danger === 'medium'}
                    onChange={() => this.setState({ danger: 'medium' })}
                >
                  Medium
                </Radio>
                <Radio
                    inline
                    checked={this.state.danger === 'high'}
                    onChange={() => this.setState({ danger: 'high' })}
                >
                  High
                </Radio>
              </Panel>
              <p>These options are placeholder and not final!</p>
            </FormGroup>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.addNode}>Submit</Button>
          </Modal.Footer>

        </Modal>

        {!this.state.showModal && this.props.auth.isAnon ?
        <OverlayTrigger placement="top" overlay={addNodeDisabledTip}>
          <button
              className="App-addNode-disabled"
              disabled={!this.props.auth.isAnon}
          >
            <Glyphicon glyph="flag" />
          </button>
        </OverlayTrigger>
        : null}
        {!this.state.showModal && !this.props.auth.isAnon ?
        <OverlayTrigger placement="top" overlay={addNodeTip}>
          <button
              className="App-addNode"
              onClick={this.open}
          >
            <Glyphicon glyph="flag" />
          </button>
        </OverlayTrigger>
        : null}
        {!this.state.showModal ?
        <OverlayTrigger placement="top" overlay={getLocationTip}>
          <button
              className="App-getLocation"
              onClick={this.getLocation}
          >
            <Glyphicon glyph="glyphicon glyphicon-map-marker" />
          </button>
        </OverlayTrigger>
        : null}
        <Map
            key={this.state.key}
            location={this.state.location}
            nodes={this.state.nodes}
        />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getAuth,
  auth => ({ auth })
);

export default connect(
  mapStateToProps,
  authActions
)(MapContainer);
