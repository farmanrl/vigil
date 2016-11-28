import React, { PropTypes } from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const Header = ({ authenticated, signOut }) => {
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
            width: 150,
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/71/V_logo_noir.png"
            className="App-logo"
            alt="logo"
            style={{ filter: 'invert(100%)', height: 65 }}
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
          {authenticated ?
            <Button bsSize="sm" onClick={signOut} >
              Sign Out
            </Button>
           : null
          }
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
    </div>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
