import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getNodes, nodesActions } from '../redux/nodes';
import { getAuth } from '../redux/auth';
import { getUser, userActions } from '../redux/user';
import { Button } from 'react-bootstrap';
import Filters from './Filters';
import Map from './GoogleMap';
import Controls from './Controls';
import Safe from './Safe';
import Danger from './Danger';
import Customize from './Customize';
import Contacts from './Contacts';
import DirectionList from './DirectionList';
import Location from './Location';
import Reports from './Reports';

import './App.css';
import './MapContainer.css';

const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.KEY = 'AIzaSyD9bTn4_tEC1z_97fgdBGzlNe0GziAnIu4';
GoogleMapsLoader.LIBRARIES = ['visualization'];

const cancel = {
  position: 'fixed', bottom: 32, left: 12, zIndex: 1000
};

class MapContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    nodes: PropTypes.object,
    loadNodes: PropTypes.func,
    changeFilter: PropTypes.func,
    update: PropTypes.func,
    addNode: PropTypes.func,
    showModal: PropTypes.func,
    closeModal: PropTypes.func,
    getRating: PropTypes.func,
    submitUserDirection: PropTypes.func.isRequired,
    removeUserDirection: PropTypes.func.isRequired,
    submitUserContact: PropTypes.func.isRequired,
    removeUserContact: PropTypes.func.isRequired,
    setRoute: PropTypes.func,
    getStyle: PropTypes.func,
    setStyle: PropTypes.func,
  }

  componentWillMount() {
    this.props.update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nodes.filter !== this.props.nodes.filter) {
      this.props.update();
    }
  }

  render() {
    return (
      <div>
        <Filters
          filter={this.props.nodes.nodeFilter}
          changeFilter={this.props.changeNodeFilter}
        />
        <Controls
          anon={this.props.auth.anon}
          showModal={this.props.showModal}
        />
        <Safe
          show={this.props.nodes.showModal === 'safe'}
          submit={this.props.addNode}
          close={this.props.closeModal}
          limit={this.props.nodes.timelimit}
          address={this.props.nodes.address}
        />
        <Danger
          show={this.props.nodes.showModal === 'danger'}
          submit={this.props.addNode}
          close={this.props.closeModal}
          limit={this.props.nodes.timelimit}
          address={this.props.nodes.address}
        />
        <Customize
          show={this.props.nodes.showModal === 'customize'}
          close={this.props.closeModal}
          setStyle={this.props.submitUserStyle}
          update={this.props.update}
        />
        <Contacts
          show={this.props.nodes.showModal === 'contacts'}
          close={this.props.closeModal}
          contacts={this.props.user.contactList.toJS()}
          submitUserContact={this.props.submitUserContact}
          removeUserContact={this.props.removeUserContact}
        />
        <DirectionList
          home={this.props.user.directionList.filter(d => d.type === 'home').toJS()}
          favoriteList={this.props.user.directionList.filter(d => d.type === 'favorite').toJS()}
          placeList={this.props.user.directionList.filter(d => d.type === 'place').toJS()}
          show={this.props.nodes.showModal === 'directions'}
          close={this.props.closeModal}
          submitUserDirection={this.props.submitUserDirection}
          removeUserDirection={this.props.removeUserDirection}
          setRoute={this.props.setRoute}
        />
        <Location
          show={this.props.nodes.showModal === 'location'}
          close={this.props.closeModal}
          address={this.props.nodes.address}
          danger={this.props.nodes.nodeList.filter(n => n.node.placeId === this.props.nodes.placeId).filter(n => n.node.timestamp > this.props.nodes.timeFilter).filter(n => n.node.report === 'danger').size}
          safe={this.props.nodes.nodeList.filter(n => n.node.placeId === this.props.nodes.placeId).filter(n => n.node.timestamp > this.props.nodes.timeFilter).filter(n => n.node.report === 'safe').size}
          filter={this.props.nodes.nodeFilter}
        />
        <Reports
          filter={this.props.nodes.nodeFilter}
          safe={this.props.nodes.nodeList.filter(n => n.node.timestamp > this.props.nodes.timeFilter).filter(n => n.node.report === 'safe').size}
          danger={this.props.nodes.nodeList.filter(n => n.node.timestamp > this.props.nodes.timeFilter).filter(n => n.node.report === 'danger').size}
          total={this.props.nodes.nodeList.filter(n => n.node.timestamp > this.props.nodes.timeFilter).size}
        />
        {this.props.nodes.position &&
         this.props.user.style &&
         <Map
           loader={GoogleMapsLoader}
           key={[this.props.nodes.timeFilter, this.props.user.style, this.props.user.route, this.props.nodes.nodeList.filter(n => n.node.timestamp > this.props.nodes.timeFilter).size]}
           location={this.props.nodes.position.toJS()}
           nodeList={this.props.nodes.nodeList.filter(n => n.node.timestamp > this.props.nodes.timeFilter)}
           home={this.props.user.directionList.filter(d => d.type === 'home').toJS()}
           favoriteList={this.props.user.directionList.filter(d => d.type === 'favorite').toJS()}
           placeList={this.props.user.directionList.filter(d => d.type === 'place').toJS()}

           filter={this.props.nodes.nodeFilter}
           style={this.props.user.style.toJS()}
           route={this.props.user.route}
         />
        }
         {this.props.user.route &&
          <div
            style={cancel}
          >
            <Button
              onClick={() => this.props.setRoute(null)}
              disabled={this.props.auth.anon}
            >
              Cancel Route
            </Button>
          </div>
         }
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getAuth,
  getNodes,
  getUser,
  (auth, nodes, user) => ({
    auth, nodes, user
  })
);

const mapDispatchToProps = Object.assign(
  {},
  nodesActions,
  userActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
