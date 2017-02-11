import React, { PropTypes, Component } from 'react';
import { ProgressBar, Badge, ControlLabel, Modal } from 'react-bootstrap';
import './Map.css';
import Charts from './Charts';

const container = {
  position: 'absolute',
  top: 120,
  bottom: 0,
  width: '100%',
  color: 'white'
};

class Map extends Component {
  static propTypes = {
    nodeList: PropTypes.object,
    location: PropTypes.object,
    loader: PropTypes.object,
    style: PropTypes.array,
    route: PropTypes.object,
    home: PropTypes.array,
    favoriteList: PropTypes.array,
    placeList: PropTypes.array,
    filter: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      reports: null,
      rating: null,
      safe: null,
      danger: null,
      address: null,
      zoom: 16,
    };
  }

  componentDidMount = () => {
    this.props.loader.load((google) => {
      this.maps = google.maps;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.props.location ?
                this.props.location.toJS()
              :
                { lat: 46.072080, lng: -118.328129 },
        zoom: this.state.zoom,
        styles: this.props.style,
        options: {
          mapTypeControl: false,
        }
      });
      this.map.addListener('click', this.onClick);
      if (this.props.location) {
        this.setLocationMarker();
      }
      if (this.props.home) {
        this.setHomeMarker();
      }
      if (this.props.favoriteList) {
        this.setFavoriteMarker();
      }
      if (this.props.placeList) {
        this.setPlaceMarker();
      }
      if (this.props.route) {
        this.setRoute();
      }
      if (this.props.nodeList) {
        this.setHeatmap();
      }
    });
  }

  onClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    const geocoder = new this.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK') {
        const address = results[0].formatted_address;
        const safe = this.props.nodeList.filter(n => (
          n.node.report === 'safe' && results[0].place_id === n.node.placeId)
        );
        const danger = this.props.nodeList.filter(n => (
          n.node.report === 'danger' && results[0].place_id === n.node.placeId)
        );
        const reports = safe.size + danger.size;
        if (reports) {
          const risk = danger.size / reports;
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
            safe: safe.size,
            safeList: safe,
            danger: danger.size,
            dangerList: danger,
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

  setLocationMarker = () => {
    new this.maps.Marker({
      position: this.props.location ? this.props.location.toJS() : null,
      map: this.map,
      clickable: false,
    });
  }

  setHomeMarker = () => {
    this.props.home.map(entry => (
      new this.maps.Marker({
        position: entry.direction.location,
        icon: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/1024px-Home-icon.svg.png',
          anchor: new this.maps.Point(15, 30),
          scaledSize: new this.maps.Size(30, 30)
        },
        map: this.map,
        clickable: false,
      })
    ));
  }

  setFavoriteMarker = () => {
    this.props.favoriteList.map(entry => (
      new this.maps.Marker({
        position: entry.direction.location,
        icon: {
          url: 'http://simpleicon.com/wp-content/uploads/star.png',
          anchor: new this.maps.Point(15, 30),
          scaledSize: new this.maps.Size(30, 30)
        },
        map: this.map,
        clickable: false,
      })
    ));
  }

  setPlaceMarker = () => {
    this.props.placeList.map(entry => (
      new this.maps.Marker({
        position: entry.direction.location,
        icon: {
          url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1832-200.png',
          anchor: new this.maps.Point(15, 30),
          scaledSize: new this.maps.Size(30, 30)
        },
        map: this.map,
        clickable: false,
      })
    ));
  }


  setHeatmap = () => {
    const nodeList = this.props.nodeList;
    const data = [];
    nodeList.map(entry => (
      data.push(new this.maps.LatLng(
        entry.node.location,
      ))
    ));
    const options = {
      radius: 15,
      maxIntensity: this.props.nodeList.size / 10,
    };
    const heatmap = new this.maps.visualization.HeatmapLayer({
      data,
      map: this.map,
      options
    });
    heatmap.setMap(this.map);
  }

  setRoute = () => {
    const directionsService = new this.maps.DirectionsService();
    const directionsDisplay =
      new this.maps.DirectionsRenderer({
        draggable: true,
        map: this.map,
      });
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(document.getElementById('directionDisplay'));
    const request = {
      origin: this.props.location ? this.props.location.toJS() : null,
      destination: this.props.route,
      travelMode: this.maps.TravelMode.WALKING
    };
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        console.log(response);
        directionsDisplay.setDirections(response);
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
          <Modal
            show={Number.isInteger(this.state.reports)}
            bsStyle="low"
            onHide={this.close}
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.state.address}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Modal.Title>{this.state.rating} risk</Modal.Title>
              <hr />
              <ControlLabel>
                {this.props.filter} - Reports {' '}
                <Badge>{this.state.reports}</Badge>
              </ControlLabel>
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
              <Charts safe={this.state.dangerList} danger={this.state.safeList} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Map;
