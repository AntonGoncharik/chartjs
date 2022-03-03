(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/chart/base.ts":
/*!***************************!*\
  !*** ./src/chart/base.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base = void 0;
class Base {
    constructor(drawer, data) {
        this.drawer = drawer;
        this.data = data;
        this.dynamicData = { x: [...data.x], y: [...data.y] };
        this.setInitialValues();
    }
    setInitialValues() {
        this.minX = Math.min(...this.dynamicData.x);
        this.maxX = Math.max(...this.dynamicData.x);
        this.countX = this.dynamicData.x.length;
        this.stepX = Math.ceil((this.maxX - this.minX) / this.countX);
        this.ratioX = (this.stepX * this.countX) / this.drawer.width;
        this.minY = Math.min(...this.dynamicData.y);
        this.maxY = Math.max(...this.dynamicData.y);
        this.countY = this.dynamicData.y.length;
        this.stepY = Math.ceil((this.maxY - this.minY) / this.countY);
        this.ratioY = (this.stepY * this.countY) / this.drawer.height;
        return this;
    }
    render() {
        this.clear();
        this.renderGraph();
        return this;
    }
    clear() {
        this.drawer.clear();
        return this;
    }
    renderGraph() {
        let endIndex = 1;
        for (let startIndex = 0; startIndex < this.countX; startIndex++) {
            const xStart = this.dynamicData.x[startIndex];
            const yStart = this.dynamicData.y[startIndex];
            const xEnd = this.dynamicData.x[endIndex];
            const yEnd = this.dynamicData.y[endIndex];
            endIndex++;
            this.drawer.line(Math.ceil((xStart - this.minX) / this.ratioX), this.drawer.height - Math.ceil((yStart - this.minY) / this.ratioY), Math.ceil((xEnd - this.minX) / this.ratioX), this.drawer.height - Math.ceil((yEnd - this.minY) / this.ratioY));
        }
        return this;
    }
}
exports.Base = Base;


/***/ }),

/***/ "./src/chart/detailed.ts":
/*!*******************************!*\
  !*** ./src/chart/detailed.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Detailed = void 0;
const base_1 = __webpack_require__(/*! ./base */ "./src/chart/base.ts");
class Detailed extends base_1.Base {
    render() {
        super.render();
        this.renderXAxis().renderYAxis();
        return this;
    }
    renderXAxis() {
        for (let index = 1; index <= this.countX; index++) {
            this.drawer.line((index * this.stepX) / this.ratioX, this.drawer.height, (index * this.stepX) / this.ratioX, this.drawer.height - 4);
            if (index === this.countX) {
                this.drawer.label(`${this.maxX}`, (index * this.stepX) / this.ratioX, this.drawer.height - 12);
            }
        }
        return this;
    }
    renderYAxis() {
        for (let index = 1; index <= this.countY; index++) {
            this.drawer.line(0, this.drawer.height - (index * this.stepY) / this.ratioY, 4, this.drawer.height - (index * this.stepY) / this.ratioY);
            if (index === this.countY) {
                this.drawer.label(`${this.maxY}`, 12, 0);
            }
        }
        return this;
    }
    update(leftIndex, rightIndex) {
        this.dynamicData.x = this.data.x.slice(leftIndex, rightIndex);
        this.dynamicData.y = this.data.y.slice(leftIndex, rightIndex);
        this.setInitialValues().render();
        return this;
    }
}
exports.Detailed = Detailed;


/***/ }),

