const canvasSketch = require('canvas-sketch');

const colorMap = {
  1: ["black", "black"],
  2: ["#413E4A", "#B38184"  ],
  3: ["#040004", "#C8FF00", "#413D3D"],
  4: ["#BCBCBC", "#424242", "#E9E9E9"],
  5: ["#F7E9B7", "#92AD9F", "#3C6C84"],
  6: ["#FFE181", "#FF9C97","#EEE9E5" ]

}

const settings = {
dimensions: [ 60,60 ],
  pixelsPerInch: 300,
  scaleToView: true,
  playbackRate: "fixed",
  units: 'cm',
  animate: true,
  scaleToView: true,
  playbackRate: 'throttle',
  animate: true,
  fps: 0.5
};

const getRandomInt = (max, min = 0) => min + Math.floor(Math.random() * Math.floor(max));
const isEvenNumber = (num) => Math.floor(num) % 2 === 0
const randomColorScheme = () => colorMap[getRandomInt(Object.keys(colorMap).length, 1)]

// draw an arc on the canvas
const drawArc = (context, colorScheme, cx, cy, radius, sAngle, eAngle) => {
    context.beginPath();
    context.arc(cx, cy, radius, (Math.PI / 180) * sAngle, (Math.PI / 180) * eAngle);
    context.stroke();
    context.strokeStyle = isEvenNumber(cy) ?  colorScheme[0] :colorScheme[1]
    context.lineWidth =   isEvenNumber(cx) ? 0.02 : 0.08;
  }

// there are four segments of 90degrees in a circle
const getRandomSquareSegment = () => getRandomInt(4,0) * 90

const randomizeMissingCircleSegments = (rows, columns) => new Array(rows).fill(0,0,rows).map(() => new Array(columns).fill(0,0,columns).map(getRandomSquareSegment));

const sketch = (context) => {
  let margin = 0.2;
  let radius = 2.5;
  let columns = 10;
  let rows = 10;
  
  let drawingWidth = (columns * (radius * 2 + margin)) - margin;
  let drawingHeight = (rows * (radius * 2 + margin)) - margin;
  let marginLeft = (context.width - drawingWidth) / 2;
  let marginTop = (context.height - drawingHeight) / 2;
  
  return ({ context, width, height, units }) => {
    const colorScheme = randomColorScheme()   
    const startDrawingCircleAngleGrid = randomizeMissingCircleSegments(rows, columns)
    context.fillStyle = colorScheme[2] ?? "white"
    context.fillRect(0, 0, width, height);

    let posX = marginLeft;
    let posY = marginTop;
    for (let r = 0; r < rows; r++) {
    	for (let c = 0; c < columns; c++) {
            let increments = getRandomInt(8, 4); // nr of lines inside the circle
            let step = radius / increments;

            for (let s = 0; s < (increments); s++) {
                // draw a 270degree arc, starting from a random 90degree segment
                drawArc(context, colorScheme, posX + radius, posY + radius, s * step, startDrawingCircleAngleGrid[r][c], startDrawingCircleAngleGrid[r][c] + 270); 
            }
    		posX = posX + (radius * 2) + margin;
    	}
    	posX = marginLeft;
    	posY = posY + radius * 2 + margin;
    }
  };
};

canvasSketch(sketch, settings)