import React, { Component } from 'react';

import Manipulation from '../Manipulation/Manipulation';
import Lines from '../Lines/Lines';
import Dossier from '../Dossier/Dossier';

import './Visualisation.css';

class Visualisation extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    // Hier data laden, verwerken en de state updaten
  }

  render() {
    return (
      <main className="visualisation">
        <header className="header">
          <h1 className="header__title">Oorlogsgraven in Amsterdam</h1>
        </header>

        { /* In Manipulation zitten filters, sorteeropties en de brush. */ }
        <Manipulation />

        { /* In Lines zit de daadwerkelijke visualisatie. */ }
        <Lines />

        { /* In Dossier zit de aside met persoonsgegevens en filteropties. */ }
        <Dossier />
      </main>
    );
  }
}

export default Visualisation;
