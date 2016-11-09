// Modules
import React, { Component, PropTypes } from 'react';
import { StaggeredMotion, spring } from 'react-motion';
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

  getEndPositions = () => {
    const { data } = this.props;
    const { x } = this.state;
    return data.map(d => ({ x2: spring(x(d.dateOfDeath)) }))
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
            { data.length > 0 &&
              <StaggeredMotion
                defaultStyles={ data.map(d => ({ percent: x(d.birthdate) / x(d.dateOfDeath) })) }
                styles={ (previousStyles) => previousStyles.map((prev, i) => {
                  if (i === 0) {
                    return { percent: spring(1) }
                  } else {
                    const lastLinePreviousPercent = previousStyles[i - 1].percent;
                    const thisLinePreviousPercent = previousStyles[i].percent;
                    return { percent: lastLinePreviousPercent > 0.7 ? spring(1, { stiffness: 200, damping: 20 }) : spring(thisLinePreviousPercent) }
                  }
                }) }
              >
                { interpolatingStyles =>
                  <g>
                  { interpolatingStyles.map((style, i) =>
                    <Line
                      key={ data[i].id } d={ data[i] } i={ i } y={ 10 + i * 20 }
                      x1={ x(data[i].birthdate) } x2={ x(data[i].dateOfDeath) * style.percent }
                      hideTooltip={ this.hideTooltip }
                      showTooltip={ this.showTooltip }
                      handleClick={ handleLineClick } />
                  )}
                  </g>
                }
              </StaggeredMotion>
            }
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
