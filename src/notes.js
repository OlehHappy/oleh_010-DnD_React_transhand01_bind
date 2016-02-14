<img
  src="./src/assets/obj_cookiejar001.png"
  className="pbc-preview-layer-banner"
  _handlerTransform = {hTrans}
  _handlerDemo = "true" />


  const myImg = document.createElement('img');
  document.body.appendChild(myImg);
  myImg.src = './src/assets/test7-banner.png';
  myImg.style.left = '100px';
  myImg.style.top = '150px';
  myImg.style.position = 'absolute';
  myImg.style.cursor = 'pointer';
  myImg._handlerDemo = true;
  myImg._handlerTransform = {
    tx: 0, ty: 0,
    sx: 1, sy: 1,
    rz: 0,
    ox: 0.5, oy: 0.5,
  };

  createImg() {
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
    img.src = './src/assets/test7-banner.png'; // take img src
  }
