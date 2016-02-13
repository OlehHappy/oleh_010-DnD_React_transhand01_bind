import React from 'react'
import ReactDOM from 'react-dom'

import scatterThings from './prepare'
import App from './App'

scatterThings(); // draw the img

ReactDOM.render(<App/>, document.querySelector('#mount-app'));
