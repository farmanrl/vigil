import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

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
            <h2>Security</h2>
            <h4>{this.props.resources.get('security')}</h4>
            <hr />
            <a href={this.props.resources.get('info')}>
              <h4>Information</h4>
            </a>
            <hr />
            <a href={this.props.resources.get('support')}>
              <h4>Get Help</h4>
            </a>
          </Panel>
          }
          {!this.props.resources.get('valid') &&
          <Panel>
            <h3>No resources available</h3>
            <p>We will add support for your domain as soon as possible!</p>
            <p><strong>.edu</strong> domains will be given priority for extended functionality.</p>
          </Panel>
          }
        </div>
      );
    }
    return (
      <div>
        <Panel>
          <h3>Sign in for resources personalized to your domain</h3>
          <p>We will provide support for as many users as we can.</p>
          <p><strong>.edu</strong> domains will be given priority for extended functionality.</p>
        </Panel>
      </div>
    );
  }
}

export default Resources;
