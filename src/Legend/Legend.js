// Modules
import React, { Component } from 'react';

// Assets
import './Legend.css';
import star from './svg/star.svg';
import cross from './svg/cross.svg';
import monument from './svg/monument.svg';

class Legend extends Component {
  render() {
    return (
      <section className="legend">
        <p className="legend__definition"><img className="legend__image" src={ star } alt="Geboorte" /> Geboorte</p>
        <p className="legend__definition"><img className="legend__image" src={ cross } alt="Gestorven" /> Overlijden</p>
        <p className="legend__definition"><img className="legend__image" src={ monument } alt="Gestorven en monument opgericht" /> Overlijden en monument opgericht</p>
      </section>
    );
  }
}

export default Legend;
