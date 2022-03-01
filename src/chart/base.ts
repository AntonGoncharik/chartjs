import { Drawer } from '../drawer';
import { ChartData } from './interface';

export abstract class Base {
  drawer: Drawer;
  data: ChartData;
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

    this.minX = Math.min(...this.data.x);
    this.maxX = Math.max(...this.data.x);
    this.countX = this.data.x.length;
    this.stepX = Math.ceil((this.maxX - this.minX) / this.countX);
    this.ratioX = (this.stepX * this.countX) / this.drawer.width;

    this.minY = Math.min(...this.data.dataset[0].y);
    this.maxY = Math.max(...this.data.dataset[0].y);
    this.countY = this.data.dataset[0].y.length;
    this.stepY = Math.ceil((this.maxY - this.minY) / this.countY);
    this.ratioY = (this.stepY * this.countY) / this.drawer.height;
  }

  render() {
    this.clear();
    this.renderLines();

    return this;
  }

  clear() {
    this.drawer.clear();

    return this;
  }

  renderLines() {
    let endIndex = 1;
    for (let startIndex = 0; startIndex < this.countX; startIndex++) {
      const xStart = this.data.x[startIndex];
      const yStart = this.data.dataset[0].y[startIndex];
      const xEnd = this.data.x[endIndex];
      const yEnd = this.data.dataset[0].y[endIndex];

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