/***/ "./src/chart/index.ts":
/*!****************************!*\
  !*** ./src/chart/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chart = void 0;
const drawer_1 = __webpack_require__(/*! ../drawer */ "./src/drawer/index.ts");
const detailed_1 = __webpack_require__(/*! ./detailed */ "./src/chart/detailed.ts");
const slider_1 = __webpack_require__(/*! ./slider */ "./src/chart/slider.ts");
class Chart {
    constructor(chartId, data) {
        const root = document.getElementById(chartId);
        if (!root) {
            throw new Error('DIV with id="chart" is not found');
        }
        root.innerHTML = this.getTemplate();
        const ctxDetailed = (document.getElementById('detailed').getContext('2d'));
        const ctxSlider = (document.getElementById('slider').getContext('2d'));
        this.update = this.update.bind(this);
        this.detailed = new detailed_1.Detailed(new drawer_1.Drawer(ctxDetailed), data);
        this.slider = new slider_1.Slider(new drawer_1.Drawer(ctxSlider), data, this.update);
    }
    getTemplate() {
        return `
      <canvas id="detailed" width="768" height="432"></canvas>
      <canvas id="slider" width="768" height="48"></canvas>
        <div id="range" data-type-shift="shift">
          <img data-type-shift="left" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAyMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kZCkiPgogIDxyZWN0IHg9IjQuOTQ2MjkiIHk9IjEuOTk5NTEiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyNSIgcng9IjciIGZpbGw9IndoaXRlIi8+CiAgPC9nPgogIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTEwLjk0NjMgMTAuNDk5NUMxMC45NDYzIDEwLjIyMzQgMTAuNzIyNCA5Ljk5OTUxIDEwLjQ0NjMgOS45OTk1MUMxMC4xNzAxIDkuOTk5NTEgOS45NDYyOSAxMC4yMjM0IDkuOTQ2MjkgMTAuNDk5NVYxOC41MDA3QzkuOTQ2MjkgMTguNzc2OSAxMC4xNzAxIDE5LjAwMDcgMTAuNDQ2MyAxOS4wMDA3QzEwLjcyMjQgMTkuMDAwNyAxMC45NDYzIDE4Ljc3NjkgMTAuOTQ2MyAxOC41MDA3VjEwLjQ5OTVaTTEzLjk0NjMgMTAuNDk5NUMxMy45NDYzIDEwLjIyMzQgMTMuNzIyNCA5Ljk5OTUxIDEzLjQ0NjMgOS45OTk1MUMxMy4xNzAxIDkuOTk5NTEgMTIuOTQ2MyAxMC4yMjM0IDEyLjk0NjMgMTAuNDk5NVYxOC41MDA3QzEyLjk0NjMgMTguNzc2OSAxMy4xNzAxIDE5LjAwMDcgMTMuNDQ2MyAxOS4wMDA3QzEzLjcyMjQgMTkuMDAwNyAxMy45NDYzIDE4Ljc3NjkgMTMuOTQ2MyAxOC41MDA3VjEwLjQ5OTVaIiBmaWxsPSIjQTZCMEMzIi8+CiAgPGRlZnM+CiAgPGZpbHRlciBpZD0iZmlsdGVyMF9kZCIgeD0iMC45NDYyODkiIHk9Ii0wLjAwMDQ4ODI4MSIgd2lkdGg9IjIyIiBoZWlnaHQ9IjMzIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KICA8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgogIDxmZU9mZnNldCBkeT0iMiIvPgogIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjM0NTA5OCAwIDAgMCAwIDAuNCAwIDAgMCAwIDAuNDk0MTE4IDAgMCAwIDAuMTIgMCIvPgogIDxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CiAgPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KICA8ZmVPZmZzZXQgZHk9IjEiLz4KICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIwLjUiLz4KICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjM0NTA5OCAwIDAgMCAwIDAuNCAwIDAgMCAwIDAuNDk0MTE4IDAgMCAwIDAuMTIgMCIvPgogIDxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0iZWZmZWN0Ml9kcm9wU2hhZG93Ii8+CiAgPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QyX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KICA8L2ZpbHRlcj4KICA8L2RlZnM+Cjwvc3ZnPgo="/>
          <img data-type-shift="right" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAyMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kZCkiPgogIDxyZWN0IHg9IjQuOTQ2MjkiIHk9IjEuOTk5NTEiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyNSIgcng9IjciIGZpbGw9IndoaXRlIi8+CiAgPC9nPgogIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTEwLjk0NjMgMTAuNDk5NUMxMC45NDYzIDEwLjIyMzQgMTAuNzIyNCA5Ljk5OTUxIDEwLjQ0NjMgOS45OTk1MUMxMC4xNzAxIDkuOTk5NTEgOS45NDYyOSAxMC4yMjM0IDkuOTQ2MjkgMTAuNDk5NVYxOC41MDA3QzkuOTQ2MjkgMTguNzc2OSAxMC4xNzAxIDE5LjAwMDcgMTAuNDQ2MyAxOS4wMDA3QzEwLjcyMjQgMTkuMDAwNyAxMC45NDYzIDE4Ljc3NjkgMTAuOTQ2MyAxOC41MDA3VjEwLjQ5OTVaTTEzLjk0NjMgMTAuNDk5NUMxMy45NDYzIDEwLjIyMzQgMTMuNzIyNCA5Ljk5OTUxIDEzLjQ0NjMgOS45OTk1MUMxMy4xNzAxIDkuOTk5NTEgMTIuOTQ2MyAxMC4yMjM0IDEyLjk0NjMgMTAuNDk5NVYxOC41MDA3QzEyLjk0NjMgMTguNzc2OSAxMy4xNzAxIDE5LjAwMDcgMTMuNDQ2MyAxOS4wMDA3QzEzLjcyMjQgMTkuMDAwNyAxMy45NDYzIDE4Ljc3NjkgMTMuOTQ2MyAxOC41MDA3VjEwLjQ5OTVaIiBmaWxsPSIjQTZCMEMzIi8+CiAgPGRlZnM+CiAgPGZpbHRlciBpZD0iZmlsdGVyMF9kZCIgeD0iMC45NDYyODkiIHk9Ii0wLjAwMDQ4ODI4MSIgd2lkdGg9IjIyIiBoZWlnaHQ9IjMzIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KICA8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgogIDxmZU9mZnNldCBkeT0iMiIvPgogIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjM0NTA5OCAwIDAgMCAwIDAuNCAwIDAgMCAwIDAuNDk0MTE4IDAgMCAwIDAuMTIgMCIvPgogIDxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CiAgPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KICA8ZmVPZmZzZXQgZHk9IjEiLz4KICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIwLjUiLz4KICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjM0NTA5OCAwIDAgMCAwIDAuNCAwIDAgMCAwIDAuNDk0MTE4IDAgMCAwIDAuMTIgMCIvPgogIDxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0iZWZmZWN0Ml9kcm9wU2hhZG93Ii8+CiAgPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QyX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KICA8L2ZpbHRlcj4KICA8L2RlZnM+Cjwvc3ZnPgo="/>
        </div>
      `;
    }
    update(leftIndex, rightIndex) {
        this.detailed.update(leftIndex, rightIndex);
    }
    render() {
        this.detailed.render();
        this.slider.render();
    }
}
exports.Chart = Chart;


