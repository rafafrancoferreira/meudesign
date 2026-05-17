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
  't-shirt':        { top: '30%',  left: '29%',  width: '42%',  height: '34%'  },
  'hoodie':         { top: '30%',  left: '29%',  width: '42%',  height: '34%'  },
  'poster':         { top: '11%',  left: '11%',  width: '78%',  height: '78%'  },
  'capa-telemovel': { top: '20%',  left: '15%',  width: '70%',  height: '55%', borderRadius: '4%' },
  'caneca':         { top: '25%',  left: '20%',  width: '45%',  height: '50%'  },
  'autocolantes':   { top: '13%',  left: '13%',  width: '74%',  height: '74%', shape: 'circle' },
  'tote-bag':       { top: '25%',  left: '22%',  width: '56%',  height: '45%'  },
  'quadro':         { top: '11%',  left: '11%',  width: '78%',  height: '78%'  },
};
