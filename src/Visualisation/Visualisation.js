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
    activeFilters: [],
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
    const data = results.data.map(person => ({
      id: parseInt(person.grafnummer, 10),
      active: false,
      activeInFilter: false,
      name: person.naam,
      sex: person.geslacht,
      birthdate: moment(person.geboortedatum, 'YYYY-MM-DD'),
      birthplace: person.geboorteplek,
      birthcountry: person.geboorteland,
      causeOfDeath: person.doodsoorzaak,
      dateOfDeath: moment(person.sterftedatum, 'YYYY-MM-DD'),
      placeOfDeath: person.sterfteplek,
      countryOfDeath: person.sterfteland,
      profession: person.beroep,
      monument: 'Ja' ? true : false,
      category: person.categorie,
      victimType: person.slachtoffer,
      graveyard: person.begraafplaats,
      listOfHonor: person.erelijst,
      story: person.verhaal ? person.verhaal : false,
    }));

    data[0].active = true;
    this.setState({ data, activePerson: data[0] });
  }

  resetFilter = () => {
    const data = [ ...this.state.data ];
    data.forEach(d => d.activeInFilter = false);

    this.setState({ activeFilters: [], data });
  }

  filterData = (key, value) => {
    const data = [ ...this.state.data ];
    const activeFilters = [ ...this.state.activeFilters ];

    activeFilters.push({ [key]: value });

    data.forEach(d => {
      let falseHits = 0;

      activeFilters.forEach(filter => {
        const filterKey = Object.keys(filter)[0];
        if (!d[filterKey].includes(filter[filterKey])) {
          falseHits++;
        }
      });

      d.activeInFilter = falseHits === 0;
    });

    this.setState({ activeFilters, data });
  }

  sortData = (key) => {

  }

  setActivePerson = (id) => {
    const data = [ ...this.state.data ];
    let activePerson = data.find(d => id === d.id);
    const activePersonIndex = data.findIndex(d => id === d.id);

    data.forEach(d => d.active = false);
    data[activePersonIndex].active = true;

    this.setState({ activePerson, data });
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="header__title">Oorlogsgraven in Amsterdam</h1>
        </header>

        { /* In Manipulation zitten filters, sorteeropties en de brush. */ }
        <Manipulation activeFilters={ this.state.activeFilters } filterData={ this.filterData } resetFilter={ this.resetFilter } />

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
