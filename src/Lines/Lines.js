// Modules
import React, { Component } from 'react';

// Components
import Legend from '../Legend/Legend';

// Assets
import './Lines.css';
import star from './svg/star.svg';
import cross from './svg/cross.svg';
import monument from './svg/monument.svg';

class Lines extends Component {
  render() {
    return (
      <section className="lines">
        <Legend />
        <section className="lines__visualisation">
          <p>Hier komen de lijnen.</p>
        </section>
      </section>
    );
  }
}

export default Lines;
