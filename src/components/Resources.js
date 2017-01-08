import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

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
            <h3 style={{marginTop: 0}}>Security</h3>
            <h3 style={{marginTop: 0}}>{this.props.resources.get('security')}</h3>
            <ListGroup>
              <ListGroupItem header="Information" href={this.props.resources.get('info')}>
                View the services that campus security provides
              </ListGroupItem>
              <ListGroupItem header="Find Support" href={this.props.resources.get('support')}>
                Find help and report offenses
              </ListGroupItem>
              <ListGroupItem header="Get Involved" href={this.props.resources.get('involved')}>
                Learn how you can support the cause
              </ListGroupItem>
            </ListGroup>
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
