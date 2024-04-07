import { pxToRem } from './utils';

export const DEFAULT_FONT_SIZE = 14;
export const DEFAULT_HTML_FONT_SIZE = 14; // For REM calculations only
export const SPACING_SCALING_FACTOR = 2;

export const BORDER_RADII = {
  XS: 5,
  S: 10,
  M: 15,
  L: 20,
  XL: 30,
  CIRCULAR: '50%',
} as const;

export const COLORS = {
  TEXT_PRIMARY: '#262626',
  PRIMARY: '#1C0E40',
  PRIMARY_DARK: '#311B92',
  SECONDARY: '#673AB7',
  SECONDARY_DARK: '#512DA8',
  SUCCESS: '#4CAF50',
  SUCCESS_DARK: '#388E3C',
  INFO: '#03A9F4',
  INFO_DARK: '#0288D1',
  ERROR: '#F44336',
  ERROR_DARK: '#D32F2F',
  WARNING: '#FF9800',
  WARNING_DARK: '#F57C00',
  WHITE: '#ffffff',
  BLACK: '#262626',
} as const;

export const FONTS = {
  PRIMARY: "'Montserrat', Helvetica, sans-serif",
} as const;

export const SPACING = {
  SP1: pxToRem(1 * SPACING_SCALING_FACTOR),
  SP2: pxToRem(2 * SPACING_SCALING_FACTOR),
  SP3: pxToRem(3 * SPACING_SCALING_FACTOR),
  SP4: pxToRem(4 * SPACING_SCALING_FACTOR),
  SP5: pxToRem(5 * SPACING_SCALING_FACTOR),
  SP6: pxToRem(6 * SPACING_SCALING_FACTOR),
  SP7: pxToRem(7 * SPACING_SCALING_FACTOR),
  SP8: pxToRem(8 * SPACING_SCALING_FACTOR),
  SP9: pxToRem(9 * SPACING_SCALING_FACTOR),
  SP10: pxToRem(10 * SPACING_SCALING_FACTOR),
  SP11: pxToRem(11 * SPACING_SCALING_FACTOR),
  SP12: pxToRem(12 * SPACING_SCALING_FACTOR),
  SP13: pxToRem(13 * SPACING_SCALING_FACTOR),
  SP14: pxToRem(14 * SPACING_SCALING_FACTOR),
  SP15: pxToRem(15 * SPACING_SCALING_FACTOR),
  SP16: pxToRem(16 * SPACING_SCALING_FACTOR),
  SP17: pxToRem(17 * SPACING_SCALING_FACTOR),
  SP18: pxToRem(18 * SPACING_SCALING_FACTOR),
  SP19: pxToRem(19 * SPACING_SCALING_FACTOR),
  SP20: pxToRem(20 * SPACING_SCALING_FACTOR),
  SP24: pxToRem(24 * SPACING_SCALING_FACTOR),
} as const;
