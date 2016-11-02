import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import Introduction from './Introduction/Introduction';
import Visualisation from './Visualisation/Visualisation';

import 'normalize-css/normalize.css';
import './index.css';

const Root = () => {
  return (
    <BrowserRouter basename="oorlogsslachtoffers">
      <div>
        <Match exactly pattern="/" component={ Introduction } />
        <Match exactly pattern="/visualisatie" component={ Visualisation } />
      </div>
    </BrowserRouter>
  );
}

render(<Root />, document.querySelector('#root'));
