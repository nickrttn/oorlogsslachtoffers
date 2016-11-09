// Modules
import React, { Component, PropTypes } from 'react';
import { easeLinear, scaleTime, select } from 'd3';
import moment from 'moment';

// Assets
import './IntroductionAnimation.css';
import victorImg from './images/victor.png';
import star from './images/star.svg';
import cross from './images/cross.svg';

class IntroductionAnimation extends Component {
  static props = {
    victor: PropTypes.object.isRequired,
    handleDone: PropTypes.func.isRequired,
    setVictorActive: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { victor } = this.props;
    const svg = select(this._introAnimation);
    const canvas = this._introAnimation.getBoundingClientRect();

    const x = scaleTime()
      .domain([moment('1875-01-01'), moment('1950-01-01')])
      .range([0, canvas.width]);

    svg.attr('opacity', 1);

    const renderGroup = svg.append('g')
      .attr('class', 'lines')
      .attr('width', canvas.width)
      .attr('height', canvas.height);

    renderGroup.append('image')
      .attr('xlink:href', victorImg)
      .attr('width', 166)
      .attr('height', 229)
      .attr('x', (canvas.width / 2) - (166 / 2))
      .attr('y', 0)
      .attr('opacity', 0)
      .transition()
      .delay(400)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'name')
      .text(victor.name)
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 32)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 40)
      .transition()
      .delay(400)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'label')
      .text('Geboren')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 12)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72)
      .transition()
      .delay(1000)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'info')
      .text('16 december 1877 in ’s Hertogenbosch')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 16)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 24)
      .transition()
      .delay(1000)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('image')
      .attr('xlink:href', star)
      .attr('x', x(victor.birthdate) - 24)
      .attr('width', 16)
      .attr('height', 16)
      .attr('y', -20)
      .transition()
      .delay(200)
      .duration(800)
      .attr('y', canvas.height / 2 - 8);

    renderGroup.append('line')
      .attr('class', 'lifeline')
      .attr('x1', x(victor.birthdate))
      .attr('x2', x(victor.birthdate))
      .attr('y1', canvas.height / 2)
      .attr('y2', canvas.height / 2)
      .attr('opacity', 0)
      .transition()
      .delay(1000)
      .duration(200)
      .attr('opacity', 1)
      .transition()
      .ease(easeLinear)
      .delay(0)
      .duration(4000)
        .attr('x2', x(victor.dateOfDeath));

    renderGroup.append('text')
      .attr('class', 'label')
      .text('Rol in de oorlog')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 12)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56)
      .transition()
      .delay(2200)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'info')
      .text(victor.category)
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 16)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24)
      .transition()
      .delay(2200)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'label')
      .text('Beroep')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 12)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24 + 32)
      .transition()
      .delay(3700)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'info')
      .text(victor.profession)
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 16)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24 + 32 + 24)
      .transition()
      .delay(3700)
      .duration(600)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'label')
      .text('Overleden')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 12)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24 + 32 + 24 + 32)
      .transition()
      .delay(5100)
      .duration(400)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'info')
      .text('5 februari 1945 in Bochum, Duitsland')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 16)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24 + 32 + 24 + 32 + 24)
      .transition()
      .delay(5100)
      .duration(400)
      .attr('opacity', 1);

    renderGroup.append('image')
      .attr('xlink:href', cross)
      .attr('x', x(victor.dateOfDeath) + 8)
      .attr('width', 12)
      .attr('height', 16)
      .attr('y', canvas.height / 2 - 8)
      .attr('opacity', 0)
      .transition()
      .delay(5200)
      .duration(200)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'label')
      .text('Doodsoorzaak')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 12)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24 + 32 + 24 + 32 + 24 + 32)
      .transition()
      .delay(5200)
      .duration(400)
      .attr('opacity', 1);

    renderGroup.append('text')
      .attr('class', 'info')
      .text('Engelandvaarder, in gevangenschap aan de gevolgen van mishandeling overleden')
      .attr('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('font-size', 16)
      .attr('x', (canvas.width / 2) + (166 / 2) + 24)
      .attr('y', 72 + 56 + 24 + 32 + 24 + 32 + 24 + 32 + 24)
      .transition()
      .delay(5200)
      .duration(400)
      .attr('opacity', 1);

    svg.transition()
      .delay(6300)
      .duration(1200)
      .attr('opacity', 0)

    setTimeout(() => this.props.setVictorActive(victor.id), 7500);
    setTimeout(() => this.props.handleDone(), 7500);
  }

  render() {
    return (
      <svg ref={ ref => this._introAnimation = ref } className="introduction-animation"></svg>
    );
  }
}

export default IntroductionAnimation;
