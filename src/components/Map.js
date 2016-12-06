import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { Glyphicon, Popover, ProgressBar, Badge } from 'react-bootstrap';

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
      behavior: 0,
      environment: 0,
      reasonCount: 0,
      dangerCount: 0,
      dangerLow: 0,
      dangerMedium: 0,
      dangerHigh: 0,
      zoom: 16
    };
  }

  createMapOptions = maps => { return { styles }; };

  onChange = ({ zoom }) => {
    this.setState({ zoom });
  }

  onClick = (obj) => {
    let environment = 0;
    let behavior = 0;
    let dangerLow = 0;
    let dangerMedium = 0;
    let dangerHigh = 0;
    this.props.nodes.forEach((node) => {
      const radius = 0.0002;
      if (node.lat > obj.lat - radius &&
          node.lat < obj.lat + radius &&
          node.lng > obj.lng - radius &&
          node.lng < obj.lng + radius &&
          (node.reasons !== undefined || node.danger !== undefined)
      ) {
        if (node.danger) {
          if (node.danger === 'low') {
            dangerLow += 1;
          } else if (node.danger === 'medium') {
            dangerMedium += 1;
          } else if (node.danger === 'high') {
            dangerHigh += 1;
          }
        }
        if (node.reasons) {
          node.reasons.forEach((reason) => {
            if (reason === 'behavior') {
              behavior += 1;
            } else if (reason === 'environment') {
              environment += 1;
            }
          });
        }
      }
    });
    const reasonCount = behavior + environment;
    const dangerCount = dangerLow + dangerMedium + dangerHigh;
    this.setState({ lat: obj.lat, lng: obj.lng, behavior, environment, dangerLow, dangerMedium, dangerHigh, reasonCount, dangerCount });
  }

  render() {
    return (
      <div style={{ position: 'absolute', top: 120, bottom: 0, width: '100%' }}>
        {this.props.nodes ?
        <GoogleMap
            options={this.createMapOptions}
            center={this.props.location}
            zoom={16}
            onClick={this.onClick}
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
          {this.props.location ?
           <div
             style={{
               fontSize: 30,
               position: 'relative',
               bottom: 30,
               right: 15,
               filter: 'invert(100%)',
               }}
               lat={this.props.location.lat}
               lng={this.props.location.lng}
               onClick={() => this.onClick({lat: this.props.location.lat, lng: this.props.location.lng})}
           >
             <Glyphicon
                 glyph="glyphicon glyphicon-map-marker"
             />
           </div>
          : null}
          {(this.state.behavior || this.state.environment || this.state.dangerLow || this.state.dangerMedium || this.state.dangerHigh) ?
           <div
               style={{
                 height: 120,
                 width: 240,
                 position: 'relative',
                 right: 135,
                 bottom: 265,
               }}
               lat={this.state.lat}
               lng={this.state.lng}
           >
             <Popover
                 id="popover-basic"
                 placement="top"
                 title={<h4>About this location</h4>}
             >
               {this.state.environment ?
                <div style={{ width: 240 }} >
                  <strong>Environment Warning <Badge>{this.state.environment}</Badge></strong>
                  <ProgressBar now={this.state.environment} max={this.state.reasonCount} />
                </div>
               : null}
               {this.state.behavior ?
                <div>
                  <strong>Behavior Warning <Badge>{this.state.behavior}</Badge></strong>
                  <ProgressBar now={this.state.behavior} max={this.state.reasonCount} />
                </div>
               : null}
                {(this.state.dangerLow || this.state.dangerMedium || this.state.dangerHigh) ?
                 <div style={{ width: 240 }}>
                   <strong>Danger <Badge>{this.state.dangerCount}</Badge></strong>
                   <ProgressBar>
                     <ProgressBar
                         now={this.state.dangerLow}
                         max={this.state.dangerCount}
                         label="low"
                         bsStyle="success"
                         key={1}
                     />
                     <ProgressBar
                         now={this.state.dangerMedium}
                         max={this.state.dangerCount}
                         label="med"
                         bsStyle="warning"
                         key={2}
                     />
                     <ProgressBar
                         now={this.state.dangerHigh}
                         max={this.state.dangerCount}
                         label="high"
                         bsStyle="danger"
                         key={3}
                     />
                   </ProgressBar>
                 </div>
                : null}
             </Popover>
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
  location: PropTypes.object,
  nodes: PropTypes.array,
};

export default Map;
