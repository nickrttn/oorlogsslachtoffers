import React, { Component } from 'react';
import { Link } from 'react-router';
import './Introduction.css';

class Introduction extends Component {
  render() {
    return (
      <main className="introduction">
        <p className="introduction__subtitle">Ontdek het verhaal achter de</p>
        <h1 className="introduction__title">Oorlogsgraven <span>in Amsterdam</span></h1>
        <p className="introduction__explanation">In deze visualisatie zie je de levens van 156 personen die gestorven zijn in de Tweede Wereldoorlog. Zij liggen begraven in Amsterdam. Ontdek verschillende verbanden en de verhalen achter deze oorlogsslachtoffers.</p>
        <Link className="button button--introduction" to="/visualisatie">Ontdek</Link>
      </main>
    );
  }
}

export default Introduction;
