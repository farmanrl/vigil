import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import {
  Panel,
  Modal,
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  FormControl,
  Media,
  ControlLabel,
  Glyphicon,
} from 'react-bootstrap';

class Contacts extends Component {
  static propTypes = {
    contacts: PropTypes.object,
    show: PropTypes.bool,
    close: PropTypes.func,
  }

  constructor(props){
    super(props);
    this.state = {
      contactName: '',
      contactNumber: '',
    };
  }

  addContact = () => {
    console.log('ay');
    if (this.state.contactName && (this.state.contactNumber.match(/^[0-9]+$/) !== null && this.state.contactNumber.length) > 10) {
      console.log('true');
      const uid = firebase.auth().currentUser.uid;
      const id = firebase.database().ref().child(`/users/${uid}/contacts`)
                         .push().key;
      const contact = {
        name: this.state.contactName,
        number: this.state.contactNumber
      };
      const updates = {};
      updates[`users/${uid}/contacts/${id}`] = contact;
      console.log('whoaaaa');
      this.setState({
        contactName: '',
        contactNumber: '',
      });
      return firebase.database().ref().update(updates);
    }
  }

  removeContact = (contact) => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${uid}/contacts/${contact}`).remove();
  }

  handleName = (event) => {
    this.setState({ contactName: event.target.value });
  }

  handleNumber = (event) => {
    this.setState({ contactNumber: event.target.value });
  }


  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header style={{ background: '#5bc0de', color: 'white' }} closeButton>
          <Modal.Title>Contacts</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5><strong>Contacts</strong></h5>
          {this.props.contacts ?
           Object.keys(this.props.contacts).map((contact, index) => (
             <Panel key={index}>
               <Media.Left>
                 <Glyphicon style={{ fontSize: 24 }} glyph="glyphicon glyphicon-user" />
               </Media.Left>
               <Media.Body>
                 <Media.Heading>{this.props.contacts[contact].name}</Media.Heading>
                 <p>{this.props.contacts[contact].number}</p>
               </Media.Body>
               <Media.Right>
                 <ButtonGroup vertical>
                   <a href="tel:{this.props.contacts[contact].number.toString()}">
                     <Button style={{ width: '100%'}}>
                       Call
                     </Button>
                   </a>
                   <Button bsStyle="link" onClick={() => this.removeContact(contact)}>
                     Remove
                   </Button>
                 </ButtonGroup>
               </Media.Right>
             </Panel>
           ))
           : null}
             <hr />
             <ControlLabel>Add contact</ControlLabel>
             <FormGroup>
               <InputGroup>
                 <FormControl placeholder="name of contact" onChange={this.handleName} type="text" />
                 {(this.state.contactNumber.match(/^[0-9]+$/) !== null && this.state.contactNumber.length > 10) ?
                  <FormGroup validationState="success">
                    <FormControl placeholder="ten digit number" onChange={this.handleNumber} type="text" validationState="warning"/>
                  </FormGroup>
                  :
                  <FormGroup validationState="warning">
                    <FormControl placeholder="ten digit number" onChange={this.handleNumber} type="text" validationState="success"/>
                  </FormGroup>
                 }
                  <InputGroup.Button>
                    <Button
                      style={{padding: 0, height: '100%', width: 32}}
                      onClick={this.addContact}
                    >
                      +
                    </Button>
                  </InputGroup.Button>
               </InputGroup>
             </FormGroup>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Contacts;
