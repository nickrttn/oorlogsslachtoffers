import React, { Component, PropTypes } from 'react';
import './Dossier.css';

class Dossier extends Component {
  static props = {
    person: PropTypes.object
  }

  render() {
    const { name } = { ...this.props.person }

    return (
      <section className="dossier">
        <h4>{ name }</h4>
      </section>
    );
  }
}

export default Dossier;
