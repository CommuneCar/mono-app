import hexRgb from 'hex-rgb';

import { DEFAULT_HTML_FONT_SIZE } from './consts';

export const pxToRem = (pxValue: number): string =>
  `${pxValue / DEFAULT_HTML_FONT_SIZE}rem`;

export const hexToRgba = (hexColor: string, opacity: number): string => {
  return hexRgb(hexColor, { format: 'css', alpha: opacity });
};
