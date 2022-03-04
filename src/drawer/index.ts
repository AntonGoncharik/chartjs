import { Drawer as DrawerI } from './interface';
import {
  LINE_WIDTH,
  LINE_CAP,
  LINE_JOIN,
  FONT,
  TEXT_BASELINE,
} from '../constants';

export class Drawer implements DrawerI {
  width: number;
  height: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.lineCap = LINE_CAP;
    this.ctx.lineJoin = LINE_JOIN;
    this.ctx.font = FONT;
    this.ctx.textBaseline = TEXT_BASELINE;

    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
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
