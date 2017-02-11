import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import contact from '../assets/contact.png';
import customize from '../assets/customize.png';
import danger from '../assets/danger.png';
import domain from '../assets/domain.png';
import feedback from '../assets/feedback.png';
import filter from '../assets/filter.png';
import goto from '../assets/goto.png';
import heatmap from '../assets/heatmap.png';
import location from '../assets/location.png';
import reroute from '../assets/reroute.png';
import resources from '../assets/resources.png';
import route from '../assets/route.png';
import safe from '../assets/safe.png';
import support from '../assets/support.png';

class About extends Component {
  render() {
    return (
      <div style={{ color: '#333' }}>
        <h3 style={{ color: '#333', marginTop: 0 }}>VIGIL</h3>
        <p>
          VIGIL is a web-based application that displays a heatmap of locations
          where users have reported their location as unsafe.
        </p>
        <p>
          VIGIL was developed as both a preventative platform against sexual
          violence and other dangerous situations, as well as an action and
          support system for victims and advocates.
        </p>
        <Accordion>
          <Panel header="Map" eventKey="1">
            <img height="360px" src={heatmap} alt="heatmap" />
            <h3>Heatmap</h3>
            <p>
              Users can view the map and see when and where others have reported
              their locations, and report their own location if they feel
              unsafe, with the option of providing additional information.
            </p>
            <img height="360px" src={filter} alt="filter" />
            <h3>Data and Filters</h3>
            <p>
              All our data gathered from users will be rendered in a heatmap
              that shows the position and frequency of reported locations,
              with the ability to filter by time.
            </p>
          </Panel>
          <Panel header="Reports" eventKey="2">
            <img height="360px" src={safe} alt="safe" />
            <h3>Safe</h3>
            <p>
              If you feel comfortable in your current location, mark it as safe
              to display to other users on the map.
            </p>
            <img height="360px" src={danger} alt="danger" />
            <h3>Danger</h3>
            <p>
              If you feel uncomfortable in your current location, mark it as
              unsafe to display to other users on the map.
            </p>
            <img height="360px" src={location} alt="location" />
            <h3>Location</h3>
            <p>
              You can view reports for any location by selecting a marked
              location on the map, or by selecting &apos;Where am I?&apos;.
            </p>
          </Panel>
          <Panel header="Directions" eventKey="3">
            <img height="360px" src={goto} alt="goto" />
            <h3>Directions</h3>
            <p>
              Users save their current location for future reference and
              directions.
            </p>
            <img height="360px" src={route} alt="route" />
            <h3>Routes</h3>
            <p>
              Using google maps, users can find a route from their current
              location to any saved location in their direction list.
            </p>
            <img height="360px" src={reroute} alt="reroute" />
            <h3>Custom Routes</h3>
            <p>
              You can even drag and drop your directions to modify the route.
            </p>
          </Panel>
          <Panel header="Contacts" eventKey="4">
            <img height="360px" src={contact} alt="contact" />
            <h3>Contacts</h3>
            <p>
              Users can add and remove contacts to their directory to make
              quick calls to phone numbers from within the app.
            </p>
          </Panel>
          <Panel header="More" eventKey="5">
            <img height="360px" src={customize} alt="customize" />
            <h3>Customization</h3>
            <p>
              Users can customize the style of their map to personalize the
              app to their taste.
            </p>
          </Panel>
          <Panel header="Home" eventKey="6">
            <img height="360px" src={domain} alt="domain" />
            <h3>Domain</h3>
            <p>
              Users will have a personalized home screen depending on the
              domain name of your email. The app can provide links and
              resources customized to your organization.
            </p>
            <img height="360px" src={resources} alt="resources" />
            <h3>Resources</h3>
            <p>
              Public resources will be available to all for instant access to
              information, support, and activism for sexual violence prevention.
            </p>
            <img height="360px" src={support} alt="support" />
            <h3>Support</h3>
            <p>
              As an independent developer, I need all the help I can get!
              Consider supporting us through donating or sharing this cause.
            </p>
            <img height="360px" src={feedback} alt="feedback" />
            <h3>Feedback</h3>
            <p>
              I am always looking to improve the app and add more features!
              If there are any suggestions, criticisms, or ideas you have, let
              me know through here.
            </p>
          </Panel>
        </Accordion>
        <p>
          As always, rely on your own judgement, but feel free to use our
          application to stay aware of where you are, and to report any
          situations you feel others should know about.
        </p>
        <p>
          I hope users will use this app to their benefit, as well as share it
          with others to spread awareness and alertness to their friends and
          across communities.
        </p>
        <p>
          VIGIL was inspired by my experiences and conversations with friends,
          colleagues, and peers across my first few years of as a college
          student.
        </p>
        <p>
          Despite rising awareness, there is still much gender and racial
          discrimination in our society that leads to hatred and violence.
          Let&apos;s do our best to work together and end it!
        </p>
        <strong>
          All user information and locations are anonymous.</strong>
      </div>
    );
  }
}

export default About;
