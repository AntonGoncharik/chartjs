import { Base } from './base';

export class Detailed extends Base {
  render() {
    super.render();
    this.renderXAxis();
    this.renderYAxis();

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

      this.drawer.label(
        `${index * this.stepX}`,
        (index * this.stepX) / this.ratioX,
        this.drawer.height - 8,
      );
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

      this.drawer.label(
        `${index * this.stepY}`,
        8,
        this.drawer.height - (index * this.stepY) / this.ratioY,
      );
    }

    return this;
  }
}
