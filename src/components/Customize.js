import React, { Component, PropTypes } from 'react';
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

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

        <Modal.Header closeButton>
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
              <option value="dark">dark</option>
              <option value="light">light</option>
              <option value="retro">retro</option>
              <option value="night">night</option>
              <option value="silver">silver</option>
              <option value="aubergine">aubergine</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>

      </Modal>
    );
  }
}

export default Customize;
