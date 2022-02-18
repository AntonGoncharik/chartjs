import { Drawer as DrawerI } from './interface';

export class Drawer implements DrawerI {
  width: number;
  height: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  label(label: string, x: number, y: number) {
    this.ctx.fillText(label, x, y);
  }

  line(xStart: number, yStart: number, xEnd: number, yEnd: number) {
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
