import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import { Glyphicon, Popover, ProgressBar, Badge, ControlLabel, Modal } from 'react-bootstrap';
import './Map.css';
import { dark, light, retro, night, silver, aubergine } from './MapStyles';

addStyle(ProgressBar, 'med');
addStyle(Popover, 'low');
addStyle(Popover, 'moderate');
addStyle(Popover, 'high');
addStyle(Popover, 'extreme');

const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.KEY = 'AIzaSyBEL4h02l7rGkTO1tO_EduzXzB1FfKJ5Fk';
GoogleMapsLoader.LIBRARIES = ['visualization', 'directions'];

const styles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d'
      }
    ]
  }
];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: null,
      rating: null,
      safe: null,
      danger: null,
      zoom: 16
    };
  }

  onChange = ({ zoom }) => {
    this.setState({ zoom });
  }

  onClick = (obj) => {
    let danger = 0;
    let safe = 0;
    this.props.nodes.forEach((node) => {
      const radius = 0.0002;
      if (node.lat > obj.lat - radius &&
          node.lat < obj.lat + radius &&
          node.lng > obj.lng - radius &&
          node.lng < obj.lng + radius) {
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
    console.log(reports);
    if (reports) {
      console.log('there are reports');
      const risk = danger / reports;
      console.log(risk);
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
        lat: obj.lat,
        lng: obj.lng,
        safe,
        danger,
        reports,
        rating
      });
    } else {
      this.setState({
        lat: obj.lat,
        lng: obj.lng,
        reports: 0,
      });
    }
  }

  createMapOptions = (maps) => {
    return { styles };
  };

  render() {
    if (this.props.style === 'dark') {
      const style = dark;
    } else if (this.props.style === 'light') {
      const style = light;
    } else if (this.props.style === 'retro') {
      const style = retro;
    } else if (this.props.style === 'night') {
      const style = night;
    } else if (this.props.style === 'silver') {
      const style = silver;
    } else if (this.props.style === 'aubergine') {
      const style = aubergine;
    }
  } else {
    const style = dark;
  }
    console.log('map props', this.props);
    return (
      <div style={{ position: 'absolute', top: 120, bottom: 0, width: '100%', color: 'white' }}>
      {this.props.nodes ?
       <GoogleMap
         options={this.createMapOptions}
         center={this.props.location}
         zoom={16}
         onClick={this.onClick}
         onChange={this.onChange}
         yesIWantToUseGoogleMapApiInternals
         onGoogleApiLoaded={({ map, maps }) => {
             navigator.geolocation.getCurrentPosition((position) => {
               console.log(position);
               const location = { lat: position.coords.latitude, lng: position.coords.longitude};
               if (this.props.goto) {
                 const goto = this.props.goto;
                 const destination = { lat: goto.lat, lng: goto.lng };
                 const directionsService = new maps.DirectionsService();
                 const directionsDisplay = new maps.DirectionsRenderer();
                 const request = {
                   origin: this.props.location,
                   destination,
                   travelMode: maps.TravelMode.WALKING
                 };
                 directionsDisplay.setMap(map);
                 directionsService.route(request, (response, status) => {
                   if (status === 'OK') {
                     directionsDisplay.setDirections(response);
                   }
                 });
               }
               const marker = new maps.Marker({
                 position: location,
                 map
               });
               if (this.props.nodes) {
                 const data = Object.keys(this.props.nodes).map(node => (
                   new maps.LatLng(this.props.nodes[node].lat,
                                   this.props.nodes[node].lng)
                 ));
                 const options = {
                   radius: 15,
                   maxIntensity: this.props.nodes.length / 10,
                 };
                 const heatmap = new maps.visualization.HeatmapLayer({
                   data,
                   options
                 });
                 heatmap.setMap(map);
               }
             });
           }}
       >
         {this.state.reports ?
          <div style={{
              height: 120,
              width: 240,
              position: 'relative',
              right: 120,
              bottom: 185,
              color: '#333'
            }}
            lat={this.state.lat}
            lng={this.state.lng}
             >
               {this.state.rating === 'Low' ?
                <Popover
                  bsStyle="low"
                  title={<h4 style={{ margin: 0 }}>{this.state.rating} risk</h4>}
                  id="popover-basic"
                  placement="top"
                >
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
                 <div style={{ textAlign: 'center' }}>
                   <p>This data is user generated and may not reflect real-world conditions</p>
                 </div>
                </Popover>
                : null}
          </div>
             :
          null }
       </GoogleMap>
       : null}
      </div>
    );
  }
}

Map.propTypes = {
  showLocation: PropTypes.boolean,
  goto: PropTypes.boolean,
  location: PropTypes.object,
  nodes: PropTypes.array,
};

export default Map;
