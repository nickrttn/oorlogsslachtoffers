// Modules
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// Assets
import './Manipulation.css';
import filterIcon from './svg/filter_icon.svg';
import sortIcon from './svg/sort_icon.svg';

class Manipulation extends Component {
  static props = {
    activeFilters: PropTypes.array.isRequired,
    addFilter: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
    activeSort: PropTypes.string,
    resetFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
  }

  state = {
    filterPanelActive: false,
  }

  toggleFilterPanel = () => {
    this.setState({
      filterPanelActive: !this.state.filterPanelActive,
    });
  }

  renderActiveFilters = () => {
    return !this.props.activeFilters ? null :
    this.props.activeFilters.map((filter, index) => {
      const key = Object.keys(filter)[0];
      return (
        <li className="manipulation__active-filter" key={ `${key}-${index}` }>
          <button onClick={ () => this.props.removeFilter(key, filter[key]) }>
            { moment.isMoment(filter[key]) ? filter[key].format('D MMMM YYYY') : typeof filter[key] === 'boolean' ? 'Ja' : filter[key] }
            <span className="manipulation__active-filter-remove">&times;</span>
          </button>
        </li>
      );
    });
  }

  toggleFilter = (key, value) => {
    this.toggleFilterPanel();
    this.props.addFilter(key, value);
  }

  render() {
    return (
      <section className="manipulation">
        <div className="manipulation__sorting">
          <img src={ sortIcon } className="manipulation__sorting-icon" alt="Sorteren" />
          <select className="sorting__select" defaultValue="birtdate" onInput={ this.props.handleSort }>
            <option value="birthdate">Geboortedatum</option>
            <option value="dateOfDeath">Sterfdatum</option>
            <option value="age-ascend">Jong &rarr; Oud</option>
            <option value="age-descend">Oud &rarr; Jong</option>
          </select>
        </div>

        <div className="manipulation__active-filters">
          <img src={ filterIcon } className="manipulation__active-filters-icon" alt="Sorteren" />
          <ul>
            <li className="manipulation__add-filter">
              <button onClick={ this.toggleFilterPanel }>Filters <span>&#8227;</span></button>
            </li>
            { this.renderActiveFilters() }
            { this.props.activeFilters.length > 0 &&
              <li className="manipulation__active-filters-reset">
                <button onClick={ this.props.resetFilter }>Verwijder alle filters</button>
              </li>
            }
          </ul>
        </div>

        { this.state.filterPanelActive &&
          <section className="manipulation__filters">
            <section className="manipulation__filterbuttons">
              <h4>Begraafplaatsen</h4>
              <button onClick={() => this.toggleFilter('graveyard', 'Buitenveldert')}>Buitenveldert</button>
              <button onClick={() => this.toggleFilter('graveyard', 'Nieuwe Ooster')}>Nieuwe Ooster</button>
              <button onClick={() => this.toggleFilter('graveyard', 'Gem. Begraafplaats Holysloot')}>Begraafplaats Holysloot</button>
              <button onClick={() => this.toggleFilter('graveyard', 'Gem. Begraafplaats Sloten')}>Begraafplaats Sloten</button>
              <button onClick={() => this.toggleFilter('graveyard', 'Huis te Vraag')}>Huis te Vraag</button>
              <button onClick={() => this.toggleFilter('graveyard', 'Noorderbegraafplaats') }>Noorderbegraafplaats</button>
              <button onClick={() => this.toggleFilter('graveyard', 'St. Barbara')}>St. Barbara</button>
              <button onClick={() => this.toggleFilter('graveyard', 'Vredenhof')}>Vredenhof</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Rol in de oorlog</h4>
              <button onClick={() => this.toggleFilter('category', 'Burger')}>Burger</button>
              <button onClick={() => this.toggleFilter('category', 'Gevangene')}>Gevangene</button>
              <button onClick={() => this.toggleFilter('category', 'Militair')}>Militair</button>
              <button onClick={() => this.toggleFilter('category', 'Verzetsstrijder')}>Verzetsstrijder</button>
              <button onClick={() => this.toggleFilter('category', 'Onbekend')}>Onbekend</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Doodsoorzaak</h4>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Aanslag op Rauter')}>Aanslag op Rauter</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Bombardement')}>Bombardement</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Concentratiekamp')}>Concentratiekamp</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Dwangarbeid')}>Dwangarbeid</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Engelandvaarder')}>Engelandvaarder</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Meidagen 1940')}>Meidagen 1940</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Bevrijding')}>Na de bevrijding</button>
              <button onClick={() => this.toggleFilter('causeOfDeath', 'Soesterberg')}>Soesterberg</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Beroep</h4>
              <button onClick={() => this.toggleFilter('profession', 'Bakker')}>Bakker</button>
              <button onClick={() => this.toggleFilter('profession', 'Dienstbode')}>Dienstbode</button>
              <button onClick={() => this.toggleFilter('profession', 'Fabrieksarbeider')}>Fabrieksarbeider</button>
              <button onClick={() => this.toggleFilter('profession', 'Kantoorbediende')}>Kantoorbediende</button>
              <button onClick={() => this.toggleFilter('profession', 'Machine-bankbewerker')}>Machine-bankbewerker</button>
              <button onClick={() => this.toggleFilter('profession', 'Metaal bewerker')}>Metaal bewerker</button>
              <button onClick={() => this.toggleFilter('profession', 'Militair')}>Militair</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Vermelding erelijst</h4>
              <button onClick={() => this.toggleFilter('listOfHonor', true)}>Ja</button>
              <button onClick={() => this.toggleFilter('listOfHonor', false)}>Nee</button>
            </section>
            <button className="manipulation__filterbuttons-close" onClick={ this.toggleFilterPanel }>&times;</button>
          </section>
        }
      </section>
    );
  }
}

export default Manipulation;
