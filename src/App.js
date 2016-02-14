import React from 'react'
import ReactDOM from 'react-dom'
import {CSSTranshand} from 'transhand'
import assign from 'lodash/assign'

function createImg(name) {
  let rootNode = document.querySelector('#stuffs2');

  let img = new Image();
  rootNode.appendChild(img);
  img._handlerTransform = {
    tx: 0, ty: 0,
    sx: 1, sy: 1,
    rz: 0,
    ox: 0.5, oy: 0.5,
  };
  img.style.left = '100px';
  img.style.top = '150px';
  img.style.position = 'absolute';
  img.style.cursor = 'pointer';
  img._handlerDemo = true;
  img.src = `./src/assets/${name}-banner.png`; // take img src
  console.log('we are ther');
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    createImg('test7');

    this.state = {
      currDomElem: undefined
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleSelectClick.bind(this)); // try to change bind
  }

  handleSelectBehindHanler(e) {
    this.handleSelectClick(e, true).bind(this);
  }

  handleSelectClick(e, behindHandler) {
    let domElem = this.elementFromPoint(e.clientX, e.clientY)
    // let domClass = domElem.getAttributeNode("class").value;

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

  handleChange(change) {
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
    let handleChange = this.handleChange.bind(this);
    let handleSelectBehindHanler = this.handleSelectBehindHanler.bind(this);
    let transform = {
      tx: 0, ty: 0,
      sx: 1, sy: 1,
      rz: 0,
      ox: 0.5, oy: 0.5,
    };

    let layerBanner = function() {
      if (currDomElem) {

      return <CSSTranshand
        ref = 'handler'
        deTarget = {currDomElem}
        transform = {currDomElem._handlerTransform}
        onChange = {handleChange}
        grabEvent = {grabEvent}
        onClick = {handleSelectBehindHanler}/>
      }
      else {
        return <div hidden={true}/>
      }
    }

    return (<div>
        {layerBanner()}
      </div>);
  }
}
