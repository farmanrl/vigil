import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { Button, Accordion, Panel, form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Information extends Component {
  static propTypes = {
    anon: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { text: null };
  }

  submit = () => {
    const feedback = firebase.database().ref().child('feedback/');
    const key = feedback.push().key;
    let updates = {};
    updates['/feedback/' + key] = this.state.text;
    firebase.database().ref().update(updates);
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  }


  render() {
    return (
      <Accordion>
        <Panel header="Resources" eventKey="resources">
          <a href="http://www.cdc.gov/violenceprevention/sexualviolence/prevention.html">
            <h4>Sexual Violence Prevention</h4>
          </a>
          <hr />
          <a href="https://www.rainn.org/about-national-sexual-assault-telephone-hotline">
            <h4>Sexual Violence Hotline</h4>
          </a>
        </Panel>
        <Panel header="About" eventKey="about">
          <p>VIGIL is a web-based application that displays a density heatmap of locations where users have reported their location as unsafe.
          </p>
          <p>VIGIL was developed as both a preventative platform against sexual violence and other dangerous situations, as well as an action and support system for victims and responsible individuals.
          </p>
          <p>Users can view the map and see when and where others have reported their locations, and report their own location if they feel unsafe.
          </p>
          <p>All our data gathered from users will be rendered in a heatmap that shows the position and frequency of reported locations, with the ability to filter by time.
          </p>
          <p>As always, rely on your own judgement, but feel free to use our application to stay aware of where you are, and to report if you encounter a situation that you would want other users to avoid.
          </p>
          <p>I hope users will use this app to their benefit, as well as share it with others to spread awareness and alertness to their friends and across communities.
          </p>
          <p>VIGIL was inspired by my experiences and conversations with friends, colleagues, and peers across my first few years of college. Despite rising awareness, there is still much gender and racial discrimination in our society that leads to hatred and violence. Let's do our best to work together and end it!</p>
          <strong>All user information and locations are anonymous.</strong>
        </Panel>
        <Panel header="Support" eventKey="support">
          <p>Developing and releasing an application always costs time and money, and as the sole developer of this platform, I'm always running short of each.
          </p>
          <p>Since managing a large-scale application with authentication, databasing, hosting, geolocation, and other features can be costly, I will need help to support as many users as possible.
          </p>
          <p>Any contribution you can make would be very much appreciated and go directly to supporting the application, allowing me to make our application bigger and better.</p>
          <a href="https://www.gofundme.com/vigil-app"><h4>GoFundMe Page</h4></a>
          <strong>Goal: $12</strong>
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
