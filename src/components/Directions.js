import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
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

const GoogleMapsLoader = require('google-maps');

class Directions extends Component {
  static propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
    };
  }

  addLocation = (name, type) => {
    const uid = firebase.auth().currentUser.uid;
    navigator.geolocation.getCurrentPosition((position) => {
      GoogleMapsLoader.load((google) => {
        const geocoder = new google.maps.Geocoder;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const location = { lat, lng };
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK') {
            const place = results[0].place_id;
            const address = results[0].formatted_address;
            const id = firebase.database().ref().child(`/users/${uid}/${type}`).push().key;
            const node = { lat, lng, name, place, address };
            const updates = {};
            if (type === 'home') {
              updates[`users/${uid}/${type}`] = node;
            } else {
              updates[`/users/${uid}/${type}/${id}`] = node;
            }
            this.setState({ placeName: null });
            return firebase.database().ref().update(updates);
          }
        });
      });
    });
  }

  getDirections = () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${uid}/home`)
            .on('value', (snapshot) => {
              const home = snapshot.val();
              this.setState({ home });
            });
    firebase.database().ref(`users/${uid}/favorites`)
            .on('value', (snapshot) => {
              const favorites = {};
              snapshot.forEach((place) => {
                favorites[place.key] = place.val();
              });
              this.setState({ favorites });
            });
    firebase.database().ref(`users/${uid}/places`)
            .on('value', (snapshot) => {
              const places = [];
              snapshot.forEach((place) => {
                places[place.key] = place.val();
              });
              this.setState({ places });
            });
  }

  handlePlace = (event) => {
    this.setState({ placeName: event.target.value });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={{background: '#5cb85c', color: 'white'}} closeButton>
          <Modal.Title>Get Directions</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5><strong>Home</strong></h5>
          {this.props.home ?
           <Panel key={this.props.home}>
             <Media.Left  onClick={() => this.getRoute()}>
               <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-home" />
             </Media.Left>
             <Media.Body onClick={() => this.getRoute()}>
               <Media.Heading>{this.props.home.name}</Media.Heading>
               <p>{this.props.home.address}</p>
             </Media.Body>
             <Media.Right>
               <Button bsStyle="link" onClick={() => this.removeLocation(this.props.home, 'home')}>
                 Remove
               </Button>
             </Media.Right>
           </Panel>
           : null}
           <h5><strong>Favorites</strong></h5>
           {this.props.favorites ?
            Object.keys(this.props.favorites).map((favorite, index) => (
              <Panel key={index} >
                <Media.Left  onClick={() => this.getRoute()}>
                  <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-star" />
                </Media.Left>
                <Media.Body onClick={() => this.getRoute()}>
                  <Media.Heading>{this.props.favorites[favorite].name}</Media.Heading>
                  <p>{this.props.favorites[favorite].address}</p>
                </Media.Body>
                <Media.Right>
                  <Button bsStyle="link" onClick={() => this.removeLocation(favorite, 'favorites')}>
                    Remove
                  </Button>
                </Media.Right>
              </Panel>
            ))
            : null}
              <h5><strong>Places</strong></h5>
              {this.props.places ?
               Object.keys(this.props.places).map((place, index) => (
                 <Panel key={index}>
                   <Media.Left onClick={() => this.getRoute()} >
                     <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-map-marker" />
                   </Media.Left>
                   <Media.Body onClick={() => this.getRoute()}>
                     <Media.Heading>{this.props.places[place].name}</Media.Heading>
                     <p>{this.props.places[place].address}</p>
                   </Media.Body>
                   <Media.Right>
                     <Button bsStyle="link" onClick={() => this.removeLocation(place, 'places')}>
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
              <FormControl placeholder="name of location" onChange={this.handlePlace} type="text" />
              <DropdownButton
                pullRight
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title=""
              >
                <MenuItem
                  key="1"
                  onClick={() => this.addLocation(this.state.placeName, 'home')}
                >
                  Add as Home
                </MenuItem>
                <MenuItem
                  key="2"
                  onClick={() => this.addLocation(this.state.placeName, 'favorites')}
                >
                  Add as Favorite
                </MenuItem>
                <MenuItem
                  key="3"
                  onClick={() => this.addLocation(this.state.placeName, 'places')}
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

export default Directions;
