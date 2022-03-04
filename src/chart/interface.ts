import { Drawer } from '../drawer';

export interface ChartData {
  x: number[];
  y: number[];
}

export interface Base {
  drawer: Drawer;
  data: ChartData;
  dynamicData: ChartData;
  minX: number;
  maxX: number;
  stepX: number;
  countX: number;
  ratioX: number;
  minY: number;
  maxY: number;
  stepY: number;
  countY: number;
  ratioY: number;
  setInitialValues(): this;
  render(): this;
  clear(): this;
  renderLine(): this;
}

export interface Detailed {
  render(): this;
  renderXAxis(): this;
  renderYAxis(): this;
  update(leftIndex: number, rightIndex: number): this;
}

export interface Slider {
  drawer: Drawer;
}

export interface Chart {
  render(): void;
}
