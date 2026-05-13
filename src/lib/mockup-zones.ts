export interface PrintZone {
  top: string;
  left: string;
  width: string;
  height: string;
  shape?: 'circle';
  borderRadius?: string;
}

/**
 * Print zone positions as percentages of the square mockup canvas.
 * Used to overlay the generated design on top of the product mockup.
 * Design is clipped by overflow:hidden on the container div.
 */
export const MOCKUP_PRINT_ZONES: Record<string, PrintZone> = {
  't-shirt':        { top: '35%',   left: '32.5%', width: '35%',   height: '34%'    },
  'hoodie':         { top: '40%',   left: '34%',   width: '32%',   height: '28.5%'  },
  'poster':         { top: '7.5%',  left: '7.5%',  width: '85%',   height: '85%'    },
  'capa-telemovel': { top: '22.5%', left: '29.25%',width: '41.5%', height: '65%',   borderRadius: '4%' },
  'caneca':         { top: '34.5%', left: '27.5%', width: '42%',   height: '38%'    },
  'autocolantes':   { top: '13%',   left: '13%',   width: '74%',   height: '74%',   shape: 'circle' },
  'tote-bag':       { top: '35%',   left: '25%',   width: '50%',   height: '46.25%' },
  'quadro':         { top: '12.5%', left: '12.5%', width: '75%',   height: '75%'    },
};
