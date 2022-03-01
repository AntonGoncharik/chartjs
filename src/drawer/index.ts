import { Drawer as DrawerI, DrawerConfig } from './interface';
import { MAIN_LINE_WIDTH } from '../constants';

export class Drawer implements DrawerI {
  width: number;
  height: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.ctx.lineWidth = MAIN_LINE_WIDTH;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.font = '16px serif';
    this.ctx.textBaseline = 'middle';

    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  setConfig(options: DrawerConfig): void {
    this.ctx.lineWidth = options.lineWidth ?? MAIN_LINE_WIDTH;
  }

  label(label: string, x: number, y: number): void {
    this.ctx.fillText(label, x, y);
  }

  line(xStart: number, yStart: number, xEnd: number, yEnd: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(xStart, yStart);
    this.ctx.lineTo(xEnd, yEnd);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
