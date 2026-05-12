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
  't-shirt':        { top: '28%',  left: '31.5%', width: '37%',  height: '35%'   },
  'hoodie':         { top: '35%',  left: '32.5%', width: '35%',  height: '28%'   },
  'poster':         { top: '7.5%', left: '7.5%',  width: '85%',  height: '85%'   },
  'capa-telemovel': { top: '15%',  left: '20%',   width: '60%',  height: '70%',  borderRadius: '8%' },
  'caneca':         { top: '32%',  left: '29%',   width: '42%',  height: '38%'   },
  'autocolantes':   { top: '13%',  left: '13%',   width: '74%',  height: '74%',  shape: 'circle' },
  'tote-bag':       { top: '28%',  left: '27.5%', width: '45%',  height: '44%'   },
  'quadro':         { top: '12.5%',left: '12.5%', width: '75%',  height: '75%'   },
};
