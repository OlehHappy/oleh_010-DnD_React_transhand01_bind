export default function scatterThings() {
  let rootNode = document.querySelector('#stuffs');

  let img = new Image();
  rootNode.appendChild(img);
  img._handlerTransform = {
    tx: 0, ty: 0,
    sx: 1, sy: 1,
    rz: 0,
    ox: 0.5, oy: 0.5,
  };
  img.style.left = '10px';
  img.style.top = '150px';
  img.style.position = 'absolute';
  img.style.cursor = 'pointer';
  img._handlerDemo = true;
  img.src = './src/assets/obj_cookiejar001.png'; // take img src
}
