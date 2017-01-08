import React, { Component, PropTypes } from 'react';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

const controls = {
  position: 'fixed', bottom: 32, right: 54, zIndex: 1000
};

class Controls extends Component {
  static propTypes = {
    auth: PropTypes.object,
    showModal: PropTypes.func,
  }

  render() {
    return (
      <div style={controls}>
        <ButtonGroup>

          <DropdownButton
            dropup id="split-button-dropup"
            disabled={this.props.auth.isAnon}
            title=""
          >
            <MenuItem
              eventKey="1"
              onClick={() => this.props.showModal('location')}
            >
              Where am I?
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey="2"
              onClick={() => this.props.showModal('directions')}
            >
              Go to...
            </MenuItem>
            <MenuItem
              eventKey="3"
              onClick={() => this.props.showModal('contacts')}
            >
              Contact...
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey="3"
              onClick={() => this.props.showModal('customize')}
            >
              Customize map...
            </MenuItem>
          </DropdownButton>

          <Button
            bsStyle="primary"
            onClick={() => this.props.showModal('safe')}
            disabled={this.props.auth.isAnon}
          >
            Safe
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.props.showModal('danger')}
            disabled={this.props.auth.isAnon}
          >
            Danger
          </Button>

        </ButtonGroup>
      </div>
    );
  }
}

export default Controls;
