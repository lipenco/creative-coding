const canvasSketch = require('canvas-sketch');

const colorMap = {
  // 1: ["black", "black"],
  1:  ["#BCBCBC", "#424242", "#E9E9E9"],
  2: ["#413E4A", "#B38184" , "black" ],
  3: ["#040004", "#C8FF00", "#413D3D"],
  4: ["#BCBCBC", "#424242", "#E9E9E9"],
  5: ["#F7E9B7", "#92AD9F", "#3C6C84"],
  6: ["#FFE181", "#FF9C97","#EEE9E5" ],
  7:[ "#49708A", "#88ABC2", "#EBF7F8"],
  8: ["#FC9D9A", "#F9CDAD", "#FE4365"]

}

const settings = {
dimensions: [ 60,120 ],
  pixelsPerInch: 300,
  scaleToView: true,
  playbackRate: "fixed",
  units: 'cm',
  animate: true,
  scaleToView: true,
  playbackRate: 'throttle',
  fps: 0.5
};

const getRandomInt = (max, min = 0) => min + Math.floor(Math.random() * Math.floor(max));
const isEvenNumber = (num) => Math.floor(num) % 2 === 0
const randomColorScheme = () => colorMap[getRandomInt(Object.keys(colorMap).length, 1)]

const columns = 25;
const rows = 25;

const sketch = (context) => {


  return ({ context, width, height, units }) => {
    const colorScheme = randomColorScheme()   
    context.fillStyle =  "black"
    context.fillRect(0, 0, width, height);

    for (let r = 0; r < rows; r++) {

    	for (let c = 0; c < columns; c++) {
        context.fillStyle = isEvenNumber(c) ? colorScheme[2]?? colorScheme[0] : colorScheme[1]
        context.fillRect(+ ( c * 3),  + (  c * 3), getRandomInt(60,10) ,getRandomInt(130,10) );
    }


  };
};
}

canvasSketch(sketch, settings)