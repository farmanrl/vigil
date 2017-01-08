import React, { PropTypes, Component } from 'react';
import { ProgressBar, Badge, ControlLabel, Modal } from 'react-bootstrap';
import './Map.css';
import { dark, light, retro, night, silver, aubergine } from './MapStyles';

const container = {
  position: 'absolute',
  top: 120,
  bottom: 0,
  width: '100%',
  color: 'white'
};

class Map extends Component {
  static propTypes = {
    nodes: PropTypes.array,
    location: PropTypes.object,
    loader: PropTypes.object,
    style: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      reports: null,
      rating: null,
      safe: null,
      danger: null,
      address: null,
    };
  }

  componentDidMount = () => {
    console.log('map', this.props);
    this.props.loader.load((google) => {
      this.maps = google.maps;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.props.location,
        zoom: 16,
        styles: this.props.style,
      });
      this.map.addListener('click', this.onClick);
      if (this.props.location) {
        this.setMarker();
      }
      if (this.props.route) {
        this.setRoute();
      }
      if (this.props.nodes) {
        this.setHeatmap();
      }
    });
  }

  getStyle = () => {
    console.log(this.props.style);
    if (this.props.style === 'dark') {
      return dark;
    } else if (this.props.style === 'light') {
      return light;
    } else if (this.props.style === 'retro') {
      return retro;
    } else if (this.props.style === 'night') {
      return night;
    } else if (this.props.style === 'silver') {
      return silver;
    } else if (this.props.style === 'aubergine') {
      return aubergine;
    }
    return dark;
  }

  setMarker = () => {
    new this.maps.Marker({
      position: this.props.location,
      map: this.map,
    });
  }

  setHeatmap = () => {
    const data = Object.keys(this.props.nodes).map(node => (
      new this.maps.LatLng(
        this.props.nodes[node].location.lat,
        this.props.nodes[node].location.lng
      )
    ));
    console.log(data);
    const options = {
      radius: 15,
      maxIntensity: this.props.nodes.length / 10,
    };
    const heatmap = new this.maps.visualization.HeatmapLayer({
      data,
      map: this.map,
      options
    });
    heatmap.setMap(this.map);
  }

  setRoute = () => {
    const route = this.props.route;
    const destination = { lat: route.lat, lng: route.lng };
    const directionsService = new this.maps.DirectionsService();
    const directionsDisplay = new this.maps.DirectionsRenderer();
    const request = {
      origin: this.props.location,
      destination,
      travelMode: this.maps.TravelMode.WALKING
    };
    directionsDisplay.setMap(this.map);
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    });
  }

  onClick = (event) => {
    let danger = 0;
    let safe = 0;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    const geocoder = new this.maps.Geocoder;
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK') {
        const address = results[0].formatted_address;
        this.props.nodes.forEach((node) => {
          if (results[0].place_id === node.place) {
            if (node.report) {
              if (node.report === 'safe') {
                safe += 1;
              } else if (node.report === 'danger') {
                danger += 1;
              }
            }
          }
        });
        const reports = safe + danger;
        if (reports) {
          const risk = danger / reports;
          let rating = null;
          if (risk <= 0.25) {
            rating = 'Low';
          } else if (risk <= 0.5) {
            rating = 'Moderate';
          } else if (risk <= 0.75) {
            rating = 'High';
          } else {
            rating = 'Extreme';
          }
          this.setState({
            safe,
            danger,
            reports,
            rating,
            address,
          });
        } else {
          this.setState({
            reports: null,
            safe: null,
            danger: null,
            rating: null,
            address: null,
          });
        }
      }
    });
  }

  close = () => {
    this.setState({
      reports: null,
      safe: null,
      danger: null,
      rating: null,
      address: null,
    });
  }

  render() {
    return (
      <div id="map" style={container}>
        <div>
          <Modal show={this.state.reports} bsStyle="low" onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.address}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>{this.state.rating} risk</Modal.Title>
            <br />
            <ControlLabel>Reports <Badge>{this.state.reports}</Badge></ControlLabel>
            <ProgressBar>
              <ProgressBar
                now={this.state.safe}
                max={this.state.reports}
                label="safe"
                key={1}
              />
              <ProgressBar
                now={this.state.danger}
                max={this.state.reports}
                label="danger"
                bsStyle="danger"
                key={2}
              />
            </ProgressBar>
          </Modal.Body>
        </Modal>
        </div>
      </div>
    );
  }
}

export default Map;
