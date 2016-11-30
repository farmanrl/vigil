import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { Glyphicon } from 'react-bootstrap';
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
  createMapOptions = maps => { return { styles }; };

  render() {
    return (
      <div style={{ position: 'absolute', top: 120, bottom: 0, width: '100%' }}>
        {this.props.nodes &&
        <GoogleMap
            options={this.createMapOptions}
            center={this.props.location}
            zoom={16}
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
          {this.props.location &&
           <div
             style={{
                 fontSize: 30,
                 position: 'relative',
                 bottom: 30,
                 right: 15,
                 filter: 'invert(100%)'
               }}
               lat={this.props.location.lat}
               lng={this.props.location.lng}
           >
             <Glyphicon
                 glyph="glyphicon glyphicon-map-marker"
             />
           </div>
          }
        </GoogleMap>
        }
      </div>
    );
  }
}

Map.propTypes = {
  location: PropTypes.object,
  nodes: PropTypes.array,
};

export default Map;
