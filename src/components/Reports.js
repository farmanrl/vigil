import React, { Component, PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Modal,
  ProgressBar,
  ControlLabel,
  Badge,
  Button,
} from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import Charts from './Charts';

addStyle(Panel, 'dark');

const reportStyle = {
  position: 'absolute',
  maxWidth: 300,
  top: 130,
  left: 10,
  zIndex: 1000
};

class Reports extends Component {
  static propTypes = {
    filter: PropTypes.string,
    safe: PropTypes.object,
    danger: PropTypes.object,
  }

  render() {
    const reports = this.props.safe.size + this.props.danger.size;
    const risk = this.props.danger.size / reports;
    let rating = null;
    if (risk <= 0.25) {
      rating = 'Low';
    } else if (risk <= 0.5) {
      rating = 'Moderate';
    } else if (risk <= 0.75) {
      rating = 'High';
    } else {
      rating = 'Extreme';
    }
    return (
      <div>
        <Accordion
          defaultActiveKey="0"
          style={reportStyle}
        >
          <Panel
            bsSize="sm"
            bsStyle="dark"
            header={<p><strong>{this.props.filter}</strong> - {reports} reports</p>}
          >
            <p><strong>{this.props.safe.size}</strong> safe</p>
            <p><strong>{this.props.danger.size}</strong> danger</p>
            <p><strong>{rating}</strong> risk</p>
            <Button
              onClick={() => this.props.showModal('report')}
            >
              Charts
            </Button>
          </Panel>
        </Accordion>
        <Modal show={this.props.show} onHide={this.props.close}>

          <Modal.Header style={{ background: '#5bc0de', color: 'white' }} closeButton>
            <Modal.Title>All reports</Modal.Title>
          </Modal.Header>
          {reports ?
           <Modal.Body>
             <Modal.Title>{rating} risk</Modal.Title>
             <hr />
             <ControlLabel>
               {this.props.filter} - Reports {' '}
               <Badge>{reports}</Badge>
             </ControlLabel>
             <ProgressBar>
               <ProgressBar
                 now={this.props.safe.size}
                 max={reports}
                 label="safe"
                 key={1}
               />
               <ProgressBar
                 now={this.props.danger.size}
                 max={reports}
                 label="danger"
                 bsStyle="danger"
                 key={2}
               />
             </ProgressBar>
             <Charts safe={this.props.safe} danger={this.props.danger} />
           </Modal.Body>
           :
           <Modal.Body>
             <Modal.Title>No active reports</Modal.Title>
           </Modal.Body>
          }

        </Modal>
      </div>
    );
  }
}

export default Reports;
