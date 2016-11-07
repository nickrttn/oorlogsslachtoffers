import React, { Component, PropTypes } from 'react';
import './Dossier.css';

class Dossier extends Component {
  static props = {
    addFilter: PropTypes.func,
    handleClose: PropTypes.func,
    person: PropTypes.object,
  }

  render() {
    const { addFilter, person } = this.props;

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
          <section className="dossier__passport">
            <img
              className="dossier__photo"
              src={ process.env.PUBLIC_URL + '/images/' + person.id + '.jpg' }
              alt={ `Foto van ${person.name}` }
            />
            <div className="dossier__passport-filters">
              <h4>{ person.name }</h4>
              <button onClick={ () => addFilter('profession', person.profession) }>
                <span className="dossier__label">Beroep</span>
                <span>{ person.profession }</span>
              </button>
              <button onClick={ () => addFilter('category', person.category) }>
                <span className="dossier__label">Rol in de oorlog</span>
                <span>{ person.category }</span>
              </button>
              <button onClick={ () => addFilter('causeOfDeath', person.causeOfDeath) }>
                <span className="dossier__label">Doodsoorzaak</span>
                <span>{ person.causeOfDeath }</span>
              </button>
              { person.rank &&
                <p>
                  <span className="dossier__label">Militaire rang</span>
                  <span>{ person.rank }</span>
                </p>
              }
            </div>
          </section>
        </main>
      </section>
    );
  }
}

export default Dossier;
