import config from "./config";

export interface CapacityOption {
  width?: number;
  height?: number;
  t?: number;
  codeUnitSize?: number;
}

export function getHidingCapacity(
  image: Readonly<HTMLImageElement>,
  options: Readonly<CapacityOption> = {}
) {
  const width = options.width || image.width;
  const height = options.height || image.height;
  const t = options.t || config.t;
  const codeUnitSize = options.codeUnitSize || config.codeUnitSize;

  return ((t * width * height) / codeUnitSize) >> 0;
}
