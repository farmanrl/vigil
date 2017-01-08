import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getNodes,
  nodesActions,
} from '../redux/nodes';
import { getAuth } from '../redux/auth';

import Filters from './Filters';
import Map from './GoogleMap';
import Controls from './Controls';
import Safe from './Safe';
import Danger from './Danger';
import Customize from './Customize';
import Contacts from './Contacts';
import Directions from './Directions';
import Location from './Location';
import Reports from './Reports';

import './App.css';
import './MapContainer.css';

const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.KEY = 'AIzaSyD9bTn4_tEC1z_97fgdBGzlNe0GziAnIu4';
GoogleMapsLoader.LIBRARIES = ['visualization'];

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
    getStyle: PropTypes.func,
    setStyle: PropTypes.func,
  }

  componentWillMount() {
    this.props.update();
    this.props.getStyle();
    this.props.loadNodes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nodes.filter !== this.props.nodes.filter) {
      this.props.getStyle();
      this.props.update();
      this.props.loadNodes();
    }
  }

  init = () => {
    return (this.props.nodes.style &&
            this.props.nodes.list &&
            this.props.nodes.location &&
            this.props.nodes.timestamp);
  }

  render() {
    console.log('container props', this.props.nodes.toJS());
    console.log(this.init());
    if (this.init()) {
      console.log('yes');
      return (
        <div>
          <Filters
            filter={this.props.nodes.filter}
            changeFilter={this.props.changeFilter}
          />
          <Controls
            auth={this.props.auth}
            showModal={this.props.showModal}
          />
          <Safe
            show={this.props.nodes.showModal === 'safe'}
            submit={this.props.addNode}
            close={this.props.closeModal}
            limit={this.props.nodes.limit}
          />
          <Danger
            show={this.props.nodes.showModal === 'danger'}
            submit={this.props.addNode}
            close={this.props.closeModal}
            limit={this.props.nodes.limit}
          />
          <Customize
            show={this.props.nodes.showModal === 'customize'}
            close={this.props.closeModal}
            setStyle={this.props.setStyle}
          />
          <Contacts
            show={this.props.nodes.showModal === 'contacts'}
            close={this.props.closeModal}
            contacts={this.props.auth.contacts}
          />
          <Directions
            home={this.props.auth.home}
            favorites={this.props.auth.favorites}
            places={this.props.auth.places}
            show={this.props.nodes.showModal === 'directions'}
            close={this.props.closeModal}
          />
          <Location
            show={this.props.nodes.showModal === 'location'}
            close={this.props.closeModal}
            address={this.props.nodes.address}
            placeId={this.props.nodes.placeId}
            danger={this.props.nodes.danger}
            safe={this.props.nodes.safe}
            rating={this.props.nodes.rating}
            reports={this.props.nodes.reports}
            getRating={this.props.getRating}
          />
          <Reports
            filter={this.props.nodes.filter}
            safe={this.props.nodes.totalSafe}
            danger={this.props.nodes.totalDanger}
            total={this.props.nodes.list.size}
          />
          <Map
            loader={GoogleMapsLoader}
            key={this.props.nodes.timestamp}
            location={this.props.nodes.location.toJS()}
            nodes={this.props.nodes.list.toJS()}
            nodeFilter={this.props.nodes.filter}
            style={this.props.nodes.style.toJS()}
          />
        </div>
      );
    }
    console.log('no props');
    return null;
  }
}

const mapStateToProps = createSelector(
  getAuth,
  getNodes,
  (auth, nodes) => ({
    auth, nodes
  })
);

const mapDispatchToProps = Object.assign(
  {},
  nodesActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
