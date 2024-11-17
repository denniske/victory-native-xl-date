import { type ScaleLinear, scaleLinear, scaleTime } from "d3-scale";

export const makeScale = ({
  inputBounds,
  outputBounds,
  padStart,
  padEnd,
  isNice = false,
}: {
  inputBounds: [number, number];
  outputBounds: [number, number];
  padStart?: number;
  padEnd?: number;
  isNice?: boolean;
}): ScaleLinear<number, number> => {

  console.log('makeScale', inputBounds,
    outputBounds,
    padStart,
    padEnd,
    isNice);


  if (typeof inputBounds.at(0) === "number") {
    const scale = scaleLinear().domain(inputBounds).range(outputBounds);

    // scale

    if (padStart || padEnd) {
      scale
        .domain([
          scale.invert(outputBounds[0] - (padStart ?? 0)),
          scale.invert(outputBounds[1] + (padEnd ?? 0)),
        ])
        .range(outputBounds);
    }

    if (isNice) scale.nice();
    return scale;
  }

  const scale = scaleTime().domain(inputBounds).range(outputBounds);

  if (padStart || padEnd) {
    scale
      .domain([
        scale.invert(outputBounds[0] - (padStart ?? 0)),
        scale.invert(outputBounds[1] + (padEnd ?? 0)),
      ])
      .range(outputBounds);
  }

  if (isNice) scale.nice();
  return scale as any;
};
