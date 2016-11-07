// Modules
import React, { Component, PropTypes } from 'react';
import { axisBottom, scaleTime, select } from 'd3';
import moment from 'moment';
import 'moment/locale/nl';

// Components
import Legend from '../Legend/Legend';
import Line from '../Line/Line';
import Tooltip from '../Tooltip/Tooltip';

// Assets
import './Lines.css';

class Lines extends Component {
  static props = {
    data: PropTypes.array.isRequired,
    dossierActive: PropTypes.bool.isRequired,
    handleLineClick: PropTypes.func.isRequired,
  }

  state = {
    tooltip: false,
    width: '100%',
  }

  componentDidMount() {
    const bbox = this._visualisation.getBoundingClientRect();

    const xScale = scaleTime()
      .domain([moment('1875-01-01'), moment('1960-01-01')])
      .range([0, bbox.width]);

    const axis = axisBottom(xScale).ticks(15);
    select(this._axis).call(axis);

    console.log('cDM');

    this.setState({ x: xScale, width: bbox.width });
  }

  componentDidUpdate() {
    const { width, x } = this.state;
    const bbox = this._visualisation.getBoundingClientRect();

    if (!(width === bbox.width)) {
      x.range([0, bbox.width]);
      const axis = axisBottom(x).ticks(15);
      select(this._axis).call(axis);
      this.setState({ width: bbox.width, x });
    }
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

  showTooltip = (event, person) => {
    this.setState({
      tooltip: {
        show: true,
        person: {
          name: person.name,
          birth: person.birthdate.format('DD MMMM YYYY'),
          death: person.dateOfDeath.format('DD MMMM YYYY'),
          profession: person.profession,
        },
        position: {
          x: event.nativeEvent.x + 15,
          y: event.nativeEvent.y,
        }
      }
    });
  }

  hideTooltip = () => {
    this.setState({ tooltip: { show: false }});
  }

  render() {
    const { data, dossierActive, handleLineClick } = this.props;
    const { tooltip, x } = this.state;

    return (
      <section className="lines" style={{ maxWidth: dossierActive ? '60vw' : '100vw' }}>
        <Legend />
        <section
          ref={ ref => this._visualisation = ref }
          className="lines__visualisation"
        >
          <svg width="100%" height={ (data.length * 20) + 30 }>
            { data.length > 0 && this.renderWarRect() }
            { data.length > 0 && data.map((d, i) =>
              <Line
                key={ d.id } d={d} i={i} y={ 10 + i * 20 }
                x1={ x(d.birthdate) } x2={ x(d.dateOfDeath) }
                hideTooltip={ this.hideTooltip }
                showTooltip={ this.showTooltip }
                handleClick={ handleLineClick } />
            )}
          </svg>
          <svg className="axis" width='100%' height="50px">
            <g ref={ ref => this._axis = ref }
              transform="translate(0, 10)"></g>
          </svg>

          <Tooltip { ...tooltip } />
        </section>
      </section>
    );
  }
}

export default Lines;
