import React, { Component, PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Resources from './Resources';
import About from './About';
import Support from './Support';
import Feedback from './Feedback';

class Information extends Component {
  static propTypes = {
    anon: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Accordion>
        <Panel header="Resources" eventKey="resources">
          <Resources />
        </Panel>
        <Panel header="About" eventKey="about">
          <About />
        </Panel>
        <Panel header="Support" eventKey="support">
          <Support />
        </Panel>
        <Panel header="Feedback" eventKey="feedback">
          <Feedback anon={this.props.anon} />
        </Panel>
      </Accordion>
    );
  }
}

export default Information;
