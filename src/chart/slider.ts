import { Base } from './base';
import { Drawer } from '../drawer';
import { ChartData } from './interface';
import { TYPE_SHIFT_LEFT, TYPE_SHIFT_RIGHT, TYPE_SHIFT } from '../constants';

export class Slider extends Base {
  private range: HTMLElement;
  private typeShift!: string;
  private previousX!: number;
  private left: number;
  private right: number;

  constructor(drawer: Drawer, data: ChartData) {
    super(drawer, data);

    this.range = <HTMLElement>document.getElementById('range');

    this.left = 0;
    this.right = 0;

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.range.addEventListener('mousedown', this.handleMousedown);
    document.addEventListener('mouseup', this.handleMouseup);
  }

  render() {
    super.render();

    return this;
  }

  destroy() {
    this.range.removeEventListener('mousedown', this.handleMousedown);
    document.removeEventListener('mouseup', this.handleMouseup);

    return this;
  }

  private handleMousedown(e: any) {
    e.preventDefault();

    this.previousX = e.clientX;
    this.typeShift = e.target.dataset.typeShift;

    document.onmousemove = this.handleMousemove;
  }

  private handleMousemove(e: MouseEvent) {
    const delta = e.clientX - this.previousX;

    switch (this.typeShift) {
      case TYPE_SHIFT_LEFT:
        this.leftShift(delta);
        break;
      case TYPE_SHIFT_RIGHT:
        this.rightShift(delta);
        break;
      case TYPE_SHIFT:
        this.rangeShift(delta);
        break;
    }

    this.previousX = e.clientX;

    this.update();
  }

  private handleMouseup() {
    document.onmousemove = null;
  }

  private leftShift(delta: number) {
    if (this.isCorrectCoordinates(this.left + delta, this.right)) {
      this.setCoordinates(this.left + delta, this.right);
    }
  }

  private rightShift(delta: number) {
    if (this.isCorrectCoordinates(this.left, this.right - delta)) {
      this.setCoordinates(this.left, this.right - delta);
    }
  }

  private rangeShift(delta: number) {
    if (this.isCorrectCoordinates(this.left + delta, this.right - delta)) {
      this.setCoordinates(this.left + delta, this.right - delta);
    }
  }

  private isCorrectCoordinates(left: number, right: number) {
    return left >= 0 && right >= 0;
  }

  private setCoordinates(left: number, right: number) {
    this.left = left;
    this.right = right;
  }

  private update() {
    this.range.style.left = `${this.left}px`;
    this.range.style.right = `${this.right}px`;
  }
}