/***/ }),

/***/ "./src/chart/slider.ts":
/*!*****************************!*\
  !*** ./src/chart/slider.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Slider = void 0;
const base_1 = __webpack_require__(/*! ./base */ "./src/chart/base.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./src/constants/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
class Slider extends base_1.Base {
    constructor(drawer, data, updateDetailed) {
        super(drawer, data);
        this.data = data;
        this.updateDetailed = updateDetailed;
        this.range = document.getElementById('range');
        this.xLeft = 0;
        this.xRight = 0;
        this.handleMousedown = this.handleMousedown.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
        this.range.addEventListener('mousedown', this.handleMousedown);
        document.addEventListener('mouseup', this.handleMouseup);
    }
    handleMousedown(e) {
        e.preventDefault();
        this.previousX = e.clientX;
        this.typeShift = e.target.dataset.typeShift;
        document.onmousemove = this.handleMousemove;
    }
    handleMousemove(e) {
        const delta = e.clientX - this.previousX;
        switch (this.typeShift) {
            case constants_1.TYPE_SHIFT_LEFT:
                this.leftShift(delta);
                break;
            case constants_1.TYPE_SHIFT_RIGHT:
                this.rightShift(delta);
                break;
            case constants_1.TYPE_SHIFT:
                this.rangeShift(delta);
                break;
        }
        this.previousX = e.clientX;
        this.update();
    }
    handleMouseup() {
        document.onmousemove = null;
    }
    leftShift(delta) {
        if (this.isCorrectCoordinates(this.xLeft + delta, this.xRight)) {
            this.setCoordinates(this.xLeft + delta, this.xRight);
        }
    }
    rightShift(delta) {
        if (this.isCorrectCoordinates(this.xLeft, this.xRight - delta)) {
            this.setCoordinates(this.xLeft, this.xRight - delta);
        }
    }
    rangeShift(delta) {
        if (this.isCorrectCoordinates(this.xLeft + delta, this.xRight - delta)) {
            this.setCoordinates(this.xLeft + delta, this.xRight - delta);
        }
    }
    isCorrectCoordinates(xLeft, xRight) {
        return xLeft >= 0 && xRight >= 0;
    }
    setCoordinates(xLeft, xRight) {
        this.xLeft = xLeft;
        this.xRight = xRight;
    }
    update() {
        this.range.style.left = `${this.xLeft}px`;
        this.range.style.right = `${this.xRight}px`;
        const { leftIndex, rightIndex } = (0, utils_1.getChartRange)({
            xLeft: this.xLeft,
            xRight: this.xRight,
            sliderWidth: this.drawer.width,
            amountOfData: this.data.x.length,
        });
        this.updateDetailed(leftIndex, rightIndex);
    }
}
exports.Slider = Slider;


