import React, { Component, PropTypes } from 'react';
import './Dossier.css';

class Dossier extends Component {
  static props = {
    person: PropTypes.object
  }

  render() {
    console.log(this.props.person);
    // const {  } = { ...person }
    return (
      <section className="dossier">
        <p>Hier komen persoonsgegevens en filteropties.</p>
      </section>
    );
  }
}

export default Dossier;
