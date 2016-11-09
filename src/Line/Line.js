// Modules
import React, { Component, PropTypes } from 'react';

// Assets
import './Line.css';
import cross from './svg/cross.svg';
import monument from './svg/monument.svg';
import star from './svg/star.svg';

class Line extends Component {
  static proptypes = {
    d: PropTypes.object.isRequired,
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
  }

  render() {
    const {
      d, x1, x2, y,
      handleClick,
      showTooltip,
      hideTooltip
    } = this.props;

    const rectWidth = x2 - x1 > 0 ? (x2 - x1) : 0;

    return !d.id ? null : (
      <g className="line__group"
        onClick={ () => handleClick(d.id) }
        onMouseOver={ (event) => showTooltip(event, d) }
        onMouseOut={ () => hideTooltip() } >
        <rect className="line__rect" x={ x1 } y={ y - 10 } width={ rectWidth } height="20px" />
        <image x={ x1 - 15 } y={ y -5 } height="10" width="11.25px" preserveAspectRatio="xMinYMid" xlinkHref={ star } />
        <line className="line" x1={ x1 } x2={ x2 } y1={ y } y2={ y } style={{ opacity: d.active || d.activeInFilter ? 1 : 0.3, strokeWidth: d.active ? 4 : 2, stroke: d.active ? '#fbd477' : '#fff' }} />
        <image x={ x2 + 6 } y={ y - 5 } height="10" width="6.88px" preserveAspectRatio="xMinYMid" xlinkHref={ d.monument ? monument : cross } />
      </g>
    );
  }
}

export default Line;
