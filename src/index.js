import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Introduction from './Introduction/Introduction';
import Visualisation from './Visualisation/Visualisation';

import 'normalize-css/normalize.css';
import './index.css';

render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Introduction } />
    <Route path="/visualisatie" component={ Visualisation } />
  </Router>
), document.getElementById('root'));
