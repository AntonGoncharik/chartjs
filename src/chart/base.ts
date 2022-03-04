import { Drawer } from '../drawer';
import { Base as BaseI, ChartData } from './interface';
import { getLineCoords, getStep, getRatio } from '../utils';

export abstract class Base implements BaseI {
  drawer: Drawer;
  data: ChartData;
  dynamicData: ChartData;
  minX!: number;
  maxX!: number;
  stepX!: number;
  countX!: number;
  ratioX!: number;
  minY!: number;
  maxY!: number;
  stepY!: number;
  countY!: number;
  ratioY!: number;

  constructor(drawer: Drawer, data: ChartData) {
    this.drawer = drawer;
    this.data = data;
    this.dynamicData = { x: [...data.x], y: [...data.y] };

    this.setInitialValues();
  }

  setInitialValues() {
    this.minX = Math.min(...this.dynamicData.x);
    this.maxX = Math.max(...this.dynamicData.x);
    this.countX = this.dynamicData.x.length;
    this.stepX = getStep({
      max: this.maxX,
      min: this.minX,
      count: this.countX,
    });
    this.ratioX = getRatio({
      step: this.stepX,
      count: this.countX,
      length: this.drawer.width,
    });

    this.minY = Math.min(...this.dynamicData.y);
    this.maxY = Math.max(...this.dynamicData.y);
    this.countY = this.dynamicData.y.length;
    this.stepY = getStep({
      max: this.maxY,
      min: this.minY,
      count: this.countY,
    });
    this.ratioY = getRatio({
      step: this.stepY,
      count: this.countY,
      length: this.drawer.height,
    });

    return this;
  }

  render() {
    this.clear();
    this.renderLine();

    return this;
  }

  clear() {
    this.drawer.clear();

    return this;
  }

  renderLine() {
    let endIndex = 1;
    for (let startIndex = 0; startIndex < this.countX; startIndex++) {
      const { xStart, yStart, xEnd, yEnd } = getLineCoords({
        xStart: this.dynamicData.x[startIndex],
        yStart: this.dynamicData.y[startIndex],
        xEnd: this.dynamicData.x[endIndex],
        yEnd: this.dynamicData.y[endIndex],
        minX: this.minX,
        ratioX: this.ratioX,
        minY: this.minY,
        ratioY: this.ratioY,
        heightChart: this.drawer.height,
      });

      this.drawer.line(xStart, yStart, xEnd, yEnd);

      endIndex++;
    }

    return this;
  }
}
