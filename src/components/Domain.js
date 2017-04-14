import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Label, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class Resources extends Component {
  static propTypes = {
    resources: PropTypes.object,
  }

  render() {
    if (this.props.resources) {
      return (
        <div>
          {this.props.resources.get('valid') &&
           <Panel>
             <img
               src={this.props.resources.get('image')}
               role="presentation"
               style={{ height: 120 }}
             />
             <h1>{this.props.resources.get('name')}</h1>
             <h2 style={{ margin: 0, color: '#333' }}>Security</h2>
             <Button
               bsSize="large"
               bsStyle="link"
               href={`tel:+${this.props.resources.get('security')}`}
             >
               {this.props.resources.get('security')}
             </Button>
             <br />
             <Button
               href={this.props.resources.get('report')}
               bsStyle="primary"
             >
               Anonymous Report
             </Button>
             <hr />
             <h4>Resources</h4>
             <ListGroup>
               {this.props.resources.get('resources').map((item, index) => (
                  <ListGroupItem
                    header={item.get('text')}
                    href={item.link}
                    key={index}
                  >
                    {item.get('subtext')}
                  </ListGroupItem>
                ))}
             </ListGroup>
             <h4>Locations</h4>
             <ListGroup>
               {this.props.resources.get('locations').map(item => (
                  <ListGroupItem header={item.get('text')} href={item.link}>
                    {item.get('subtext')}
                    <ButtonGroup style={{ width: '80%' }}>
                      <Button
                        bsStyle="link"
                        style={{ float: 'left' }}
                        href={`tel:+${item.get('phone')}`}
                      >
                        <Glyphicon glyph="earphone" /> {item.get('phone')}
                      </Button>
                      <Button
                        bsStyle="link"
                        style={{ float: 'right' }}
                        href={`https://www.google.com/maps/dir/Current+Location/${item.get('address')}`}
                      >
                        <Glyphicon glyph="globe" /> Directions
                      </Button>
                    </ButtonGroup>
                  </ListGroupItem>
                ))}
             </ListGroup>
             <h6>{this.props.resources.get('domain')}</h6>
           </Panel>
          }
          {!this.props.resources.get('valid') &&
           <Panel>
             <h3>No resources available</h3>
             <p>Resources are provided based on email domain name.</p>
             <p>We will add support for your domain as soon as possible!</p>
             <p><Label>.edu</Label> domains will be given priority.</p>
           </Panel>
          }
        </div>
      );
    }
    return (
      <div>
        <Panel>
          <h3>Sign in for more resources</h3>
          <p>Resources are provided based on email domain name.</p>
          <p>We will provide support for as many users as we can.</p>
          <p><Label>.edu</Label> domains will be given priority.</p>
        </Panel>
      </div>
    );
  }
}

export default Resources;
