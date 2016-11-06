import React, { Component, PropTypes } from 'react';
import './Manipulation.css';

class Manipulation extends Component {
  static props = {
    activeFilters: PropTypes.array.isRequired,
    filterData: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
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
    this.props.activeFilters.map((filter, index) => (
      <li key={ `${filter}-${index}` }>{ filter }</li>
    ));
  }

  render() {
    return (
      <section className="manipulation">
        <div className="activeFilters">
          <p>Filter op</p>
          <ul className="activeFilters">
            { this.renderActiveFilters() }
            <li className="addFilter">
              <button onClick={ this.toggleFilterPanel }>Filter toevoegen</button>
            </li>
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
              <button onClick={() => this.props.filterData('graveyard', 'Buitenveldert')}>Buitenveldert</button>
              <button onClick={() => this.props.filterData('graveyard', 'Nieuwe Ooster')}>Nieuwe Ooster</button>
              <button onClick={() => this.props.filterData('graveyard', 'Gem. Begraafplaats Holysloot')}>Begraafplaats Holysloot</button>
              <button onClick={() => this.props.filterData('graveyard', 'Gem. Begraafplaats Sloten')}>Begraafplaats Sloten</button>
              <button onClick={() => this.props.filterData('graveyard', 'Huis te Vraag')}>Huis te Vraag</button>
              <button onClick={() => this.props.filterData('graveyard', 'Noorderbegraafplaats') }>Noorderbegraafplaats</button>
              <button onClick={() => this.props.filterData('graveyard', 'St. Barbara')}>St. Barbara</button>
              <button onClick={() => this.props.filterData('graveyard', 'Vredenhof')}>Vredenhof</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Rol in de oorlog</h4>
              <button onClick={() => this.props.filterData('category', 'Burger')}>Burger</button>
              <button onClick={() => this.props.filterData('category', 'Gevangene')}>Gevangene</button>
              <button onClick={() => this.props.filterData('category', 'Militair')}>Militair</button>
              <button onClick={() => this.props.filterData('category', 'Verzetsstrijder')}>Verzetsstrijder</button>
              <button onClick={() => this.props.filterData('category', 'Onbekend')}>Onbekend</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Doodsoorzaak</h4>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Aanslag op Rauter')}>Aanslag op Rauter</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Bombardement')}>Bombardement</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Concentratiekamp')}>Concentratiekamp</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Dwangarbeid')}>Dwangarbeid</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Engelandvaarder')}>Engelandvaarder</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Meidagen 1940')}>Meidagen 1940</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Bevrijding')}>Na de bevrijding</button>
              <button onClick={() => this.props.filterData('causeOfDeath', 'Soesterberg')}>Soesterberg</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Beroep</h4>
              <button onClick={() => this.props.filterData('profession', 'Bakker')}>Bakker</button>
              <button onClick={() => this.props.filterData('profession', 'Dienstbode')}>Dienstbode</button>
              <button onClick={() => this.props.filterData('profession', 'Fabrieksarbeider')}>Fabrieksarbeider</button>
              <button onClick={() => this.props.filterData('profession', 'Kantoorbediende')}>Kantoorbediende</button>
              <button onClick={() => this.props.filterData('profession', 'Machine-bankbewerker')}>Machine-bankbewerker</button>
              <button onClick={() => this.props.filterData('profession', 'Metaal bewerker')}>Metaal bewerker</button>
              <button onClick={() => this.props.filterData('profession', 'Militair')}>Militair</button>
            </section>
            <section className="manipulation__filterbuttons">
              <h4>Vermelding erelijst</h4>
              <button onClick={() => this.props.filterData('listOfHonor', 'Ja')}>Ja</button>
              <button onClick={() => this.props.filterData('listOfHonor', 'Nee')}>Nee</button>
            </section>
            <button className="close" onClick={ this.toggleFilterPanel }>&times; Filters sluiten</button>
          </section>
        }
      </section>
    );
  }
}

export default Manipulation;
