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
        <image x={ x1 - 18 } y={ y - 6 } height="12" width="13.5" preserveAspectRatio="xMinYMid" xlinkHref={ star } />
        <line className="line" x1={ x1 } x2={ x2 } y1={ y } y2={ y } style={{ opacity: d.active || d.activeInFilter ? 1 : 0.3, strokeWidth: d.active ? 4 : 2, stroke: d.active ? '#fbd477' : '#fff' }} />
        <image x={ x2 + 9 } y={ y - 7 } height="14" width="9.632" preserveAspectRatio="xMinYMid" xlinkHref={ d.monument ? monument : cross } />
      </g>
    );
  }
}

export default Line;
