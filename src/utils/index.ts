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
