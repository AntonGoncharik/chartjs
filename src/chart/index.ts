import { ChartData } from './interface';
import { Drawer } from '../drawer';
import { Detailed } from './detailed';
import { Slider } from './slider';
import { LINE_WIDTH } from '../constants';

export class Chart {
  private detailed: Detailed;
  private slider: Slider;

  constructor(chartId: string, data: ChartData) {
    const root = document.getElementById(chartId);

    if (!root) {
      throw new Error('DIV with id="chart" is not found');
    }

    root.innerHTML = this.getTemplate();

    const detailed = <HTMLCanvasElement>document.getElementById('detailed');
    const ctxDetailed = <CanvasRenderingContext2D>detailed.getContext('2d');
    const slider = <HTMLCanvasElement>document.getElementById('slider');
    const ctxSlider = <CanvasRenderingContext2D>slider.getContext('2d');

    this.detailed = new Detailed(new Drawer(ctxDetailed), data);

    const sliderDrawer = new Drawer(ctxSlider);
    sliderDrawer.setConfig({ lineWidth: LINE_WIDTH });

    this.slider = new Slider(sliderDrawer, data);
  }

  private getTemplate() {
    return `<canvas id="detailed" width="768" height="432"></canvas>
      <canvas id="slider" width="768" height="48"></canvas>`;
  }

  render() {
    this.detailed.render();
    this.slider.render();
  }
}
