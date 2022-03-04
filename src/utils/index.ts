export const getChartRange = (options: {
  xLeft: number;
  xRight: number;
  sliderWidth: number;
  amountOfData: number;
}): { leftIndex: number; rightIndex: number } => {
  const { xLeft, xRight, sliderWidth, amountOfData } = options;

  const leftPercent = Math.ceil((xLeft / sliderWidth) * 100);
  const rightPercent = Math.ceil((xRight / sliderWidth) * 100);

  const leftIndex = Math.ceil((amountOfData * leftPercent) / 100);
  const rightIndex =
    amountOfData - Math.ceil((amountOfData * rightPercent) / 100);

  return { leftIndex, rightIndex };
};

export const getLineCoords = (options: {
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
  minX: number;
  ratioX: number;
  minY: number;
  ratioY: number;
  heightChart: number;
}): { xStart: number; yStart: number; xEnd: number; yEnd: number } => {
  const {
    xStart,
    yStart,
    xEnd,
    yEnd,
    minX,
    ratioX,
    minY,
    ratioY,
    heightChart,
  } = options;

  return {
    xStart: Math.ceil((xStart - minX) / ratioX),
    yStart: heightChart - Math.ceil((yStart - minY) / ratioY),
    xEnd: Math.ceil((xEnd - minX) / ratioX),
    yEnd: heightChart - Math.ceil((yEnd - minY) / ratioY),
  };
};

export const getXAxisCoords = (options: {
  index: number;
  step: number;
  ratio: number;
  height: number;
}): { xStart: number; yStart: number; xEnd: number; yEnd: number } => {
  const { index, step, ratio, height } = options;

  return {
    xStart: (index * step) / ratio,
    yStart: height,
    xEnd: (index * step) / ratio,
    yEnd: height - 4,
  };
};

export const getYAxisCoords = (options: {
  index: number;
  step: number;
  ratio: number;
  height: number;
}): { xStart: number; yStart: number; xEnd: number; yEnd: number } => {
  const { index, step, ratio, height } = options;

  return {
    xStart: 0,
    yStart: height - (index * step) / ratio,
    xEnd: 4,
    yEnd: height - (index * step) / ratio,
  };
};

export const getStep = (options: {
  max: number;
  min: number;
  count: number;
}): number => {
  const { max, min, count } = options;

  return Math.ceil((max - min) / count);
};

export const getRatio = (options: {
  step: number;
  count: number;
  length: number;
}): number => {
  const { step, count, length } = options;

  return (step * count) / length;
};
