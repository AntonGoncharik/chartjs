import { Drawer } from '../drawer';
import { ChartData } from './interface';

export abstract class Base {
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

      this.drawer.line(
        Math.ceil((xStart - this.minX) / this.ratioX),
        this.drawer.height - Math.ceil((yStart - this.minY) / this.ratioY),
        Math.ceil((xEnd - this.minX) / this.ratioX),
        this.drawer.height - Math.ceil((yEnd - this.minY) / this.ratioY),
      );
    }

    return this;
  }
}
