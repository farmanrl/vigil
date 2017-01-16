import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { Button, Accordion, Panel, FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem, Well } from 'react-bootstrap';

class Information extends Component {
  static propTypes = {
    anon: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  submit = () => {
    const feedback = firebase.database().ref().child('feedback/');
    const key = feedback.push().key;
    const updates = {};
    updates['/feedback/' + key] = this.state.text;
    firebase.database().ref().update(updates);
    this.setState({ text: '' });
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <Accordion>
        <Panel header="Resources" eventKey="resources">
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
        </Panel>
        <Panel header="About" eventKey="about">
          <p>
            VIGIL is a web-based application that displays a heatmap of locations where users have reported their location as unsafe.
          </p>
          <p>
            VIGIL was developed as both a preventative platform against sexual violence and other dangerous situations, as well as an action and support system for victims and advocates.
          </p>
          <p>
            Users can view the map and see when and where others have reported their locations, and report their own location if they feel unsafe, with the option of providing additional information.
          </p>
          <p>
            All our data gathered from users will be rendered in a heatmap that shows the position and frequency of reported locations, with the ability to filter by time.
          </p>
          <p>
            As a location receives more reports, the color of the map will change from green, to yellow, to red according to the density of reports at that location.
          </p>
          <p>
            You can click on a particular location to see if there's more detailed information about why this location was reported.
          </p>
          <p>
            As always, rely on your own judgement, but feel free to use our application to stay aware of where you are, and to report if you encounter a situation that you would want other users to avoid.
          </p>
          <p>
            I hope users will use this app to their benefit, as well as share it with others to spread awareness and alertness to their friends and across communities.
          </p>
          <p>
            VIGIL was inspired by my experiences and conversations with friends, colleagues, and peers across my first few years of college.
          </p>
          <p>
            Despite rising awareness, there is still much gender and racial discrimination in our society that leads to hatred and violence. Let's do our best to work together and end it!
          </p>
          <strong>All user information and locations are anonymous.</strong>
        </Panel>
        <Panel header="Support" eventKey="support">
          <p>Developing and deploying an application always costs time and money, and as the sole developer of this platform, I am always running short of each.
          </p>
          <p>Since managing a large-scale application with authentication, databasing, hosting, geolocation, and other features can be costly, I will need help to support as many users as possible.
          </p>
          <p>Any contribution you can make would be very much appreciated and go directly to supporting the application, allowing me to make our application bigger and better.</p>
          <a href="https://www.gofundme.com/vigil-app"><h4>GoFundMe Page</h4></a>
          <Well>
            <strong>Goal: $12</strong>
          </Well>
        </Panel>
        <Panel header="Feedback" eventKey="feedback">
          <p>I am always looking to improve our application and provide more features and enhanced functionality to my users.
          </p>
          <p>Your feedback helps me focus our efforts to design and develop VIGIL to be faster, better, and safer for all.</p>
          <p>This feedback is anonymous and will never be tied to your account. Let me know what I can to do help!</p>
          {!this.props.anon ?
          <div>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Tell us what you think!</ControlLabel>
              <FormControl
                  componentClass="textarea"
                  value={this.state.text}
                  placeholder="Feedback"
                  onChange={this.handleChange}
              />
            </FormGroup>
          </form>
          <Button type="submit" onClick={this.submit}>
            Submit
          </Button>
          </div>
           : <strong>Login to submit feedback.</strong>
          }
        </Panel>
      </Accordion>
    );
  }
}

Information.propTypes = {
  anon: PropTypes.bool.isRequired,
};

export default Information;
