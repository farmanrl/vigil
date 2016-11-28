import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../redux/auth';
import { Nav, NavItem, Modal, Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
      key: null
    };
  }

  componentDidMount() {
    this.getNodes();
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
      const updates = {};
      updates[`/nodes/${id}`] = node;
      firebase.database().ref().update(updates)
              .then(() => this.getNodes());
    });
    this.close();
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleSelect = (key) => {
    console.log('unblessed', key);
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
    console.log('nodestate',this.state.nodes);
    const addNodeDisabledTip = (
      <Tooltip id="tooltip">You must login to report location</Tooltip>
    );
    const addNodeTip = (
      <Tooltip id="tooltip">Report your location</Tooltip>
    );
    return (
      <div>
        <Nav
            bsStyle="pills"
            justified
            onSelect={this.handleSelect}
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
            <Modal.Title>Submit Location</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Your location will be logged anonymously in our database.</p>
            <p>This spot will be displayed to other users as a warning.</p>
            <p>If you wish to continue, submit your location, and stay safe!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.addNode}>Submit</Button>
          </Modal.Footer>

        </Modal>

        {!this.state.showModal && this.props.auth.isAnon &&
        <OverlayTrigger placement="top" overlay={addNodeDisabledTip}>
          <button
              className="App-addNode-disabled"
              disabled={!this.props.auth.isAnon}
          >
            <Glyphicon glyph="flag" />
          </button>
        </OverlayTrigger>
        }
        {!this.state.showModal && !this.props.auth.isAnon &&
        <OverlayTrigger placement="top" overlay={addNodeTip}>
          <button
              className="App-addNode"
              onClick={this.open}
          >
            <Glyphicon glyph="flag" />
          </button>
        </OverlayTrigger>
        }
        <Map
            key={this.state.key}
            location={this.state.location}
            center={this.state.center}
            nodes={this.state.nodes}
            zoom={this.state.zoom}
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
