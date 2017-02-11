import React, { Component, PropTypes } from 'react';
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

const header = { background: '#f0ad4e', color: 'white' };

class Customize extends Component {
  static propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    setStyle: PropTypes.func,
  }

  setStyle = (event) => {
    this.props.setStyle(event.target.value);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={header} closeButton>
          <Modal.Title>
            Customize map
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Choose style</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="styles"
              onChange={this.setStyle}
            >
              <option selected disabled>select...</option>
              <option value="dark">dark (default)</option>
              <option value="light">light</option>
              <option value="retro">retro</option>
              <option value="desert">desert</option>
              <option value="hopper">hopper</option>
              <option value="avocado">avocado</option>
              <option value="golddust">gold dust</option>
              <option value="spooky">spooky</option>
              <option value="colorblind">colorblind</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>

      </Modal>
    );
  }
}

export default Customize;
