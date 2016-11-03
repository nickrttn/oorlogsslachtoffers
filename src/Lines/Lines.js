// Modules
import React, { Component, PropTypes } from 'react';
import { axisBottom, scaleTime, select } from 'd3';
import moment from 'moment';

// Components
import Legend from '../Legend/Legend';

// Assets
import './Lines.css';
// import star from './svg/star.svg';
// import cross from './svg/cross.svg';
// import monument from './svg/monument.svg';

class Lines extends Component {
  static props = {
    data: PropTypes.array.isRequired,
    handleLineClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const bbox = this._visualisation.getBoundingClientRect();

    const xScale = scaleTime()
      .domain([moment('1875-01-01'), moment('1960-01-01')])
      .range([0, bbox.width]);

    const axis = axisBottom(xScale).ticks(15);
    select(this._axis).call(axis);

    this.setState({ x: xScale });
  }

  renderLine = (d, i) => {
    const { x } = this.state;

    return (
      <line key={ d.id }
        id={ d.id }
        x1={ x(d.birthdate) }
        x2={ x(d.dateOfDeath) }
        y1={ 5 + (i * 12) }
        y2={ 5 + (i * 12) }
        stroke="white"
        strokeWidth="1"
      />
    );
  }

  renderWarRect = () => {
    const { x } = this.state;
    const war = {
      start: moment('1939-09-01'),
      end: moment('1945-09-02')
    }

    return <rect
      className="war"
      x={ x(war.start) }
      y="0"
      width={ x(war.end) - x(war.start) }
      height="100%"
    />
  }

  render() {
    const { data } = this.props;

    return (
      <section className="lines">
        <Legend />
        <section
          ref={ ref => this._visualisation = ref }
          className="lines__visualisation"
        >
          <svg width="100%" height={ (data.length * 12) + 30 }>
            { data.length > 0 && this.renderWarRect() }
            { data.length > 0 && data.map((d, i) =>
              <Line key={ d.id } x={ this.state.x } d={d} i={i} handleClick={ this.props.handleLineClick } />
            )}
          </svg>
          <svg className="axis" width='78vw' height="50px">
            <g ref={ ref => this._axis = ref }
              transform="translate(0, 10)"></g>
          </svg>
        </section>
      </section>
    );
  }
}

export default Lines;

const Line = (props) => (
  <g>
    <rect
      x={ props.x(props.d.birthdate) }
      y={ 5 + (props.i * 12) - 6 }
      width={ props.x(props.d.dateOfDeath) - props.x(props.d.birthdate) }
      height="12px"
      fill="transparent"
      onClick={ () => props.handleClick(props.d.id) }
    />
    <line
        className="lines__line"
        x1={ props.x(props.d.birthdate) }
        x2={ props.x(props.d.dateOfDeath) }
        y1={ 5 + (props.i * 12) }
        y2={ 5 + (props.i * 12) }
    />
  </g>
)
