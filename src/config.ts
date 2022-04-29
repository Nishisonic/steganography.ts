const t = 3;
const threshold = 1;
const codeUnitSize = 16;
function args(i: number) {
  return i + 1;
}
function messageDelimiter(modMessage: number[], threshold: number): number[] {
  return new Array(threshold * 3).fill(255);
}
function messageCompleted(
  data: Readonly<Uint8ClampedArray>,
  i: number,
  threshold: number
) {
  for (let j = 0; j < 16; j++) {
    if (data[i + j * 4] !== 255) return false;
  }
  return true;
}

export default {
  t,
  threshold,
  codeUnitSize,
  args,
  messageDelimiter,
  messageCompleted,
};
