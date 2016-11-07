import React, { Component, PropTypes } from 'react';
import './Dossier.css';

class Dossier extends Component {
  static props = {
    activeFilters: PropTypes.array,
    addFilter: PropTypes.func,
    handleClose: PropTypes.func,
    person: PropTypes.object,
  }

  componentDidMount = () => {
    this.setActiveButtons();
  }

  componentDidUpdate = () => {
    this.setActiveButtons();
  }

  setActiveButtons = () => {
    const { activeFilters, person } = this.props;

    const buttons = document.querySelectorAll('.dossier__passport-filters button');
    const filters = activeFilters.map(filter => Object.keys(filter)[0]);

    buttons.forEach(button => button.classList.remove('active'));
    buttons.forEach(button => {
      filters.forEach((filter, index) => {
        if (filter === button.id && person[filter] === activeFilters[index][filter]) {
          button.classList.add('active');
        }
      });
    });
  }

  toggleFilter = (event, key, value) => {
    event.currentTarget.classList.toggle('active');
    this.props.addFilter(key, value);
  }

  render() {
    const { person } = this.props;

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
            <div className="dossier__passport-filters" ref={ ref => this._filters = ref  }>
              <h4>{ person.name }</h4>

              <button id="category" onClick={ (e) => this.toggleFilter(e, 'category', person.category) }>
                <svg viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Rol in de oorlog</span>
                  <span>{ person.category }</span>
                </div>
              </button>

              <button id="profession" onClick={ (e) => this.toggleFilter(e, 'profession', person.profession) }>
                <svg viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Beroep</span>
                  <span>{ person.profession }</span>
                </div>
              </button>

              <button id="causeOfDeath" onClick={ (e) => this.toggleFilter(e, 'causeOfDeath', person.causeOfDeath) }>
                <svg viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Doodsoorzaak</span>
                  <span>{ person.causeOfDeath }</span>
                </div>
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
