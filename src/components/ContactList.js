import React, { Component, PropTypes } from 'react';
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

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    show: PropTypes.bool,
    close: PropTypes.func.isRequired,
    submitUserContact: PropTypes.func.isRequired,
    removeUserContact: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      valid: null,
    };
  }

  handleName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleNumber = (event) => {
    this.setState({ number: event.target.value });
  }


  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>

        <Modal.Header
          style={{ background: '#5cb85c', color: 'white' }}
          closeButton
        >
          <Modal.Title>Contacts</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5><strong>Contacts</strong></h5>
          {this.props.contacts ?
           Object.keys(this.props.contacts).map((entry, index) => (
             <Panel key={index}>
               <Media.Left>
                 <Glyphicon
                   style={{ fontSize: 24 }}
                   glyph="glyphicon glyphicon-user"
                 />
               </Media.Left>
               <Media.Body>
                 <Media.Heading>
                   {this.props.contacts[entry].contact.name}
                 </Media.Heading>
                 <p>{this.props.contacts[entry].contact.number}</p>
               </Media.Body>
               <Media.Right>
                 <ButtonGroup vertical>
                   <a
                     href={`tel: ${this.props.contacts[entry].contact.number}`}
                   >
                     <Button style={{ width: '100%' }}>
                       Call
                     </Button>
                   </a>
                   <Button
                     bsStyle="link"
                     onClick={() =>
                       this.props.removeUserContact(this.props.contacts[entry])}
                   >
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
              <FormControl
                placeholder="name of contact"
                onChange={this.handleName}
                type="text"
                value={this.state.name}
              />
              {(this.state.number.match(/^[0-9]+$/) !== null &&
                this.state.number.length === 11) ?
                  <FormGroup validationState="success">
                    <FormControl
                      placeholder="eleven digit number"
                      onChange={this.handleNumber}
                      type="text"
                      value={this.state.number}
                    />
                  </FormGroup>
               :
                  <FormGroup validationState="warning">
                    <FormControl
                      placeholder="eleven digit number"
                      onChange={this.handleNumber}
                      type="text"
                      value={this.state.number}
                    />
                  </FormGroup>
              }
              <InputGroup.Button>
                <Button
                  style={{ padding: 0, height: '100%', width: 32 }}
                  onClick={() =>
                    this.props.submitUserContact(
                      this.state.name,
                      this.state.number
                    )}
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

export default ContactList;
