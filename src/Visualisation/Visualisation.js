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
      age: moment(person.sterftedatum, 'YYYY-MM-DD').diff(moment(person.geboortedatum, 'YYYY-MM-DD'), 'years'),
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
      rank: person.categorie === 'Militair' ? person.rang : false,
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

    // If the filter is already there, remove it instead
    const removeIndex = activeFilters.findIndex(filter => {
      const filterKey = Object.keys(filter)[0];
      return filterKey === key && filter[filterKey] === value;
    });

    if (removeIndex !== -1) {
      activeFilters.splice(removeIndex, 1);
      activeFilters.length > 0 ? this.updateFilters(activeFilters) : this.resetFilter();
      this.setState({ activeFilters });
      return;
    }

    activeFilters.push({ [key]: value });

    this.setState({ activeFilters });
    this.updateFilters(activeFilters);
  }

  sortData = (event, key) => {
    const data = [ ...this.state.data ];

    switch(event.target.value) {
      case('birthdate'):
        data.sort((a, b) => {
          if (a.birthdate.isBefore(b.birthdate)) {
            return -1;
          } else if (a.birthdate.isSame(b.birthdate)) {
            return 0;
          } else if (b.birthdate.isBefore(a.birthdate)) {
            return 1;
          }

          return 0;
        });
        break;
      case('dateOfDeath'):
        data.sort((a, b) => {
          if (a.dateOfDeath.isBefore(b.dateOfDeath)) {
            return -1;
          } else if (a.dateOfDeath.isSame(b.dateOfDeath)) {
            return 0;
          } else if (b.dateOfDeath.isBefore(a.dateOfDeath)) {
            return 1;
          }

          return 0;
        });
        break;
      case('age-ascend'):
        data.sort((a, b) => {
          return a.age - b.age;
        });
        break;
      case('age-descend'):
        data.sort((a, b) => {
          return b.age - a.age;
        });
        break;
      default:
        return;
    }

    this.setState({ data });
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

  resetActivePerson = () => {
    const data = [ ...this.state.data ];
    data.forEach(d => d.active = false);
    this.setState({ activePerson: null, data });
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
          handleSort={ this.sortData }
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
              <Dossier
                activeFilters={ this.state.activeFilters }
                addFilter={ this.addFilter }
                handleClose={ this.resetActivePerson}
                person={ this.state.activePerson } />
            </Sticky>
          }
        </StickyContainer>
      </div>
    );
  }
}

export default Visualisation;
