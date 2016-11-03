import React, { Component, PropTypes } from 'react';
import './Dossier.css';

//Assets
import diamond from './svg/diamond.svg';

class Dossier extends Component {
  static props = {
    person: PropTypes.object,
  }

  render() {
    const { person } = this.props;

    console.log(person);

    return (
      <section className="dossier">
        <div className="meta">
          <img src="https://cdn1.iconfinder.com/data/icons/photography-outline-2/512/oYPS__human_avatar_portrait_photography_picture_photo-512.png"/>
          <h3>{ person.name }</h3>
          <p className="label"><img className="dossier__image" src={ diamond } /> Beroep</p>
          <p>{ person.profession }</p>
          <p className="label"><img className="dossier__image" src={ diamond } /> Rol in de oorlog</p>
          <p>{ person.category }</p>
          <p className="label"><img className="dossier__image" src={ diamond } /> Doodsoorzaak</p>
          <p>{ person.causeOfDeath }</p>
          <p className="label"><img className="dossier__image" src={ diamond } /> Militaire Rang</p>
          <p>Rang Fourier</p>
        </div>
        <div className="birth">
          <p className="label">Geboortedatum</p>
          <p>{ person.category }</p>
          <p className="label">Geboorteplek</p>
          <p>{ person.birthplace }</p>
          <p className="label">Geboorteland</p>
          <p>{ person.countryOfDeath }</p>
          <p className="label">Ligt begraven op</p>
          <p>Rang Fourier</p>
        </div>
        <div className="death">
          <p className="label">Sterftedatum</p>
          <p>{ person.profession }</p>
          <p className="label">Sterfteplek</p>
          <p>{ person.placeOfDeath }</p>
          <p className="label">Sterteland</p>
          <p>{ person.countryOfDeath }</p>
        </div>

      </section>
    );
  }
}

export default Dossier;
