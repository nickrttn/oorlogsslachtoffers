// Modules
import React, { Component, PropTypes } from 'react';

// Assets
import './Tooltip.css';
import star from './svg/star.svg';
import cross from './svg/cross.svg';

class Tooltip extends Component {
  static props = {
    show: PropTypes.bool.isRequired,
    person: PropTypes.object,
    position: PropTypes.object
  }

  render() {
    const { show, person, position } = this.props;

    return !show ? null : (
      <div className="tooltip" style={{ left: position.x, top: position.y }}>
        <h4>{ person.name }</h4>
        <p>{ person.category }</p>
        <p><img src={ star } alt="Geboortedatum" /> { person.birth }</p>
        <p><img src={ cross } alt="Sterfdatum" /> { person.death }</p>
        <p>Klik op de lijn om het dossier te bekijken</p>
      </div>
    );
  }
}

export default Tooltip;
