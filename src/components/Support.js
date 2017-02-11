import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class Support extends Component {
  render() {
    return (
      <div>
        <p>
          Developing and deploying an application always costs time and money,
          and as the sole developer of this platform, I am always running short
          of each.
        </p>
        <p>
          Since managing a large-scale application with authentication,
          databasing, hosting, geolocation, and other features can be costly, I
          will need help to support as many users as possible.
        </p>
        <p>
          Any contribution you can make would be very much appreciated and go
          directly to supporting the application, allowing me to make our
          application bigger and better.
        </p>
        <a href="https://www.gofundme.com/vigil-app">
          <h4>
            GoFundMe Page
          </h4>
        </a>
        <strong>Goal: $12</strong>
        <ProgressBar bsStyle="success" now={1} />
      </div>
    );
  }
}

export default Support;
