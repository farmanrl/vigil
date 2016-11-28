import React, { Component, PropTypes } from 'react';
import { Panel, Well } from 'react-bootstrap';

class Resources extends Component {
  static propTypes = {
    resources: PropTypes.object.isRequired,
  }

  render() {
    if (this.props.resources) {
      return (
        <div>
          <Panel>
            <h1>{this.props.resources.get('name')}</h1>
            <br />
            <h2>Security</h2>
            <h4>{this.props.resources.get('security')}</h4>
            <a href={this.props.resources.get('website')}><h3>Website</h3></a>
            <a href={this.props.resources.get('help')}><h3>Get Help</h3></a>
          </Panel>
          <Well>
            <a href="http://www.cdc.gov/violenceprevention/sexualviolence/prevention.html">
              <h3>Sexual Violence Prevention</h3>
            </a>
            <a href="https://www.rainn.org/about-national-sexual-assault-telephone-hotline">
              <h3>Sexual Violence Hotline</h3>
            </a>
          </Well>
        </div>
      );
    }
    return (
      <div>
        <Panel>
          <h3>Sign in with email for resources personalized to your domain</h3>
          <p>We will provide support for as many users as we can</p>
        </Panel>

        <Well>
          <a href="http://www.cdc.gov/violenceprevention/sexualviolence/prevention.html">
            <h3>Sexual Violence Prevention</h3>
          </a>
          <a href="https://www.rainn.org/about-national-sexual-assault-telephone-hotline">
            <h3>Sexual Violence Hotline</h3>
          </a>
        </Well>
      </div>
    );
  }
}

export default Resources;
