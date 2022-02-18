import { Chart as ChartI, ChartData } from './interface';
import { Drawer } from '../drawer';

export class ChartBase {
  private minX!: number;
  private maxX!: number;
  private stepX!: number;
  private countX!: number;
  private ratioX!: number;
  private minY!: number;
  private maxY!: number;
  private stepY!: number;
  private countY!: number;
  private ratioY!: number;

  constructor(private drawer: Drawer, private data: ChartData) {
    this.minX = Math.min(...this.data.x);
    this.maxX = Math.max(...this.data.x);
    this.countX = this.data.x.length;
    this.stepX = Math.ceil((this.maxX - this.minX) / (this.countX - 1));
    this.ratioX = (this.stepX * this.countX) / this.drawer.width;

    this.minY = Math.min(...this.data.dataset[0].y);
    this.maxY = Math.max(...this.data.dataset[0].y);
    this.countY = this.data.dataset[0].y.length;
    this.stepY = Math.ceil((this.maxY - this.minY) / (this.countY - 1));
    this.ratioY = (this.stepY * this.countY) / this.drawer.height;
  }

  render() {
    this.clear();
    this.renderXAxis();
    this.renderYAxis();
    this.renderLines();

    return this;
  }

  clear() {
    this.drawer.clear();

    return this;
  }

  renderXAxis() {
    for (let index = 0; index < this.countX; index++) {
      this.drawer.line(
        (index * this.stepX) / this.ratioX,
        this.drawer.height,
        (index * this.stepX) / this.ratioX,
        this.drawer.height - 10,
      );

      this.drawer.label(
        `${this.data.x[index]}`,
        (index * this.stepX) / this.ratioX,
        this.drawer.height,
      );
    }

    return this;
  }

  renderYAxis() {
    for (let index = 0; index < this.countY; index++) {
      this.drawer.line(
        0,
        this.drawer.height - (index * this.stepY) / this.ratioY,
        10,
        this.drawer.height - (index * this.stepY) / this.ratioY,
      );

      this.drawer.label(
        `${this.data.dataset[0].y[index]}`,
        0,
        this.drawer.height - (index * this.stepY) / this.ratioY,
      );
    }

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
        Math.ceil(xStart / this.ratioX),
        // yStart / this.ratioY,
        this.drawer.height - Math.ceil(yStart / this.ratioY),
        Math.ceil(xEnd / this.ratioX),
        // yEnd / this.ratioY,
        this.drawer.height - Math.ceil(yEnd / this.ratioY),
      );
    }

    // this.drawer.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    // this.drawer.arc(x, y, radius);
    // this.drawer.clear();
    // this.drawer.render(10, 20, 60, 90);

    return this;
  }
}
