import { Base } from './base';

export class Detailed extends Base {
  render() {
    super.render();
    this.renderXAxis().renderYAxis();

    return this;
  }

  renderXAxis() {
    for (let index = 1; index <= this.countX; index++) {
      this.drawer.line(
        (index * this.stepX) / this.ratioX,
        this.drawer.height,
        (index * this.stepX) / this.ratioX,
        this.drawer.height - 4,
      );

      if (index === this.countX) {
        this.drawer.label(
          `${this.maxX}`,
          (index * this.stepX) / this.ratioX,
          this.drawer.height - 12,
        );
      }
    }

    return this;
  }

  renderYAxis() {
    for (let index = 1; index <= this.countY; index++) {
      this.drawer.line(
        0,
        this.drawer.height - (index * this.stepY) / this.ratioY,
        4,
        this.drawer.height - (index * this.stepY) / this.ratioY,
      );

      if (index === this.countY) {
        this.drawer.label(`${this.maxY}`, 12, 0);
      }
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
