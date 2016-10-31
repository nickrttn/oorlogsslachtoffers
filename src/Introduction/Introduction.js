import React, { Component } from 'react';
import { Link } from 'react-router';
import './Introduction.css';

class Introduction extends Component {
  render() {
    return (
      <main className="introduction">
        <p className="introduction__subtitle">Ontdek het verhaal achter de</p>
        <h1 className="introduction__title"><strong>Oorlogsgraven</strong> in Amsterdam</h1>
        <Link className="button button--introduction" to="/visualisatie">Ontdek</Link>
      </main>
    );
  }
}

export default Introduction;
