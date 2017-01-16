import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Modal,
  Button,
  DropdownButton,
  MenuItem,
  FormGroup,
  InputGroup,
  FormControl,
  Media,
  ControlLabel,
  Glyphicon,
} from 'react-bootstrap';

class DirectionList extends Component {
  static propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    home: PropTypes.array,
    favoriteList: PropTypes.array,
    placeList: PropTypes.array,
    submitUserDirection: PropTypes.func.isRequired,
    removeUserDirection: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  submitUserDirection = (name, type) => {
    this.props.submitUserDirection(name, type);
    this.setState({ name: '' });
  }

  handlePlace = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={{background: '#5cb85c', color: 'white'}} closeButton>
          <Modal.Title>Get Directions</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5><strong>Home</strong></h5>
          {this.props.home.length === 1 ?
           this.props.home.map((entry, index) => (
           <Panel key={entry.key}>
             <Media.Left onClick={() => this.props.setRoute(entry.direction.place)}>
               <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-home" />
             </Media.Left>
             <Media.Body onClick={() => this.props.setRoute(entry.direction.place)}>
               <Media.Heading>{entry.direction.name}</Media.Heading>
               <p>{entry.direction.address}</p>
             </Media.Body>
             <Media.Right>
               <Button bsStyle="link" onClick={() => this.props.removeUserDirection(entry)}>
                 Remove
               </Button>
             </Media.Right>
           </Panel>
           ))
           : null}
           <h5><strong>Favorites</strong></h5>
           {this.props.favoriteList ?
            this.props.favoriteList.map((entry, index) => (
              <Panel key={index} >
                <Media.Left onClick={() => this.props.setRoute(entry.direction.place)}>
                  <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-star" />
                </Media.Left>
                <Media.Body onClick={() => this.props.setRoute(entry.direction.place)}>
                  <Media.Heading>{entry.direction.name}</Media.Heading>
                  <p>{entry.direction.address}</p>
                </Media.Body>
                <Media.Right>
                  <Button bsStyle="link" onClick={() => this.props.removeUserDirection(entry)}>
                    Remove
                  </Button>
                </Media.Right>
              </Panel>
            ))
            : null}
              <h5><strong>Places</strong></h5>
              {this.props.placeList ?
               this.props.placeList.map((entry, index) => (
                 <Panel key={index}>
                   <Media.Left onClick={() => this.props.setRoute(entry.direction.place)} >
                     <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-map-marker" />
                   </Media.Left>
                   <Media.Body onClick={() => this.props.setRoute(entry.direction.place)}>
                     <Media.Heading>{entry.direction.name}</Media.Heading>
                     <p>{entry.direction.address}</p>
                   </Media.Body>
                   <Media.Right>
                     <Button bsStyle="link" onClick={() => this.props.removeUserDirection(entry)}>
                       Remove
                     </Button>
                   </Media.Right>
                 </Panel>
               ))
               : null}
        </Modal.Body>
        <Modal.Footer>
          <FormGroup>
            <ControlLabel>Add Current Location</ControlLabel>
            <InputGroup>
              <FormControl
                placeholder="name of location"
                onChange={this.handlePlace}
                type="text"
                value={this.state.name}
              />
              <DropdownButton
                pullRight
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title=""
              >
                <MenuItem
                  key="1"
                  onClick={() =>
                    this.submitUserDirection(
                      'home',
                      this.state.name
                    )}
                >
                  Add as Home
                </MenuItem>
                <MenuItem
                  key="2"
                  onClick={() =>
                    this.submitUserDirection(
                      'favorites',
                      this.state.name
                    )}
                >
                  Add as Favorite
                </MenuItem>
                <MenuItem
                  key="3"
                  onClick={() =>
                    this.submitUserDirection(
                      'places',
                      this.state.name
                    )}
                >
                  Add Place
                </MenuItem>
              </DropdownButton>

            </InputGroup>

          </FormGroup>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default DirectionList;
