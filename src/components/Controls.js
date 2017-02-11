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
    anon: PropTypes.bool,
    showModal: PropTypes.func,
    update: PropTypes.func,
  }

  render() {
    return (
      <div style={controls}>
        <ButtonGroup>

          <DropdownButton
            dropup id="split-button-dropup"
            disabled={this.props.anon}
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
              eventKey="4"
              onClick={() => this.props.showModal('customize')}
            >
              Customize map...
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey="5"
              disabled={!this.props.position}
              onClick={() => this.props.update()}
            >
              Update Time/Location
            </MenuItem>
          </DropdownButton>

          <Button
            bsStyle="primary"
            onClick={() => this.props.showModal('safe')}
            disabled={this.props.anon || !this.props.position}
          >
            Safe
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.props.showModal('danger')}
            disabled={this.props.anon || !this.props.position}
          >
            Danger
          </Button>

        </ButtonGroup>
      </div>
    );
  }
}

export default Controls;
