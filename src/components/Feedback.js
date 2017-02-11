import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Feedback extends Component {
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
      <div>
        <p>I am always looking to improve our application and provide more features and enhanced functionality to my users.
        </p>
        <p>Your feedback helps me focus our efforts to design and develop VIGIL to be faster, better, and safer for all.</p>
        <p>This feedback is anonymous and will never be tied to your account. Let me know what I can to do help!</p>
        {!this.props.anon ?
         <div>
           <form>
             <FormGroup controlId="formControlsSelect">
               <ControlLabel>Tell me what you think!</ControlLabel>
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
      </div>
    );
  }
}

export default Feedback;
