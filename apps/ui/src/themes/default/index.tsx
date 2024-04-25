import createTheme from '@mui/material/styles/createTheme';
import { deepPurple } from '@mui/material/colors';

import {
  BORDER_RADII,
  COLORS,
  DEFAULT_FONT_SIZE,
  DEFAULT_HTML_FONT_SIZE,
  FONTS,
  SPACING,
} from './consts';
import { hexToRgba, pxToRem } from './utils';

const defaultTheme = createTheme({
  palette: {
    text: {
      primary: hexToRgba(COLORS.BLACK, 0.87),
      secondary: hexToRgba(COLORS.BLACK, 0.6),
      disabled: hexToRgba(COLORS.BLACK, 0.38),
    },
    primary: {
      main: COLORS.PRIMARY,
      dark: COLORS.PRIMARY_DARK,
      light: COLORS.PRIMARY,
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.SECONDARY,
      dark: COLORS.SECONDARY_DARK,
      light: COLORS.SECONDARY,
      contrastText: COLORS.WHITE,
    },
    success: {
      main: COLORS.SUCCESS,
      dark: COLORS.SUCCESS_DARK,
      light: COLORS.SUCCESS,
      contrastText: COLORS.WHITE,
    },
    error: {
      main: COLORS.ERROR,
      dark: COLORS.ERROR_DARK,
      light: COLORS.ERROR,
      contrastText: COLORS.WHITE,
    },
    info: {
      main: COLORS.INFO,
      dark: COLORS.INFO_DARK,
      light: COLORS.INFO,
      contrastText: COLORS.WHITE,
    },
    warning: {
      main: COLORS.WARNING,
      dark: COLORS.WARNING_DARK,
      light: COLORS.WARNING,
      contrastText: COLORS.WHITE,
    },
    common: { black: COLORS.BLACK, white: COLORS.WHITE },
    action: {
      active: hexToRgba(COLORS.PRIMARY, 0.56),
      hover: hexToRgba(COLORS.SECONDARY, 0.08),
      selected: hexToRgba(COLORS.SECONDARY, 0.08),
      disabled: hexToRgba(COLORS.BLACK, 0.38),
      focus: hexToRgba(COLORS.SECONDARY, 0.12),
      disabledBackground: hexToRgba(COLORS.BLACK, 0.12),
    },
  },
  typography: {
    fontFamily: FONTS.PRIMARY,
    fontSize: DEFAULT_FONT_SIZE,
    htmlFontSize: DEFAULT_HTML_FONT_SIZE,
    h3: {
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
      fontSize: pxToRem(14),
    },
    body2: {
      fontSize: pxToRem(13),
      fontWeight: 500,
      lineHeight: 1.3,
    },
    caption: {
      fontWeight: 500,
    },
    overline: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            padding: `${SPACING.SP2} ${SPACING.SP5}`,
            borderRadius: BORDER_RADII.XS,
          },
        },
        {
          props: { size: 'medium' },
          style: { padding: `${SPACING.SP3} ${SPACING.SP8}` },
        },
        {
          props: { size: 'large' },
          style: { padding: `${SPACING.SP3} ${SPACING.SP8}` },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.S,
          width: 'fit-content',
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        anchor: 'right',
      },
      styleOverrides: {
        paper: {
          borderBottomLeftRadius: BORDER_RADII.XL,
          borderTopLeftRadius: BORDER_RADII.XL,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { fontSize: DEFAULT_HTML_FONT_SIZE },
      },
    },
    MuiScopedCssBaseline: {
      defaultProps: { className: 'reset-css' },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: BORDER_RADII.S,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.S,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.S,
        },
        multiline: {
          borderRadius: BORDER_RADII.S,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: BORDER_RADII.S } },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: deepPurple[50],
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        action: { alignSelf: 'center' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.XS,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          width: '100%',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: BORDER_RADII.S,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          lineHeight: '21.98px',
          letterSpacing: '0.1px',
          border: '1px, 0px, 1px, 0px',
          padding: '16px, 24px, 16px, 24px',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          width: pxToRem(500),
          height: SPACING.SP24,
          borderRadius: SPACING.SP6,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          width: '100%',
          padding: `${SPACING.SP3}, ${SPACING.SP8}`,
          gap: SPACING.SP2,
        },
      },
      variants: [
        { props: { variant: 'filled' }, style: { color: COLORS.WHITE } },
      ],
    },
  },
});

export default defaultTheme;
