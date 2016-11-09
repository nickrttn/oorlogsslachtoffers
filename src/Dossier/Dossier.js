// Modules
import React, { Component, PropTypes } from 'react';
import { isMoment } from 'moment';

// Assets
import './Dossier.css';
import cross from './svg/cross.svg';
import star from './svg/star.svg';
import bronzenKruis from './images/bronzen_kruis.png';
import ordeVanNassau from './images/commandeurindeordevannassau.png';
import kruisVanVerdienste from './images/kruisvanverdienste.png';
import ordeNederlandseLeeuw from './images/ridderindeordevandenederlandseleeuw.png';
import MWO4eKL from './images/ridderMWO4ekl.png';
import verzetskruis from './images/verzetskruis.png';

class Dossier extends Component {
  static props = {
    activeFilters: PropTypes.array,
    addFilter: PropTypes.func,
    handleClose: PropTypes.func,
    person: PropTypes.object,
    toggleEvent: PropTypes.func,
  }

  componentDidMount = () => {
    this.setActiveButtons();
  }

  componentDidUpdate = () => {
    this.setActiveButtons();
  }

  setActiveButtons = () => {
    const { activeFilters, person } = this.props;

    const buttons = document.querySelectorAll('.dossier button');
    const filters = activeFilters.map(filter => Object.keys(filter)[0]);

    buttons.forEach(button => button.classList.remove('active'));
    buttons.forEach(button => {
      filters.forEach((filter, index) => {
        if (filter === button.id) {
          if (isMoment(person[filter]) && isMoment(activeFilters[index][filter])) {
            if (person[filter].isSame(activeFilters[index][filter])) {
              button.classList.add('active');
            }
          } else if (person[filter] === activeFilters[index][filter]) {
            button.classList.add('active');
          }
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
          <p className="dossier__explanation">Ontdek de verbanden met de andere slachtoffers door te klikken op de categorieën met een <svg width="16" height="16" viewBox="0 0 32 32"><path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/></svg></p>
        </header>
        <main>
          <section className="dossier__passport">
            <div className="dossier__imagery">
              <img
                className="dossier__photo"
                src={ process.env.PUBLIC_URL + '/images/' + person.id + '.jpg' }
                alt={ `Foto van ${person.name}` }
              />
              <div className="dossier__awards">
                { person.awards.bronzenKruis &&
                  <div className="dossier__award">
                    <img src={ bronzenKruis } alt="Bronzen Kruis" />
                    <div className="dossier__tooltip">
                      <p>Bronzen Kruis</p>
                    </div>
                  </div>
                }
                { person.awards.ordeVanNassau &&
                  <div className="dossier__award">
                    <img src={ ordeVanNassau } alt="Commandeur in de Orde van Oranje-Nassau" />
                    <div className="dossier__tooltip">
                      <p>Commandeur in de Orde van Oranje-Nassau</p>
                    </div>
                  </div>
                }
                { person.awards.kruisVanVerdienste &&
                  <div className="dossier__award">
                    <img src={ kruisVanVerdienste } alt="Kruis van Verdienste" />
                    <div className="dossier__tooltip">
                      <p>Kruis van Verdienste</p>
                    </div>
                  </div>
                }
                { person.awards.ordeNederlandseLeeuw &&
                  <div className="dossier__award">
                    <img src={ ordeNederlandseLeeuw } alt="Ridder in de Orde van de Nederlandse Leeuw" />
                    <div className="dossier__tooltip">
                      <p>Ridder in de Orde van de Nederlandse Leeuw</p>
                    </div>
                  </div>
                }
                { person.awards.MWO4eKL &&
                  <div className="dossier__award">
                    <img src={ MWO4eKL } alt="Ridder in de Militaire Willems-Orde, 4e klasse" />
                    <div className="dossier__tooltip">
                      <p>Ridder in de Militaire Willems-Orde, 4e klasse</p>
                    </div>
                  </div>
                }
                { person.awards.verzetskruis &&
                  <div className="dossier__award">
                    <img src={ verzetskruis } alt="Verzetskruis" />
                    <div className="dossier__tooltip">
                      <p>Verzetskruis</p>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="dossier__passport-filters" ref={ ref => this._filters = ref  }>
              <h4>{ person.name }</h4>

              <button className="dossier__filter-button" id="category" onClick={ (e) => this.toggleFilter(e, 'category', person.category) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Rol in de oorlog</span>
                  <span>{ person.category }</span>
                </div>
              </button>

              <button className="dossier__filter-button" id="profession" onClick={ (e) => this.toggleFilter(e, 'profession', person.profession) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Beroep</span>
                  <span>{ person.profession }</span>
                </div>
              </button>

              <div className="dossier__event">
                <button className="dossier__filter-button" id="causeOfDeath" onClick={ (e) => this.toggleFilter(e, 'causeOfDeath', person.causeOfDeath) }>
                  <svg width="16" height="16" viewBox="0 0 32 32">
                    <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                  </svg>
                  <div className="dossier__filter-text">
                    <span className="dossier__label">Doodsoorzaak</span>
                    <span>{ person.causeOfDeath }</span>
                  </div>
                </button>

                { person.event &&
                  <button className="dossier__event-toggle" onClick={ () => this.props.toggleEvent(person.event) }>i</button>
                }
              </div>

              <button className="dossier__filter-button" id="graveyard" onClick={ (e) => this.toggleFilter(e, 'graveyard', person.graveyard) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Ligt begraven op</span>
                  <span>{ person.graveyard }</span>
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

          <section className="dossier__birthDeath">

            <section className="dossier__birth">
              <h5><img src={star} alt="Geboorte" /> Geboorte</h5>

              <button className="dossier__filter-button" id="birthdate" onClick={ (e) => this.toggleFilter(e, 'birthdate', person.birthdate) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Geboortedatum</span>
                  <span>{ person.birthdate.format('dddd D MMMM YYYY') }</span>
                </div>
              </button>

              <button className="dossier__filter-button" id="birthplace" onClick={ (e) => this.toggleFilter(e, 'birthplace', person.birthplace) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Geboorteplaats</span>
                  <span>{ person.birthplace }</span>
                </div>
              </button>

              <button className="dossier__filter-button" id="birthcountry" onClick={ (e) => this.toggleFilter(e, 'birthcountry', person.birthcountry) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Geboorteland</span>
                  <span>{ person.birthcountry }</span>
                </div>
              </button>
            </section>

            <section className="dossier__death">
              <h5><img src={cross} alt="Overlijden" /> Overlijden</h5>
              <button className="dossier__filter-button" id="dateOfDeath" onClick={ (e) => this.toggleFilter(e, 'dateOfDeath', person.dateOfDeath) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Sterfdatum</span>
                  <span>{ person.dateOfDeath.format('dddd D MMMM YYYY') }</span>
                </div>
              </button>

              <button className="dossier__filter-button" id="placeOfDeath" onClick={ (e) => this.toggleFilter(e, 'placeOfDeath', person.placeOfDeath) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Sterfplaats</span>
                  <span>{ person.placeOfDeath }</span>
                </div>
              </button>

              <button className="dossier__filter-button" id="countryOfDeath" onClick={ (e) => this.toggleFilter(e, 'countryOfDeath', person.countryOfDeath) }>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fillRule="evenodd" d="M16 0l16 16-16 16L0 16"/>
                </svg>
                <div className="dossier__filter-text">
                  <span className="dossier__label">Sterfland</span>
                  <span>{ person.countryOfDeath }</span>
                </div>
              </button>
            </section>
          </section>

          { person.story &&
            <section className="dossier__story">
              <span className="dossier__label">Meer informatie</span>
              <p>{ person.story }</p>
            </section>
          }

        </main>
      </section>
    );
  }
}

export default Dossier;
