function isPrime(n: number) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  if (n % 3 === 0) return n === 3;
  const m = Math.sqrt(n);
  for (let i = 5; i <= m; i += 6) {
    if (n % i === 0) return false;
    if (n % (i + 2) === 0) return false;
  }
  return true;
}

function findNextPrime(n: number) {
  for (let i = n; true; i += 1) {
    if (isPrime(i)) return i;
  }
}

interface UtilOptions {
  start?: number;
  inc?: number;
  defValue?: number;
}

function sum(
  func: (arg0: number) => number | null | undefined,
  end: number,
  options: UtilOptions
) {
  let sum = 0;
  for (let i = options.start || 0; i < end; i += options.inc || 1) {
    sum += func(i) || 0;
  }

  return sum === 0 && options.defValue ? options.defValue : sum;
}

function product(
  func: (arg0: number) => number | null | undefined,
  end: number,
  options: UtilOptions
) {
  let prod = 1;
  for (let i = options.start || 0; i < end; i += options.inc || 1) {
    prod *= func(i) || 1;
  }

  return prod === 1 && options.defValue ? options.defValue : prod;
}

function createArrayFromArgs(
  args: (arg0: number) => number,
  index: number,
  threshold: number
) {
  let ret: number[] = new Array(threshold - 1);
  for (let i = 0; i < threshold; i += 1) {
    ret[i] = args(i >= index ? i + 1 : i);
  }

  return ret;
}

function loadImg(url: string) {
  let image = new Image();
  image.src = url;
  return image;
}

export default {
  isPrime,
  findNextPrime,
  sum,
  product,
  createArrayFromArgs,
  loadImg,
};
