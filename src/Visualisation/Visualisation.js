// Modules
import React, { Component } from 'react';
import { parse } from 'papaparse';
import moment from 'moment';
import 'moment/locale/nl';

// Components
import Manipulation from '../Manipulation/Manipulation';
import Lines from '../Lines/Lines';
import Dossier from '../Dossier/Dossier';

// Assets
import './Visualisation.css';

class Visualisation extends Component {
  state = {
    data: [],
    activePerson: {},
  }

  componentDidMount() {
    // Hier data laden, verwerken en de state updaten
    parse(`${process.env.PUBLIC_URL}/data/oorlogsslachtoffers.csv`, {
      header: true,
      complete: this.handleResults,
      download: true,
    });
  }

  handleResults = (results) => {
    results.errors.length > 0 ?
      this.reportErrors(results) :
      this.dataCleanup(results);
  }

  reportErrors = (results) => {
    results.errors.forEach(error => console.error(error));

    this.setState({
      errors: results.errors,
    });
  }

  dataCleanup = (results) => {
    // DEVELOPMENT PURPOSES ONLY, REMOVE BEFORE PRODUCTION
    // console.log("Parsing complete:", results);

    const data = results.data.map(person => ({
      id: parseInt(person.grafnummer, 10),
      name: person.naam,
      sex: person.geslacht,
      birthdate: moment(person.geboortedatum, 'YYYY-MM-DD'),
      birthplace: person.geboorteplek,
      birthcountry: person.geboorteland,
      dateOfDeath: moment(person.sterftedatum, 'YYYY-MM-DD'),
      placeOfDeath: person.sterfteplek,
      countryOfDeath: person.sterfteland,
      profession: person.beroep,
      monument: 'Ja' ? true : false,
      category: person.categorie,
      victimType: person.slachtoffer,
      causeOfDeath: person.doodsoorzaak,
      graveyard: person.begraafplaats,
      story: person.verhaal ? person.verhaal : false,
    }));

    this.setState({ data });
  }

  setActivePerson = (id) => {
    const activePerson = this.state.data.find(d => d.id === id);
    this.setState({ activePerson });
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="header__title">Oorlogsgraven in Amsterdam</h1>
        </header>

        { /* In Manipulation zitten filters, sorteeropties en de brush. */ }
        <Manipulation />

        <main className="visualisation">
          { /* In Lines zit de daadwerkelijke visualisatie. */ }
          <Lines data={ this.state.data } handleLineClick={ this.setActivePerson } />

          { /* In Dossier zit de aside met persoonsgegevens en filteropties. */ }
          <Dossier person={ this.state.activePerson } />
        </main>
      </div>
    );
  }
}

export default Visualisation;
