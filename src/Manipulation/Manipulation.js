import React, { Component, PropTypes } from 'react';
import './Manipulation.css';

class Manipulation extends Component {
  static props = {
    filterData: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section className="manipulation">
        Hier is te zien welke filters en sorteerfuncties actief zijn.
        <section className="manipulation__filters">
          <div className="manipulation__filterbuttons">
            <h4>Begraafplaatsen</h4>
            <button onClick={() => this.props.filterData('graveyard', 'Nieuwe Ooster')}>Nieuwe Ooster</button>
            <button onClick={() => this.props.filterData('graveyard', 'Vredenhof')}>Vredenhof</button>
            <button onClick={() => this.props.filterData('graveyard', 'Holysloot')}>Holysloot</button>
            <button onClick={() => this.props.filterData('graveyard', 'Noorder begraafplaats') }>Noorder Begraafplaats</button>
            <button onClick={() => this.props.filterData('graveyard', 'Huis te Vraag')}>Huis te Vraag</button>
            <button onClick={() => this.props.filterData('graveyard', 'Buitenveldert')}>Buitenveldert</button>
          </div>
          <button className="reset" onClick={ this.props.resetFilter }>Verwijder filters</button>
        </section>
      </section>
    );
  }
}

export default Manipulation;
