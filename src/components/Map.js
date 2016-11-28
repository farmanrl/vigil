import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';

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
    this.state = { center: null, location: null, zoom: 16, };
  }


  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.setState({ center: coords, location: coords });
    });
  }

  onChange = ({ center, zoom }) => {
    this.setState({ center, zoom });
  }
  createMapOptions = maps => { return { styles }; };

  render() {
    console.log(this.state.center, this.state.location);
    return (
      <div style={{ position: 'absolute', top: 120, bottom: 0, width: '100%' }}>
        {this.props.nodes &&
        <GoogleMap
            options={this.createMapOptions}
            center={this.state.center}
            defaultZoom={this.state.zoom}
            onChange={this.onChange}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              if (this.props.nodes) {
                const heatmap = new maps.visualization.HeatmapLayer({
                  data: Object.keys(this.props.nodes).map(node => (
                    new maps.LatLng(this.props.nodes[node].lat,
                                    this.props.nodes[node].lng)
                  ))
                });
                heatmap.setMap(map);
              }
            }}
        >
          {this.state.location &&
          <img
              src="https://www.materialui.co/materialIcons/action/room_black_144x144.png"
              lat={this.state.location.lat}
              lng={this.state.location.lng}
              style={{
                height: 30,
                width: 30,
                position: 'relative',
                bottom: 30,
                right: 15,
                filter: 'invert(100%)'
              }}
               role="presentation"
          />
          }
        </GoogleMap>
        }
      </div>
    );
  }
}

Map.propTypes = {
  center: PropTypes.object,
  location: PropTypes.object,
  nodes: PropTypes.array,
  zoom: PropTypes.number,
};

export default Map;