/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TYPE_SHIFT = exports.TYPE_SHIFT_RIGHT = exports.TYPE_SHIFT_LEFT = exports.MAIN_LINE_WIDTH = exports.LINE_WIDTH = void 0;
exports.LINE_WIDTH = 1;
exports.MAIN_LINE_WIDTH = 2;
exports.TYPE_SHIFT_LEFT = 'left';
exports.TYPE_SHIFT_RIGHT = 'right';
exports.TYPE_SHIFT = 'shift';


/***/ }),

/***/ "./src/data/index.ts":
/*!***************************!*\
  !*** ./src/data/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DATA = void 0;
exports.DATA = {
    x: [
        1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000,
        1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000,
        1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000,
        1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000,
        1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000,
        1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000,
        1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000,
        1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000,
        1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000,
        1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000,
        1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000,
        1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000,
        1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000,
        1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000,
        1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000,
        1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000,
        1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000,
        1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000,
        1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000,
        1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000,
        1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000,
        1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000,
        1551916800000, 1552003200000,
    ],
    y: [
        4747, 4849, 5045, 5184, 5746, 5400, 5424, 5576, 6436, 5337, 4840, 5379,
        4678, 4736, 5074, 4897, 4349, 5089, 4543, 5033, 5047, 4871, 4812, 4723,
        4545, 4723, 4721, 4384, 4277, 4682, 4805, 4001, 4610, 5241, 5113, 4059,
        4529, 4673, 5291, 5154, 5123, 5535, 5540, 5161, 5666, 5584, 6999, 6854,
        5083, 5361, 5863, 5792, 5586, 6106, 5481, 5532, 5853, 5809, 6244, 6156,
        5596, 5426, 5422, 5413, 4795, 5113, 5279, 5530, 4939, 4983, 4984, 5527,
        5765, 5001, 5818, 6061, 5956, 5288, 5837, 5703, 5440, 5238, 5957, 6432,
        6389, 6064, 7065, 5981, 5779, 6567, 6320, 5634, 6023, 5702, 6066, 5797,
        6163, 6182, 4906, 5637, 7073, 6679, 5831, 6015, 6266, 6128, 6156, 6218,
        6050, 6140, 5877, 7147,
    ],
};


/***/ }),

/***/ "./src/drawer/index.ts":
/*!*****************************!*\
  !*** ./src/drawer/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Drawer = void 0;
const constants_1 = __webpack_require__(/*! ../constants */ "./src/constants/index.ts");
class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.lineWidth = constants_1.LINE_WIDTH;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.font = '16px serif';
        this.ctx.textBaseline = 'middle';
        // this.ctx.textAlign = 'right';
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }
    label(label, x, y) {
        this.ctx.fillText(label, x, y);
    }
    line(xStart, yStart, xEnd, yEnd) {
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, yStart);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
exports.Drawer = Drawer;


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getChartRange = void 0;
const getChartRange = (options) => {
    const { xLeft, xRight, sliderWidth, amountOfData } = options;
    const leftPercent = Math.ceil((xLeft / sliderWidth) * 100);
    const rightPercent = Math.ceil((xRight / sliderWidth) * 100);
    const leftIndex = Math.ceil((amountOfData * leftPercent) / 100);
    const rightIndex = amountOfData - Math.ceil((amountOfData * rightPercent) / 100);
    return { leftIndex, rightIndex };
};
exports.getChartRange = getChartRange;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./index.css */ "./src/index.css");
const chart_1 = __webpack_require__(/*! ./chart */ "./src/chart/index.ts");
const index_1 = __webpack_require__(/*! ./data/index */ "./src/data/index.ts");
new chart_1.Chart('chart', index_1.DATA).render();

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map