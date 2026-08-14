/* There is no photography of this apartment, so the apartment is drawn. A
   measured plan tells you more about a place you are about to rent than a
   wide-angle shot does anyway: where the light comes from, what you can move,
   and where twenty people actually fit. */
export default function Plan() {
  return (
    <figure className="frame plan">
      {/* viewBox is cropped to the drawing's own extents — no dead margin */}
      <svg className="plan__svg" viewBox="96 66 1074 636" role="img" aria-labelledby="plan-title">
        <title id="plan-title">
          Measured plan of the loft: 14.2 by 7.3 metres, kitchen at the north-west corner,
          bathroom south-west, full-height glazing and a balcony along the south-west wall,
          two original columns, and a seating group facing the television.
        </title>

        {/* dimensions */}
        <g className="plan__dim">
          <path d="M150 96 L1060 96 M150 88 L150 104 M1060 88 L1060 104" />
          <path d="M116 130 L116 600 M108 130 L124 130 M108 600 L124 600" />
        </g>
        <text className="plan__ink" x="576" y="86" textAnchor="middle">14.2 m</text>
        <text className="plan__ink" transform="translate(108 380) rotate(-90)" textAnchor="middle">7.3 m</text>

        {/* shell */}
        <rect className="plan__wall" x="150" y="130" width="910" height="470" />

        {/* glazing along the city wall, with the balcony door left open */}
        <g className="plan__glass">
          <path d="M1060 130 L1060 372 M1060 452 L1060 600" />
          <path d="M1052 130 L1052 372 M1052 452 L1052 600" />
        </g>
        <g className="plan__dim">
          <path d="M1056 170 L1056 170 M1060 200 L1052 200 M1060 250 L1052 250 M1060 300 L1052 300 M1060 500 L1052 500 M1060 550 L1052 550" />
        </g>

        {/* balcony */}
        <g className="plan__furn" strokeDasharray="5 4">
          <rect x="1060" y="352" width="86" height="120" />
        </g>
        <path className="plan__inner" d="M1146 352 L1146 472" />

        {/* kitchen */}
        <rect className="plan__inner" x="150" y="130" width="270" height="140" />
        <rect className="plan__fill" x="158" y="242" width="254" height="20" />
        <path className="plan__furn" d="M300 242 L300 262 M356 242 L356 262" />
        <text className="plan__ink plan__ink--strong" x="172" y="164">Kitchen</text>
        <text className="plan__ink" x="172" y="184">Gas · tiled · loud</text>

        {/* bathroom */}
        <rect className="plan__inner" x="150" y="460" width="150" height="140" />
        <text className="plan__ink plan__ink--strong" x="168" y="492">Bath</text>

        {/* entry */}
        <path className="plan__wall" d="M150 320 L150 390" stroke="none" />
        <path className="plan__furn" d="M150 320 L220 320 M150 320 A70 70 0 0 1 220 390" />
        <text className="plan__ink" x="236" y="336">Entry · buzzer 4R</text>

        {/* original columns */}
        <rect className="plan__fill" x="490" y="292" width="22" height="22" />
        <rect className="plan__fill" x="490" y="460" width="22" height="22" />
        <path className="plan__lead" d="M512 303 L600 268" />
        <text className="plan__ink" x="606" y="264">Columns, original</text>

        {/* table */}
        <rect className="plan__furn" x="262" y="322" width="170" height="108" rx="3" />
        <path className="plan__furn" d="M262 358 L242 358 M262 394 L242 394 M432 358 L452 358 M432 394 L452 394" />
        <text className="plan__ink" x="272" y="452">Table, seats ten</text>

        {/* seating group */}
        <rect className="plan__furn" x="620" y="376" width="240" height="86" rx="4" />
        <path className="plan__furn" d="M620 462 L860 462" />
        <text className="plan__ink" x="632" y="404">Sofa · seats six</text>
        <rect className="plan__furn" x="880" y="392" width="70" height="70" rx="3" />

        {/* television wall */}
        <rect className="plan__fill" x="700" y="524" width="100" height="44" />
        <path className="plan__lead" d="M750 524 L750 496" />
        <text className="plan__ink plan__ink--strong" x="750" y="490" textAnchor="middle">CRT + stand</text>
        <rect className="plan__furn" x="646" y="524" width="28" height="52" />
        <rect className="plan__furn" x="826" y="524" width="28" height="52" />
        <text className="plan__ink" x="866" y="560">Speakers</text>

        {/* the empty middle is the point of the place — so it gets named */}
        <rect
          className="plan__furn"
          strokeDasharray="4 5"
          x="700"
          y="292"
          width="330"
          height="68"
          rx="34"
        />
        <text className="plan__ink" x="865" y="332" textAnchor="middle">
          Open floor
        </text>

        {/* record player */}
        <rect className="plan__furn" x="552" y="176" width="86" height="62" rx="2" />
        <path className="plan__lead" d="M638 206 L700 206" />
        <text className="plan__ink" x="706" y="202">Record player</text>

        {/* the light, labelled along the wall it comes through */}
        <text className="plan__ink" transform="translate(1034 300) rotate(-90)" textAnchor="middle">
          Glazing, floor to ceiling
        </text>
        <path className="plan__lead" d="M1103 352 L1103 316" />
        <text className="plan__ink" x="1103" y="308" textAnchor="middle">Balcony</text>

        {/* north + scale */}
        <g className="plan__dim">
          <path d="M1150 150 L1150 96 M1144 108 L1150 96 L1156 108" />
        </g>
        <text className="plan__ink" x="1150" y="168" textAnchor="middle">N</text>

        <g className="plan__dim">
          <path d="M150 656 L470 656 M150 648 L150 664 M310 650 L310 662 M470 648 L470 664" />
        </g>
        <rect className="plan__fill" x="150" y="652" width="160" height="8" />
        <text className="plan__ink" x="150" y="682">0</text>
        <text className="plan__ink" x="470" y="682" textAnchor="end">5 m</text>

        <text className="plan__ink plan__ink--strong" x="1060" y="668" textAnchor="end">
          Fourth floor · 4R · no lift
        </text>
        <text className="plan__ink" x="1060" y="688" textAnchor="end">
          103 m² · 20 people
        </text>
      </svg>
      <figcaption className="frame__cap">Measured on site, 2003</figcaption>
    </figure>
  );
}
