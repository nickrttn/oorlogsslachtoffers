// Modules
import React, { Component, PropTypes } from 'react';
import { parse } from 'papaparse';

// Assets
import './Event.css'

class Event extends Component {
  static props = {
    event: PropTypes.string.isRequired,
  }

  state = {
    data: null,
  }

  componentDidMount = () => {
    parse(`${process.env.PUBLIC_URL}/data/gebeurtenissen.csv`, {
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
    const { event } = this.props;
    const data = results.data.find(d => d.gebeurtenis === event);
    this.setState({ data });
  }

  render() {
    const { handleClose } = this.props;
    const { data } = this.state;

    return !data ? null : (
      <section className="event">
        <button className="event__close" onClick={ handleClose }>&times;</button>
        <h2 className="event__title">{ data.titel }</h2>
        <p className="event__story">{ data.verhaal }</p>
      </section>
    );
  }
}

export default Event;
