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
  TEXT_PRIMARY: '#ffffff',
  PRIMARY: '#8EB296',
  PRIMARY_DARK: '#0b5452',
  SECONDARY: '#BC9456',
  SECONDARY_DARK: '#F2CD81',
  SUCCESS: '#91B397',
  SUCCESS_DARK: '#E6FBDB',
  INFO: '#F1EDDE',
  INFO_DARK: '#107876',
  ERROR: '#F44336',
  ERROR_DARK: '#D32F2F',
  WARNING: '#FF9800',
  WARNING_DARK: '#F57C00',
  WHITE: '#ffffff',
  BLACK: '#262626',
  TITLE_TEXT: '#263A6D',
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

export const TEXT = {
  REGISTER: "Don't have an account? Register Now",
  FORGOT_PASSWORD: 'Forgot password?',
  SIGNIN: 'Already have an account? Sign in',
  LOGIN: 'Login',
  CONTINUE: 'Continue',
  CREATE: 'Create',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  CREATE_COMMUNITY_TITLE: 'Create Community',
  CREATE_COMMUNITY_DESCRIPTION:
    'To add a Community, please fill all details here.',
  UPDATE_COMMUNITY_TITLE: 'Update Community',
  UPDATE_COMMUNITY_DESCRIPTION:
    'To Update a Community, please change all details here.',
  alerts: {
    SUCCESSFUL_REQUEST: 'Your request has been received',
    REQUEST_FAILED: 'Your request failed, try again later',
    FETCH_COMMUNITIES_REQUEST_FAILED:
      'An error occurred in retrieving the complete information of communities',
    FETCH_ALL_RIDES_FAILED: 'Error fetching all rides',
    FETCH_ALL_COMMUNITIES_FAILED: 'Error fetching all communities',
    FETCH_ALL_USER_COMMUNITIES_FAILED: 'Error fetching all user communities',
  },
} as const;

export const FORMS_TEXT = {
  CREATE_COMMUNITY: {
    title: TEXT.CREATE_COMMUNITY_TITLE,
    description: TEXT.CREATE_COMMUNITY_DESCRIPTION,
    submitText: TEXT.CREATE,
  },
  UPDATE_COMMUNITY: {
    title: TEXT.UPDATE_COMMUNITY_TITLE,
    description: TEXT.UPDATE_COMMUNITY_DESCRIPTION,
    submitText: TEXT.SAVE,
  },
} as const;

export const DEFAULT_HOME_PAGE = '/home';
