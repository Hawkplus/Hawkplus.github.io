import type { Project } from '../content'

// Original illustrations: these are conceptual artwork, never product screenshots.
export function ProjectArt({ visual }: { visual: Project['visual'] }) {
  if (visual === 'language') {
    return (
      <figure className="project-art language-art" aria-label="六级学习网站的原创概念图，不是产品截图">
        <div className="visual-heading"><span lang="en">English, in context.</span><span className="small-orbit" /></div>
        <svg className="language-illustration" viewBox="0 0 600 420" fill="none" aria-hidden="true">
          <g stroke="#9ba891" strokeWidth=".8" opacity=".35"><circle cx="310" cy="210" r="168" /><circle cx="310" cy="210" r="134" /><path d="M40 210h520M310 44v332" strokeDasharray="2 8" /></g>
          <g className="book-back" transform="translate(195 72) rotate(9 118 150)"><rect width="236" height="287" rx="4" fill="#71816a" /><path d="M18 0v287" stroke="#9ba891" /><path d="M50 229h109M50 243h85" stroke="#a8b49c" /></g>
          <g className="book-front" transform="translate(153 65) rotate(-9 118 150)">
            <rect x="5" y="6" width="234" height="288" rx="4" fill="#172e25" opacity=".25" />
            <rect width="236" height="287" rx="3" fill="#ecefdd" />
            <path d="M18 0v287" stroke="#bcc7ad" />
            <path d="M39 37h164" stroke="#bec9b3" />
            <text x="39" y="62" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fill="#56684a">A place for every word.</text>
            <text x="32" y="194" fontFamily="Georgia, serif" fontSize="117" letterSpacing="-9" fill="#243d34">Aa<tspan fill="#b33124">.</tspan></text>
            <path d="M39 224h164" stroke="#bec9b3" />
            <text x="39" y="250" fontFamily="Georgia, serif" fontSize="12" fill="#56684a">Collect. Revisit. Remember.</text>
            <path d="M183 0v33l8-6 8 6V0" fill="#b33124" />
          </g>
          <path d="M80 308c39 0 64-15 78-43M443 128c28 10 51 33 57 62" stroke="#b4c1a5" strokeWidth="1" />
          <circle cx="80" cy="308" r="3" fill="#e4aa91" /><circle cx="500" cy="190" r="3" fill="#b4c1a5" />
        </svg>
        <span className="visual-caption">词句之间，慢慢积累。</span>
        <figcaption>原创概念图</figcaption>
      </figure>
    )
  }
  return (
    <figure className="project-art research-art" aria-label="科研工作台的原创概念图，不是产品截图">
      <div className="visual-heading"><span lang="en">A space for connections.</span><span className="small-orbit" /></div>
      <svg className="research-illustration" viewBox="0 0 600 420" fill="none" aria-hidden="true">
        <g stroke="#a8b6a0" strokeWidth=".8" opacity=".5"><path d="M0 105h600M0 210h600M0 315h600M100 0v420M300 0v420M500 0v420" strokeDasharray="2 8" /><circle cx="300" cy="210" r="148" /></g>
        <path d="M76 278C132 278 136 107 213 107S333 310 412 310 477 143 525 143" stroke="#71876b" strokeWidth="1.2" />
        <g className="research-sheet" transform="translate(150 67) rotate(-10 106 130)">
          <rect x="4" y="5" width="216" height="258" rx="3" fill="#667c5b" opacity=".1" /><rect width="216" height="258" rx="3" fill="#f7f8f0" stroke="#b3c0a9" />
          <path d="M26 34h49" stroke="#5a7054" strokeWidth="3" /><path d="M26 52h113M26 98h164M26 117h164M26 136h136M26 206h86M26 222h57" stroke="#bbc5b1" strokeWidth="2" />
          <circle cx="186" cy="35" r="6" stroke="#8a9e7e" /><path d="M183 35h6M186 32v6" stroke="#8a9e7e" />
        </g>
        <g className="research-note" transform="translate(279 129) rotate(9 86 89)">
          <rect x="4" y="4" width="182" height="186" rx="3" fill="#667c5b" opacity=".12" /><rect width="182" height="186" rx="3" fill="#dce5cf" stroke="#a5b598" />
          <circle cx="91" cy="85" r="45" stroke="#90a181" /><path d="M43 107 77 65 113 104 141 57" stroke="#5a7550" strokeWidth="1.5" />
          <g fill="#516a48"><circle cx="43" cy="107" r="4" /><circle cx="77" cy="65" r="4" /><circle cx="113" cy="104" r="4" /></g><circle cx="141" cy="57" r="4" fill="#b33124" />
          <path d="M25 154h79" stroke="#9dac90" strokeWidth="2" />
        </g>
        <g fill="#71876b"><circle cx="76" cy="278" r="3" /><circle cx="525" cy="143" r="3" /></g>
      </svg>
      <span className="visual-caption">让线索，慢慢连成思路。</span>
      <figcaption>原创概念图</figcaption>
    </figure>
  )
}

export function OpenPathArt() {
  return (
    <svg className="open-path-art" viewBox="0 0 220 190" fill="none" aria-hidden="true">
      <circle cx="110" cy="95" r="72" stroke="#748869" strokeDasharray="2 7" opacity=".5" />
      {Array.from({ length: 9 }, (_, index) => <path key={index} d={`M ${33 + index * 2} ${145 + index * 2} C ${32 + index * 2} ${60 + index * 2}, ${130 - index * 2} ${17 + index * 2}, ${169 - index * 2} ${67 + index * 2} S ${161 - index * 2} ${157 - index * 2}, ${109 + index * 2} ${122 - index * 2} S ${154 + index * 2} ${62 - index * 2}, ${193 - index} ${41 + index}`} stroke="#788c6b" strokeWidth=".8" />)}
      <path d="M41 153C40 68 122 25 161 75S153 149 117 114 162 54 189 45" stroke="#b33124" strokeWidth="1.4" /><circle cx="189" cy="45" r="3" fill="#b33124" />
    </svg>
  )
}
