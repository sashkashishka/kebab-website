// @ts-nocheck
/**
 * @summary v1.0.0
 */

/**
 * @typedef {Object} Breakpoints
 * @property {string} xs - extra small devices (portrait phones, less than 576px)
 * @property {string} sm - small devices (lankscape pnohes, 576px and up)
 * @property {string} md - medium devices (tablets, 768px and up)
 * @property {string} lg - large devices (desktops, 992px and up)
 * @property {string} xl - extra large devices (1200px and up)
 */

/**
 * @see https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints
 * @type {Breakpoints}
 */
export const breakpoints = [
  '0px',
  '576px',
  '768px',
  '992px',
  '1200px',
];

/* eslint-disable prefer-destructuring */
breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

export const fontSizes = [
  '14px', // 0
  '18px', // 1
  '24px', // 2
  '28px', // 3
  '48px', // 4
  '64px', // 5
];


fontSizes.h1 = '72px';
fontSizes.h1m = '41px';
fontSizes.h2 = '37px';
fontSizes.h2m = '28px';
fontSizes.h3 = '22px';

fontSizes.h3m = '18px';
fontSizes.subtitle = '24px';
fontSizes.subtitlem = '21px';
fontSizes.body = '17px';
fontSizes.caption = '14px';
fontSizes.button = '17px';
fontSizes.menu = '17px';
fontSizes.error = '14px';


const body = {
  m: 0,
  mb: '17px',
};

const h1 = {
  color: 'basic.5',
  fontSize: ['h1m', null, null, 'h1'],
  lineHeight: ['h1m', null, null, 'h1'],
  mt: 0,
  mb: 3,
};

const h2 = {
  color: 'basic.5',
  fontSize: ['h2m', null, null, 'h2'],
  lineHeight: ['h2m', null, null, 'h2'],
  mt: 0,
  mb: 3,
};

const h3 = {
  color: 'basic.5',
  fontSize: ['h3m', null, null, 'h3'],
  lineHeight: ['h3m', null, null, 'h3'],
  mt: 0,
  mb: 3,
};


const link = {
  display: 'inline',
  color: 'basic.5',
  textDecoration: 'none',
  boxShadow: 'inset 0px -2px 0 0 #FFC715',
  fontFamily: 'body',
  lineHeight: 'body',
  fontSize: 'body',
  transition: 'color 0.3s, box-shadow 0.3s',

  '&:hover': {
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: 'inset 0px -2px 0 0 #6B48FF',
  },

  '&:active': {
    color: 'secondary.0',
    boxShadow: 'inset 0px -2px 0 0 #6B48FF',
  },

  '&:focus': {
    outline: 'none',
    textDecoration: 'none',
    boxShadow: 'inset 0px -2px 0 0 #6B48FF',
  },

  '&.activeLink': {
    boxShadow: 'inset 0px -2px 0 0 #E0E0E0',

    '&:hover': {
      cursor: 'default',
      textDecoration: 'none',
    },
  },
};

const ul = {
  p: 0,
  m: 0,
  listStyle: 'none',

  '& > li': {
    position: 'relative',
    mb: 3,
    pl: '17px',
    lineHeight: 'body',
  },

  '& > li::before': {
    position: 'absolute',
    top: '12px',
    left: 0,
    content: '""',
    display: 'block',
    width: '5px',
    height: '5px',
    borderRadius: 'circle',
    flexShrink: 0,
    bg: 'secondary.0',
  },
};

const ol = {
  p: 0,
  m: 0,
  listStyle: 'none',
  counterReset: 'listCounter',

  '& > li': {
    position: 'relative',
    mb: 3,
    pl: '24px',
    counterIncrement: 'listCounter',
    lineHeight: 'body',
  },

  '& > li::before': {
    position: 'absolute',
    top: '1px',
    left: 0,
    content: 'counter(listCounter)',
    display: 'block',
    flexShrink: 0,
    color: 'secondary.0',
    fontFamily: 'body',
  },
};

/**
 * @see https://rebassjs.org/theming/
 */
