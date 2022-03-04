import { Base } from './base';
import { Drawer } from '../drawer';
import { Slider as SliderI, ChartData } from './interface';
import {
  TYPE_SHIFT_LEFT,
  TYPE_SHIFT_RIGHT,
  TYPE_SHIFT,
  MIN_WIDTH_SLIDER,
} from '../constants';
import { getChartRange } from '../utils';

export class Slider extends Base implements SliderI {
  private range: HTMLElement;
  private typeShift!: string;
  private previousX!: number;
  private xLeft: number;
  private xRight: number;

  constructor(
    drawer: Drawer,
    readonly data: ChartData,
    private updateDetailed: (leftIndex: number, rightIndex: number) => void,
  ) {
    super(drawer, data);

    this.range = <HTMLElement>document.getElementById('range');

    this.xLeft = 0;
    this.xRight = 0;

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.range.addEventListener('mousedown', this.handleMousedown);
    document.addEventListener('mouseup', this.handleMouseup);
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
    if (this.isCorrectCoordinates(this.xLeft + delta, this.xRight)) {
      this.setCoordinates(this.xLeft + delta, this.xRight);
    }
  }

  private rightShift(delta: number) {
    if (this.isCorrectCoordinates(this.xLeft, this.xRight - delta)) {
      this.setCoordinates(this.xLeft, this.xRight - delta);
    }
  }

  private rangeShift(delta: number) {
    if (this.isCorrectCoordinates(this.xLeft + delta, this.xRight - delta)) {
      this.setCoordinates(this.xLeft + delta, this.xRight - delta);
    }
  }

  private isCorrectCoordinates(xLeft: number, xRight: number) {
    return (
      xLeft >= 0 &&
      xRight >= 0 &&
      xLeft + xRight < this.drawer.width - MIN_WIDTH_SLIDER
    );
  }

  private setCoordinates(xLeft: number, xRight: number) {
    this.xLeft = xLeft;
    this.xRight = xRight;
  }

  private update() {
    this.range.style.left = `${this.xLeft}px`;
    this.range.style.right = `${this.xRight}px`;

    const { leftIndex, rightIndex } = getChartRange({
      xLeft: this.xLeft,
      xRight: this.xRight,
      sliderWidth: this.drawer.width,
      amountOfData: this.data.x.length,
    });

    this.updateDetailed(leftIndex, rightIndex);
  }
}
