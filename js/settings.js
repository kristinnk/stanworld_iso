var config = {
    context: {
        main: null,
        renderMap: null,
    },
    canvas: {
        main: null,
        renderedMap: null,
    }
}


config.canvas.main = document.getElementById("g");
config.canvas.main.getContext('2d').webkitImageSmoothingEnabled = false;
config.canvas.main.getContext('2d').oImageSmoothingEnabled = false;
config.canvas.main.getContext('2d').mozImageSmoothingEnabled = false;
config.canvas.main.getContext('2d').imageSmoothingEnabled = false;
var ctx = config.canvas.main.getContext("2d");

var firstRun = true;

var cx = 0; // tile index coordinates
var cy = 0;

var menuArt = new Image();
menuArt.src = "img/menuart.png";

var baseTile = new Image();
baseTile.src = "img/base_tile.png";

var waterTile = new Image();
waterTile.src = "img/water_tile.png";

var grassTile = new Image();
grassTile.src = "img/grass_tile.png";

var foliageTile = new Image();
foliageTile.src = "img/foliage.png";

var structureTile = new Image();
structureTile.src = "img/structures.png";

var sunCycle = new Image();
sunCycle.src = "img/sun.png";

var citizenImage = new Image();
citizenImage.src = "img/citizen.png";


var tmpImage = null;
var mousePos = null;
var map = null;
var foliageMap = null;
var townMap = null;
var citizenList = [];

var time = {
    count: 0,
    trigger: 50,
    frame: 0
}


var renderedMapCanvas = document.createElement('canvas');
renderedMapCanvas.width = 5000;
renderedMapCanvas.height = 5000;
renderedMapCanvas.getContext('2d').webkitImageSmoothingEnabled = false;
renderedMapCanvas.getContext('2d').oImageSmoothingEnabled = false;
renderedMapCanvas.getContext('2d').mozImageSmoothingEnabled = false;
renderedMapCanvas.getContext('2d').imageSmoothingEnabled = false;
var renderedMapCtx = renderedMapCanvas.getContext("2d");

var camera = {
  x: 2000,
  y: 1600,
}

var mousePos = null;
var townName = "";

var bars = {
    minValue: 0,
    maxValue: 10,
    infrastructure: {
        x: config.canvas.main.width - 180,
        y: 144,
        width: 160,
        height: 20,
        value: 22,
    },
    agriculture: {
        x: config.canvas.main.width - 180,
        y: 194,
        width: 160,
        height: 20,
        value: 50,
    },
    defences: {
        x: config.canvas.main.width - 180,
        y: 244,
        width: 160,
        height: 20,
        value: 100,
    }
}


var gameStats = {
    adminPoints: 0,
    gold: 0,
    food: 10,
    population: 1,
    opinion: 100,
}

var mousePointCTarget = {
    x: 0,
    y: 0,
}