export default {
  // Corner radius
  radii: {
    small: '6px',
    medium: '12px',
    large: '24px',
    circle: '50%',
  },
  shadows: {
    small: '0px 3px 0px rgba(0, 0, 0, 0.06)',
    medium: '0px 4px 16px rgba(0, 0, 0, 0.08)',
  },
  colors: {
    basic: [
      '#fff',
      '#F5F5F5',
      '#E0E0E0',
      '#9E9E9E',
      '#616161',
      '#1A1A1A',
    ],
    primary: '#FFC715',
    secondary: [
      '#6B48FF',
      '#5431E4',
      '#FCF8FF',
    ],
    ok: '#0ABF53',
    warn: '#FFEB3B',
    error: '#F44336',
  },
  /**
   * Typefaces
   */
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
    table: 'Roboto Slab, sans-serif',
  },
  fontSizes,
  breakpoints,
  space: [
    0, 4, 8, 16, 32, 64,
  ],
  fontWeights: {
    lightest: 100,
    lighter: 200,
    light: 300,
    normal: 400,
    bold: 700,
    bolder: 800,
    boldest: 900,
    heading: 700,
  },
  lineHeights: {
    body: '27px',
    button: '20px',
    menu: '20px',
    caption: '21px',
    subtitle: '32px',
    subtitlem: '28px',
    h1: '96px',
    h1m: '54px',
    h2: '48px',
    h2m: '36px',
    h3: '30px',
    h3m: '24px',
  },
  text: {
    h1,
    h2,
    h3,
    subtitle: {
      fontSize: '24px',
      lineHeight: '33px',
    },
    heading: {},
    error: {
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'error',
      fontSize: 'error',
    },
  },
  variants: {
    footerLink: {
      display: 'inline-block',
      color: 'basic.0',
      fontSize: 'body',
      fontFamily: 'body',
      lineHeight: 'body',
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },

      '&.activeLink': {
        textDecoration: 'underline',
      },
    },
    link,
    icon: {
      display: 'block',
    },
    content: {
      p: body,
      h1,
      h2,
      h3,
      a: link,
      body,
      ul,
      ol,
    },
    caption: {
      fontSize: 'caption',
      lineHeight: 'caption',
      mb: '14px',
    },
    ul,
    ol,
    tab: {
      px: 3,
      py: '14px',
      fontFamily: 'body',
      color: 'basic.4',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'basic.2',
      transition: 'box-shadow 0.3s, color 0.3s',

      '&:hover': {
        cursor: 'pointer',
        boxShadow: 'inset 0 -3px 0 #E0E0E0',
      },

      '&[data-active="true"]': {
        color: 'basic.5',
        fontWeight: '500',
        boxShadow: 'inset 0 -3px 0 #FFC715',
      },
    },
    card: {
      p: '24px',
      bg: 'basic.0',
      borderRadius: 'medium',
      boxShadow: 'small',
    },
    cardBorder: {
      p: '24px',
      bg: 'basic.0',
      borderRadius: 'medium',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'basic.2',
    },
    rubric: {
      display: 'inline-flex',
      alignItems: 'center',
      mb: 3,
      mr: 3,
      py: 2,
      px: '24px',
      borderRadius: '22px',
      bg: 'basic.1',
      color: 'basic.5',

      '&::before': {
        display: 'block',
        flexShrink: 0,
        content: '""',
        width: '8px',
        height: '8px',
        mr: 2,
        borderRadius: 'circle',
        bg: 'secondary.0',
      },
    },
    'field-error': {
      fontSize: 'caption',
      lineHeight: 'caption',
      color: 'error',
    },
    'form-error': {
      fontSize: 'caption',
      lineHeight: 'caption',
      bg: 'error',
      color: 'basic.0',
      borderRadius: 'small',
      textAlign: 'center',
      py: 2,
      px: 3,
      mb: 3,
    },
  },
  buttons: {
    primary: {
      px: '24px',
      py: '14px',
      fontFamily: 'body',
      fontSize: 'body',
      fontWeight: '500',
      lineHeight: 'button',
      outline: 0,
      bg: 'primary',
      color: 'basic.5',
      borderRadius: 'large',
      transition: 'box-shadow 0.3s, color 0.3s',

      '&:hover': {
        cursor: 'pointer',
        boxShadow: 'small',
      },
      '&:focus': {
        boxShadow: 'inset 0px 3px 0px rgba(0, 0, 0, 0.06)',
      },
      '&:active': {
        boxShadow: 'inset 0px 3px 0px rgba(0, 0, 0, 0.06)',
      },
      '&:disabled': {
        opacity: 0.4,
        boxShadow: 'none',

        '&:hover': {
          cursor: 'not-allowed',
          backgroundColor: 'none',
        },
      },
    },
    secondary: {
      borderRadius: 'large',
      fontFamily: 'body',
      fontSize: 'body',
      fontWeight: '500',
      lineHeight: 'button',
      outline: 0,
      bg: 'basic.0',
      px: '24px',
      py: '14px',
      color: 'basic.5',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'primary',
      transition: 'box-shadow 0.3s, border 0.3s, color 0.3s',

      '&:hover': {
        cursor: 'pointer',
        boxShadow: '0px 3px 0px rgba(0, 0, 0, 0.06)',
      },
      '&:focus': {
        borderColor: 'basic.2',
      },
      '&:active': {
        borderColor: 'basic.2',
      },
      '&:disabled:active': {
        borderColor: 'primary',
      },
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',

        '&:hover': {
          cursor: 'not-allowed',
          boxShadow: 'none',
        },
      },
    },
    secondaryLight: {
      borderRadius: 'large',
      fontFamily: 'body',
      fontSize: 'body',
      fontWeight: '500',
      lineHeight: 'button',
      outline: 0,
      bg: 'transparent',
      px: '24px',
      py: '14px',
      color: 'basic.0',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'primary',
      transition: 'border-color 0.3s, box-shadow 0.3s, color 0.3s',

      '&:hover': {
        cursor: 'pointer',
        boxShadow: 'small',
      },
      '&:focus': {
        borderColor: 'secondary.1',
      },
      '&:active': {
        borderColor: 'secondary.1',
      },
      '&:disabled:active': {
        borderColor: 'basic.0',
      },
      '&:disabled': {
        borderColor: 'basic.0',
        opacity: 0.4,
        cursor: 'not-allowed',

        '&:hover': {
          cursor: 'not-allowed',
          borderColor: 'basic.0',
        },
      },
    },
  },
  forms: {
    field: {
      boxShadow: 'small',
      borderRadius: 'large',
      transition: 'box-shadow 0.3s',

      '&[disabled]': {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      '&:hover': {
        boxShadow: 'medium',
      },
      '& input': {
        boxShadow: 'none',
        '&:focus': {
          boxShadow: 'none',
        },
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
    input: {
      outline: 'none',
      color: 'basic.5',
      bg: 'basic.0',
      borderRadius: 'large',
      borderColor: 'basic.2',
      boxShadow: 'small',
      fontSize: 'button',
      fontFamily: 'body',
      lineHeight: 'body',
      py: '10px',
      px: 3,
      height: '48px',
      minWidth: '255px',
      transition: 'background-color 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s',

      '&.error': {
        borderColor: 'rgba(244, 67, 54, 0.08)',
        bg: 'rgba(244, 67, 54, 0.08)',
        boxShadow: 'none',
      },
      '&::placeholder': {
        color: 'basic.3',
      },
      '&:hover': {
        boxShadow: 'medium',
      },
      '&:focus': {
        borderColor: 'primary',
        borderWidth: '2px',
        boxShadow: 'medium',
      },
      '&:disabled': {
        bg: 'basic.1',
        borderColor: 'basic.1',
        boxShadow: 'none',
        cursor: 'not-allowed',

        '&:hover': {
          borderColor: 'basic.1',
        },
      },
    },
    select: {
      outline: 'none',
      borderRadius: 'large',
      boxShadow: 'small',
      borderColor: 'basic.2',
      py: '10px',
      pl: '16px',
      pr: '44px',
      height: '48px',
      minWidth: '255px',
      fontSize: 'button',
      fontFamily: 'body',
      color: 'basic.5',
      lineHeight: 'body',
      transition: 'box-shadow 0.3s, border 0.3s, color 0.3s',

      '&.error': {
        borderColor: 'rgba(244, 67, 54, 0.08)',
        bg: 'rgba(244, 67, 54, 0.08)',
        boxShadow: 'none',
      },
      '&.error ~ svg': {
        stroke: 'error',
      },
      '& ~ svg': {
        position: 'absolute',
        stroke: 'primary',
        top: '50%',
        right: '11px',
        mt: '-10px',
        pointerEvents: 'none',
      },
      // to style placeholder
      '&:hover:invalid': {
        color: 'basic.3',
      },
      '&:focus:invalid': {
        color: 'basic.3',
      },
      '&:invalid': {
        color: 'basic.3',
      },
      '&:hover': {
        boxShadow: 'medium',
      },
      '&:focus': {
        borderWidth: '2px',
        borderColor: 'primary',
        boxShadow: 'medium',
      },
      '&:disabled': {
        borderColor: 'basic.1',
        bg: 'basic.1',
        color: 'basic.2',
        boxShadow: 'none',

        '& ~ svg': {
          stroke: 'basic.3',
        },
        '&:hover': {
          borderColor: 'basic.1',
        },
      },
    },
    label: {
      color: 'basic.5',
      fontSize: 'caption',
      lineHeight: 'caption',
      fontFamily: 'body',
      alignItems: 'center',
      transition: 'color 0.3s',

      '&:hover': {
        cursor: 'pointer',
      },

      '&[class*="disabled"]': {
        color: 'basic.4',
        cursor: 'not-allowed',
      },
    },
    checkbox: {
      width: '24px',
      minWidth: '24px',
      margin: 0,
      mr: '8px',
      padding: 0,
      borderRadius: 'small',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'basic.2',
      boxShadow: 'small',
      outline: 0,
      color: 'transparent',
      transition: 'box-shadow 0.3s, border 0.3s',

      '&.error': {
        borderWidth: '2px',
        borderColor: 'error',
      },
      '& svg': {
        stroke: 'primary',
        strokeWidth: 4,
      },
      '&:hover': {
        cursor: 'pointer',
        boxShadow: 'medium',
      },
      'input:focus ~ &': {
        boxShadow: 'medium',
        borderWidth: '2px',
        borderColor: 'primary',
      },
      'input:active ~ &': {
        boxShadow: 'medium',
        borderWidth: '2px',
        borderColor: 'primary',
      },
      'input:disabled:active ~ &': {
        borderWidth: '1px',
        borderColor: 'basic.2',
      },
      'input:disabled ~ &': {
        backgroundColor: 'basic.1',
        boxShadow: 'none',

        '&:hover': {
          cursor: 'not-allowed',
          boxShadow: 'none',
        },
        '& svg': {
          stroke: 'basic.2',
        },
      },
    },
    textarea: {
      outline: 0,
      fontSize: 'button',
      fontFamily: 'body',
      lineHeight: 'body',
      minWidth: '255px',
      height: '100px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'basic.2',
      borderRadius: 'medium',
      resize: 'none',
      py: '11px',
      px: '16px',
      color: 'basic.5',
      transition: 'box-shadow 0.3s, border 0.3s',

      '&.error': {
        borderColor: 'rgba(244, 67, 54, 0.08)',
        bg: 'rgba(244, 67, 54, 0.08)',
        boxShadow: 'none',
      },
      '&::placeholder': {
        color: 'basic.3',
      },
      '&:hover': {
        boxShadow: 'medium',
      },
      '&:hover::placeholder': {
        color: 'basic.3',
      },
      '&:focus': {
        borderColor: 'primary',
        borderWidth: '2px',
        boxShadow: 'medium',
      },
      '&:disabled': {
        bg: 'basic.1',
        color: 'basic.3',
        borderColor: 'basic.1',
        cursor: 'not-allowed',

        '&::placeholder': {
          color: 'basic.3',
        },
        '&:hover': {
          borderColor: 'basic.1',
          boxShadow: 'none',
        },
      },
    },
    radio: {
      width: '24px',
      height: '24px',
      bg: 'basic.0',
      borderRadius: 'circle',
      boxShadow: 'small',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'basic.2',
      mr: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'box-shadow 0.3s, border 0.3s',

      '&.error': {
        borderWidth: '2px',
        borderColor: 'error',
        boxShadow: 'none',
      },
      '&:hover': {
        boxShadow: 'medium',
      },
      'input:focus ~ &': {
        borderColor: 'primary',
        borderWidth: '2px',
      },
      'input:checked ~ &': {
        '&::after': {
          content: '""',
          width: '8px',
          height: '8px',
          display: 'block',
          borderRadius: 'circle',
          backgroundColor: 'primary',
        },
      },
      'input:disabled ~ &': {
        borderColor: 'basic.2',
        boxShadow: 'none',
        bg: 'basic.1',
      },
      'input:disabled:checked ~ &': {
        '&::after': {
          content: '""',
          backgroundColor: 'basic.3',
        },
      },
    },
  },
  'bw-icons': {
    calendar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '1px',
      right: 0,
      bottom: '1px',
      width: '46px',
      height: '46px',
      p: 0,
      bg: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 'circle',
      outline: 0,
      transition: 'border 0.3s',

      'input.error ~ & svg': {
        stroke: 'error',
      },
      '& svg': {
        stroke: 'primary',
      },
      'input:disabled ~ & svg': {
        stroke: 'basic.3',
      },
      'input:disabled ~ &:hover': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
      },
      'input:disabled ~ &:active': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
        borderWidth: '1px',
      },
      'input:disabled ~ &:focus': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
        borderWidth: '1px',
      },
      '&:hover': {
        cursor: 'pointer',
        borderColor: 'primary',
      },
      '&:active': {
        borderWidth: '2px',
        borderColor: 'primary',
      },
      '&:focus': {
        borderWidth: '2px',
        borderColor: 'primary',
      },
      '&:active svg': {
        stroke: 'primary',
      },
      '&:focus svg': {
        stroke: 'primary',
      },
      'input:focus ~ &:hover': {
        borderColor: 'primary',
      },
    },
    plus: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '1px',
      right: 0,
      bottom: '1px',
      width: '46px',
      height: '46px',
      p: 0,
      bg: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 'circle',
      outline: 0,
      transition: 'border 0.3s',

      '&.error svg': {
        stroke: 'error',
      },
      '& svg': {
        stroke: 'primary',
      },
      '&:disabled svg': {
        stroke: 'basic.3',
      },
      '&:disabled:active svg': {
        stroke: 'basic.3',
      },
      '&:disabled:hover': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
      },
      '&:disabled:active': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
        borderWidth: '1px',
      },
      '&:disabled:focus': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
        borderWidth: '1px',
      },
      '&:hover': {
        cursor: 'pointer',
        borderColor: 'primary',
      },
      '&:active': {
        borderWidth: '2px',
        borderColor: 'primary',
      },
      '&:focus': {
        borderwidth: '2px',
        bordercolor: 'primary',
      },
      '&:active svg': {
        stroke: 'primary',
      },
      '&:focus svg': {
        stroke: 'primary',
      },
      'input:focus ~ &:hover': {
        borderColor: 'primary',
      },
    },
    minus: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '1px',
      left: 0,
      bottom: '1px',
      width: '46px',
      height: '46px',
      p: 0,
      bg: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 'circle',
      outline: 0,
      transition: 'border 0.3s',

      '&.error svg': {
        stroke: 'error',
      },
      '& svg': {
        stroke: 'primary',
      },
      '&:disabled svg': {
        stroke: 'basic.3',
      },
      '&:disabled:active svg': {
        stroke: 'basic.3',
      },
      '&:disabled:hover': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
      },
      '&:disabled:active': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
        borderWidth: '1px',
      },
      '&:disabled:focus': {
        cursor: 'not-allowed',
        borderColor: 'transparent',
        borderWidth: '1px',
      },
      '&:hover': {
        cursor: 'pointer',
        borderColor: 'primary',
      },
      '&:active': {
        borderWidth: '2px',
        borderColor: 'primary',
      },
      '&:focus': {
        borderwidth: '2px',
        bordercolor: 'primary',
      },
      '&:active svg': {
        stroke: 'primary',
      },
      '&:focus svg': {
        stroke: 'primary',
      },
      'input:focus ~ &:hover': {
        borderColor: 'primary',
      },
    },
  },
};
