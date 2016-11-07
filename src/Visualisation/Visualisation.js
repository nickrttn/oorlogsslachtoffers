// Modules
import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
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
    filteredData: null,
    activePerson: null,
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
      monument: person.monument === 'Ja' ? true : false,
      category: person.categorie,
      victimType: person.slachtoffer,
      graveyard: person.begraafplaats,
      listOfHonor: person.erelijst === 'Ja' ? true : false ,
      story: person.verhaal ? person.verhaal : false,
    }));

    this.setState({ data });
  }

  removeFilter = (key, value) => {
    const activeFilters = [ ...this.state.activeFilters ];

    const removeIndex = activeFilters.findIndex(filter => {
      const filterKey = Object.keys(filter)[0];
      return filterKey === key && filter[filterKey] === value;
    });

    activeFilters.splice(removeIndex, 1);
    activeFilters.length > 0 ? this.updateFilters(activeFilters) : this.resetFilter();
    this.setState({ activeFilters });
  }

  resetFilter = () => {
    const data = [ ...this.state.data ];
    data.forEach(d => d.activeInFilter = false);
    this.setState({ activeFilters: [], data });
  }

  addFilter = (key, value) => {
    const activeFilters = [ ...this.state.activeFilters ];

    activeFilters.push({ [key]: value });

    this.setState({ activeFilters });
    this.updateFilters(activeFilters);
  }

  sortData = (key) => {

  }

  updateFilters = (activeFilters) => {
    const data = [ ...this.state.data ];

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

    this.setState({ data });
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
        <Manipulation
          activeFilters={ this.state.activeFilters }
          addFilter={ this.addFilter }
          resetFilter={ this.resetFilter }
          removeFilter={ this.removeFilter } />

        <StickyContainer className="visualisation">
          { /* In Lines zit de daadwerkelijke visualisatie. */ }
          <Lines
            data={ this.state.filteredData || this.state.data }
            handleLineClick={ this.setActivePerson }
            dossierActive={ !!this.state.activePerson } />

          { /* In Dossier zit de aside met persoonsgegevens en filteropties. */ }
          { this.state.activePerson &&
            <Sticky stickyStyle={{ left: '60vw' }}>
              <Dossier person={ this.state.activePerson } />
            </Sticky>
          }
        </StickyContainer>
      </div>
    );
  }
}

export default Visualisation;
