import { Chart as ChartI, ChartData } from './interface';
import { Drawer } from '../drawer';
import { ChartBase } from './base';

export class Chart {
  private detail!: ChartBase;

  constructor(chartId: string, data: ChartData) {
    const root = document.getElementById('chart');

    if (!root) {
      throw new Error('Element with id=chart is not found');
    }

    root.innerHTML = this.getTemplate();

    const detail = <HTMLCanvasElement>document.getElementById('detail');
    const ctxDetail = <CanvasRenderingContext2D>detail.getContext('2d');

    // const slider = <HTMLCanvasElement>document.getElementById('slider');
    // const ctxSlider = slider.getContext('2d');

    this.detail = new ChartBase(new Drawer(ctxDetail), data);
    // this.slider = new ChartBase(
    //   new Drawer(<CanvasRenderingContext2D>ctxSlider),
    //   data,
    // );
  }

  getTemplate() {
    return `<canvas id="detail" width="768" height="432" />`;
    // return `<canvas id="detail" width="768" height="432" />
    //   <canvas id="slider" width="768" height="48" />`;
  }

  render() {
    this.detail.render();
  }
}
