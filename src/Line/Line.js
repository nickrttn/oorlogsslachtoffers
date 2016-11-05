// Modules
import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

// Assets
import './Line.css';
import star from './svg/star.svg';
import cross from './svg/cross.svg';

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

    return !d.id ? null : (
      <g className="line__group"
        onClick={ () => handleClick(d.id) }
        onMouseOver={ (event) => showTooltip(event, d) }
        onMouseOut={ () => hideTooltip() } >
        <rect className="line__rect" x={ x1 } y={ y - 10 } width={ x2 - x1 } height="20px" />
        <image x={ x1 - 15 } y={ y -5 } height="10" preserveAspectRatio="xMinYMid" xlinkHref={ star } />
          <Motion
            defaultStyle={{ x2: x1 }}
            style={{ x2: spring(x2, {stiffness: 50, damping: 20}) }}>
            { style => <line className="line" x1={ x1 } x2={ style.x2 } y1={ y } y2={ y } />
            }
          </Motion>
        <image x={ x2 + 6 } y={ y - 5 } height="10" preserveAspectRatio="xMinYMid" xlinkHref={ cross } />
      </g>
    );
  }
}

export default Line;
