import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip, Modal, Label, Badge, Well } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import './App.css';
import logo from './vigil.png';

class Header extends Component {
  static propTypes = {
    route: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    if (this.props.authenticated) {
      const mapTip = (
        <Tooltip id="tooltip"><strong>Open Map</strong></Tooltip>
      );
      const homeTip = (
        <Tooltip id="tooltip"><strong>Open Home</strong></Tooltip>
      );
      return (
        <div className="Header">
          <div className="Header-bar">
            <Button className="Header-brand" bsStyle="link" onClick={this.open}>
              <img
                  src={logo}
                  className="Header-logo"
                  alt="logo"
              />
              <div>
                <h2 className="Header-title">VIGIL</h2>
                <h5 className="Header-subtitle"><Label>1.1</Label></h5>
              </div>
            </Button>
            <div className="Header-controls">
              <Button bsSize="sm" onClick={this.props.signOut} >
                Sign Out
              </Button>
              {this.props.route === '/home' ?
                <OverlayTrigger placement="bottom" overlay={mapTip}>
                  <Button
                    bsSize="lg"
                    bsStyle="link"
                    style={{ fontSize: 24, paddingTop: 20 }}
                    onClick={() => browserHistory.replace('/heatmap')}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-map-marker" />
                  </Button>
                </OverlayTrigger>
               : null
              }
              {this.props.route === '/heatmap' ?
                <OverlayTrigger placement="bottom" overlay={homeTip}>
                  <Button
                    bsSize="lg"
                    bsStyle="link"
                    style={{ fontSize: 24, paddingTop: 20 }}
                    onClick={() => browserHistory.replace('/home')}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-menu-hamburger" />
                  </Button>
                </OverlayTrigger>
               : null
              }
            </div>
          </div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>VIGIL <Badge>1.1</Badge></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Modal.Title>Created by Richard Farman</Modal.Title>
              <h5>Software Development, Multimedia Production</h5>
              <h5>Computer Science Student at Whitman College</h5>
              <p>
                VIGIL is under ongoing development,
                and is subject to change in scope and vision.
              </p>
              <Well>
                <p>Contact me if you are interested in getting involved!</p>
                <p>farmanrl@whitman.edu</p>
                <p><a href="http://farmanrl.me">My Website</a></p>
              </Well>
            </Modal.Body>
            <Modal.Footer>
              <a href="https://www.linkedin.com/in/farmanrl">
                <Button bsStyle="link">LinkedIn</Button>
              </a>
              <a href="https://github.com/farmanrl">
                <Button bsStyle="link">Github</Button>
              </a>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } return null;
  }
}

Header.PropTypes = {
  route: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
