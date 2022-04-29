import config from "./config";
import util from "./util";

export interface DecodeOption {
  t?: number;
  codeUnitSize?: number;
  threshold?: number;
  args?: (i: number) => number;
  messageCompleted?: (
    data: Readonly<Uint8ClampedArray>,
    i: number,
    threshold: number
  ) => boolean;
  width?: number;
  height?: number;
}

export function decode(
  image: Readonly<HTMLImageElement | string>,
  options: Readonly<DecodeOption> = {}
) {
  // Handle image url
  const _image = ((image, options) => {
    if (typeof image === "string") {
      return util.loadImg(image);
    }
    if (image instanceof HTMLImageElement) {
      return util.loadImg(image.src);
    }
    throw new Error(
      "IllegalInput: The input image is neither an URL string nor an image."
    );
  })(image);

  const t = options.t || config.t;
  const threshold = options.threshold || config.threshold;
  const codeUnitSize = options.codeUnitSize || config.codeUnitSize;
  const prime = util.findNextPrime(Math.pow(2, t));
  const args = options.args || config.args;
  const messageCompleted = options.messageCompleted || config.messageCompleted;

  if (!t || t < 1 || t > 7) {
    throw new Error(
      'IllegalOptions: Parameter t = " + t + " is not valid: 0 < t < 8'
    );
  }

  const shadowCanvas = document.createElement("canvas");
  const shadowCtx = shadowCanvas.getContext("2d");
  if (shadowCtx === null) {
    throw new Error("NullContext: Context is null");
  }

  shadowCanvas.style.display = "none";
  shadowCanvas.width = options.width || _image.width;
  shadowCanvas.height = options.width || _image.height;
  if (options.height && options.width) {
    shadowCtx.drawImage(_image, 0, 0, options.width, options.height);
  } else {
    shadowCtx.drawImage(_image, 0, 0);
  }

  const imageData = shadowCtx.getImageData(
    0,
    0,
    shadowCanvas.width,
    shadowCanvas.height
  );
  const data = imageData.data;
  const modMessage: number[] = [];

  if (threshold === 1) {
    for (let i = 3; i < data.length; i += 4) {
      if (messageCompleted(data, i, threshold)) {
        break;
      }
      modMessage.push(data[i] - (255 - prime + 1));
    }
  } else {
    // comment out...
  }

  let message = "";
  let charCode = 0;
  let bitCount = 0;
  let mask = Math.pow(2, codeUnitSize) - 1;
  for (let i = 0; i < modMessage.length; i++) {
    charCode += modMessage[i] << bitCount;
    bitCount += t;
    if (bitCount >= codeUnitSize) {
      message += String.fromCharCode(charCode & mask);
      bitCount %= codeUnitSize;
      charCode = modMessage[i] >> (t - bitCount);
    }
  }
  if (charCode !== 0) {
    message += String.fromCharCode(charCode & mask);
  }

  return message;
}
