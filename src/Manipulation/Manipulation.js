import React, { Component, PropTypes } from 'react';
import './Manipulation.css';

class Manipulation extends Component {
  static props = {
    activeFilters: PropTypes.array.isRequired,
    addFilter: PropTypes.func.isRequired,
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
        <li key={ `${key}-${index}` }>
          { filter[key] } <button className="remove" onClick={ () => this.props.removeFilter(key, filter[key]) }>&times;</button>
        </li>
      );
    });
  }

  render() {
    return (
      <section className="manipulation">
        <div className="activeFilters">
          <p>Filter op</p>
          <ul className="activeFilters">
            <li className="addFilter">
              <button onClick={ this.toggleFilterPanel }>Filter toevoegen</button>
            </li>
            { this.renderActiveFilters() }
            { this.props.activeFilters.length > 0 &&
              <li className="resetFilters">
                <button className="reset" onClick={ this.props.resetFilter }>Verwijder alle filters</button>
              </li>
            }
          </ul>
        </div>

        { this.state.filterPanelActive &&
          <section className="manipulation__filters">
            <section className="manipulation__filterbuttons">
              <h4>Begraafplaatsen</h4>
              <button onClick={() => this.props.addFilter('graveyard', 'Buitenveldert')}>Buitenveldert</button>
              <button onClick={() => this.props.addFilter('graveyard', 'Nieuwe Ooster')}>Nieuwe Ooster</button>
              <button onClick={() => this.props.addFilter('graveyard', 'Gem. Begraafplaats Holysloot')}>Begraafplaats Holysloot</button>
              <button onClick={() => this.props.addFilter('graveyard', 'Gem. Begraafplaats Sloten')}>Begraafplaats Sloten</button>
              <button onClick={() => this.props.addFilter('graveyard', 'Huis te Vraag')}>Huis te Vraag</button>
              <button onClick={() => this.props.addFilter('graveyard', 'Noorderbegraafplaats') }>Noorderbegraafplaats</button>
              <button onClick={() => this.props.addFilter('graveyard', 'St. Barbara')}>St. Barbara</button>
              <button onClick={() => this.props.addFilter('graveyard', 'Vredenhof')}>Vredenhof</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Rol in de oorlog</h4>
              <button onClick={() => this.props.addFilter('category', 'Burger')}>Burger</button>
              <button onClick={() => this.props.addFilter('category', 'Gevangene')}>Gevangene</button>
              <button onClick={() => this.props.addFilter('category', 'Militair')}>Militair</button>
              <button onClick={() => this.props.addFilter('category', 'Verzetsstrijder')}>Verzetsstrijder</button>
              <button onClick={() => this.props.addFilter('category', 'Onbekend')}>Onbekend</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Doodsoorzaak</h4>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Aanslag op Rauter')}>Aanslag op Rauter</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Bombardement')}>Bombardement</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Concentratiekamp')}>Concentratiekamp</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Dwangarbeid')}>Dwangarbeid</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Engelandvaarder')}>Engelandvaarder</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Meidagen 1940')}>Meidagen 1940</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Bevrijding')}>Na de bevrijding</button>
              <button onClick={() => this.props.addFilter('causeOfDeath', 'Soesterberg')}>Soesterberg</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Beroep</h4>
              <button onClick={() => this.props.addFilter('profession', 'Bakker')}>Bakker</button>
              <button onClick={() => this.props.addFilter('profession', 'Dienstbode')}>Dienstbode</button>
              <button onClick={() => this.props.addFilter('profession', 'Fabrieksarbeider')}>Fabrieksarbeider</button>
              <button onClick={() => this.props.addFilter('profession', 'Kantoorbediende')}>Kantoorbediende</button>
              <button onClick={() => this.props.addFilter('profession', 'Machine-bankbewerker')}>Machine-bankbewerker</button>
              <button onClick={() => this.props.addFilter('profession', 'Metaal bewerker')}>Metaal bewerker</button>
              <button onClick={() => this.props.addFilter('profession', 'Militair')}>Militair</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Vermelding erelijst</h4>
              <button onClick={() => this.props.addFilter('listOfHonor', 'Ja')}>Ja</button>
              <button onClick={() => this.props.addFilter('listOfHonor', 'Nee')}>Nee</button>
            </section>
            <button className="close" onClick={ this.toggleFilterPanel }>&times; Sluiten</button>
          </section>
        }
      </section>
    );
  }
}

export default Manipulation;
