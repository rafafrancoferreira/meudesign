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
  't-shirt':        { top: '28%',  left: '30%',   width: '40%',  height: '35%'   },
  'hoodie':         { top: '32%',  left: '28%',   width: '44%',  height: '32%'   },
  'poster':         { top: '10%',  left: '10%',   width: '80%',  height: '80%'   },
  'capa-telemovel': { top: '20%',  left: '15%',   width: '70%',  height: '55%',  borderRadius: '8%' },
  'caneca':         { top: '25%',  left: '20%',   width: '45%',  height: '50%'   },
  'autocolantes':   { top: '15%',  left: '15%',   width: '70%',  height: '70%',  shape: 'circle' },
  'tote-bag':       { top: '25%',  left: '22%',   width: '56%',  height: '45%'   },
  'quadro':         { top: '12%',  left: '12%',   width: '76%',  height: '76%'   },
};
