import React, { Component, PropTypes } from 'react';
import './Dossier.css';

class Dossier extends Component {
  static props = {
    person: PropTypes.object,
    handleClose: PropTypes.func,
  }

  render() {
    const { name } = { ...this.props.person }

    return (
      <section className="dossier">
        <header className="dossier__header">
          <h3>Dossier</h3>
          <button
            className="dossier__close"
            onClick={ this.props.handleClose }>
            &times;
          </button>
        </header>
        <main>
          <h4>{ name }</h4>
        </main>
      </section>
    );
  }
}

export default Dossier;
