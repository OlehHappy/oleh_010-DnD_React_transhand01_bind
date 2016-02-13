import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTranshand} from 'transhand';
import assign from 'lodash/assign';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currDomElem: undefined,  //set by default
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleSelectClick);
  }

  handleSelectBehindHanler = (e) => {
    this.handleSelectClick(e, true)
  }

  handleSelectClick = (e, behindHandler) => {
    var domElem = this.elementFromPoint(e.clientX, e.clientY)

    if (domElem && domElem._handlerDemo) {
      this.setState({
        currDomElem: domElem,
        grabEvent: !behindHandler && e
      })
    }
    else {
      this.setState({currDomElem: undefined})
    }
  }

  elementFromPoint(x, y) {
    let deHandler = ReactDOM.findDOMNode(this.refs.handler);
    var deTarget
    // let get = () => deTarget = '<img src="./src/assets/obj_tv001.png" style="left: 5px; top: 5px; position: absolute; cursor: pointer;">';
      // <img src="./src/assets/obj_tv001.png" style="left: 43px; top: 75px; position: absolute; cursor: pointer;">
    let get = () => deTarget = document.elementFromPoint(x, y);

    if (deHandler) {
      let save = deHandler.style.display
      deHandler.style.display = 'none'
      get()
      deHandler.style.display = save
    }
    else {
      get()
    }

    return deTarget;
  }

  handleChange = (change) => {
    // console.log('change event:', change)

    let { currDomElem } = this.state,
        transform = currDomElem._handlerTransform

    assign(transform, change)

    currDomElem.style.transform = this.generateCssTransform(transform)
    currDomElem.style.transformOrigin = `${transform.ox*100}% ${transform.oy*100}%`

    this.forceUpdate()
  }

  generateCssTransform(transform) {
    let cssTransform = '';

    cssTransform += ' translateX(' + transform.tx + 'px)';
    cssTransform += ' translateY(' + transform.ty + 'px)';
    cssTransform += ' rotate(' + transform.rz + 'rad)';
    cssTransform += ' scaleX(' + transform.sx + ')';
    cssTransform += ' scaleY(' + transform.sy + ')';

    return cssTransform;
  }

  render() {
    let {currDomElem, grabEvent} = this.state;

    if (currDomElem) {

      return <CSSTranshand
        ref = 'handler'
        deTarget = {currDomElem}
        transform = {currDomElem._handlerTransform}
        onChange = {this.handleChange}
        grabEvent = {grabEvent}
        onClick = {this.handleSelectBehindHanler}/>
    }
    else {
      return <div hidden={true}/>
    }
  }
}
