import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
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
        <div className="App-header">
          <div
              style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 3% 0px 0px'
                }}
          >
            <div
                style={{
                    display: 'flex',
                    width: 170,
                    alignItems: 'center',
                    justifyContent: 'space-around'
                  }}
                onClick={this.open}
            >
              <img
                  src={require("./vigil.png")}
                  className="App-logo"
                  alt="logo"
                  style={{ height: 60 }}
              />
              <h2>VIGIL</h2>
            </div>
            <div
                style={{
                    display: 'flex',
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginRight: 20
                  }}
            >
              <Button bsSize="sm" onClick={this.props.signOut} >
                Sign Out
              </Button>
              <OverlayTrigger placement="bottom" overlay={mapTip}>
                <Button
                    bsSize="lg"
                    bsStyle="link"
                    style={{ fontSize: 24, paddingTop: 20 }}
                    onClick={() => browserHistory.replace('/map')}
                >
                  <Glyphicon glyph="glyphicon glyphicon-map-marker" />
                </Button>
              </OverlayTrigger>
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
            </div>
          </div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>VIGIL - Prototype</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Created by Richard Farman</h4>
              <p>Computer Science Student at Whitman College</p>
              <p>Product Design/Development</p>
              <p>VIGIL is under ungoing development, and is subject to changes in scope and vision.</p>
              <p>Contact me if you're interested in connecting!</p>
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
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
