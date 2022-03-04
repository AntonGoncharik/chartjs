import { Base } from './base';
import { Detailed as DetailedI } from './interface';
import { getXAxisCoords, getYAxisCoords } from '../utils';

export class Detailed extends Base implements DetailedI {
  render() {
    super.render();
    this.renderXAxis().renderYAxis();

    return this;
  }

  renderXAxis() {
    for (let index = 1; index <= this.countX; index++) {
      const { xStart, yStart, xEnd, yEnd } = getXAxisCoords({
        index,
        step: this.stepX,
        ratio: this.ratioX,
        height: this.drawer.height,
      });

      this.drawer.line(xStart, yStart, xEnd, yEnd);
    }

    return this;
  }

  renderYAxis() {
    for (let index = 1; index <= this.countY; index++) {
      const { xStart, yStart, xEnd, yEnd } = getYAxisCoords({
        index: index,
        step: this.stepY,
        ratio: this.ratioY,
        height: this.drawer.height,
      });

      this.drawer.line(xStart, yStart, xEnd, yEnd);
    }

    return this;
  }

  update(leftIndex: number, rightIndex: number) {
    this.dynamicData.x = this.data.x.slice(leftIndex, rightIndex);
    this.dynamicData.y = this.data.y.slice(leftIndex, rightIndex);

    this.setInitialValues().render();

    return this;
  }
}
