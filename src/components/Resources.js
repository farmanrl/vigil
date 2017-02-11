import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Resources extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem href="http://www.cdc.gov/violenceprevention/sexualviolence/prevention.html" header="Sexual Violence Prevention">
          Everything you need to know about how to prevent sexual violence
        </ListGroupItem>
        <ListGroupItem href="https://www.rainn.org/about-national-sexual-assault-telephone-hotline" header="Sexual Violence Hotline">
          Get immediate support through RAINN's national telephone hotline
        </ListGroupItem>
        <ListGroupItem href="https://www.rainn.org/articles/what-is-consent" header="About Consent">
          Learn what it means to give and recieve consent
        </ListGroupItem>
        <ListGroupItem href="http://hams.cc/students/" header="Harm Reduction">
          Learn techniques for minimizing health risks for yourself and others
        </ListGroupItem>
        <ListGroupItem href="https://www.livethegreendot.com/" header="Live the Green Dot">
          Join the movement that inspired this application
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default Resources;
