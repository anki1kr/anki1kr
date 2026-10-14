// Builds every panel on the profile README. Numbers and role orders come from profile-data.json
// (exported from the DSA Tracker code), nothing here is typed by hand. Each panel is one SVG with its own
// CSS animation, dark and light, and rests in a readable state when the reader prefers reduced motion.
// Run: node assets/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(HERE, "profile-data.json"), "utf8"));
const N = D.numbers;

const THEMES = {
  dark: { canvas: "#0d1117", panel: "#161b22", line: "#30363d", ink: "#e6edf3", soft: "#c9d1d9", muted: "#8b949e", accent: "#a78bfa", glow: "#d2a8ff", ok: "#3fb950", bad: "#f85149" },
  light: { canvas: "#ffffff", panel: "#f6f8fa", line: "#d0d7de", ink: "#1f2328", soft: "#424a53", muted: "#59636e", accent: "#6639ba", glow: "#8250df", ok: "#1a7f37", bad: "#cf222e" },
};
const SANS = "-apple-system, 'Segoe UI', Inter, Roboto, 'Helvetica Neue', Arial, sans-serif";
const MONO = "'Cascadia Code', Consolas, 'SF Mono', Menlo, monospace";
const W = 1200;
const REDUCED = "@media (prefers-reduced-motion: reduce){*{animation:none!important}}";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pc = (s, cyc) => ((100 * s) / cyc).toFixed(2) + "%";

const svgOpen = (h, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(label)}">`;
const frame = (T, h, title, note) =>
  `<rect x="0.5" y="0.5" width="${W - 1}" height="${h - 1}" rx="14" fill="${T.panel}" stroke="${T.line}"/>` +
  `<text x="36" y="46" font-family="${SANS}" font-weight="600" font-size="18" fill="${T.ink}">${esc(title)}</text>` +
  (note ? `<text x="${W - 36}" y="44" text-anchor="end" font-family="${MONO}" font-size="13" fill="${T.muted}">${esc(note)}</text>` : "");
const mono = (T, x, y, size, text, extra = "") => `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" fill="${T.muted}" ${extra}>${esc(text)}</text>`;
const sans = (T, x, y, size, text, fill, extra = "") => `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size}" fill="${fill}" ${extra}>${esc(text)}</text>`;

/* 1. header: name, one line, and a breadth-first search over the five real sections of anki1kr.me */
function header(T) {
  const NODES = { About: [830, 92], Skills: [990, 58], Projects: [910, 190], Education: [1120, 128], Contact: [1060, 250] };
  const EDGES = [["About", "Skills"], ["About", "Projects"], ["Skills", "Education"], ["Projects", "Contact"], ["Education", "Contact"]];
  const VISITS = [
    { node: "About", t: 1.0, queue: "Skills, Projects" }, { node: "Skills", t: 2.2, queue: "Projects, Education" },
    { node: "Projects", t: 3.4, queue: "Education, Contact" }, { node: "Education", t: 4.6, queue: "Contact" }, { node: "Contact", t: 5.8, queue: "" },
  ];
  const SIDE = { About: "left", Skills: "right", Projects: "right", Education: "below", Contact: "left" };
  const CYC = 10, RESET = 9.2, DRAW = 0.7, vt = (n) => VISITS.find((v) => v.node === n).t;
  let css = REDUCED, g = "";
  EDGES.forEach(([a, b], i) => {
    const [x1, y1] = NODES[a], [x2, y2] = NODES[b], len = Math.hypot(x2 - x1, y2 - y1).toFixed(1);
    const t0 = vt(a) + 0.15, t1 = Math.min(t0 + DRAW, vt(b));
    css += `.e${i}{stroke-dasharray:${len};animation:e${i} ${CYC}s linear infinite}@keyframes e${i}{0%,${pc(t0, CYC)}{stroke-dashoffset:${len}}${pc(t1, CYC)},${pc(RESET, CYC)}{stroke-dashoffset:0}${pc(RESET + 0.01, CYC)},100%{stroke-dashoffset:${len}}}`;
    g += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${T.line}" stroke-width="1.5"/><line class="e${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${T.accent}" stroke-width="2" stroke-linecap="round"/>`;
  });
  VISITS.forEach(({ node, t }, i) => {
    const [x, y] = NODES[node], s = SIDE[node];
    css += `.n${i}{fill:${T.accent};animation:n${i} ${CYC}s step-end infinite}@keyframes n${i}{0%,${pc(t, CYC)}{fill:${T.canvas}}${pc(t + 0.01, CYC)},${pc(RESET, CYC)}{fill:${T.accent}}${pc(RESET + 0.01, CYC)},100%{fill:${T.canvas}}}` +
      `.l${i}{fill:${T.ink};animation:l${i} ${CYC}s step-end infinite}@keyframes l${i}{0%,${pc(t, CYC)}{fill:${T.muted}}${pc(t + 0.01, CYC)},${pc(RESET, CYC)}{fill:${T.ink}}${pc(RESET + 0.01, CYC)},100%{fill:${T.muted}}}` +
      `.r${i}{opacity:0;transform-box:view-box;transform-origin:${x}px ${y}px;animation:r${i} ${CYC}s ease-out infinite}@keyframes r${i}{0%,${pc(t, CYC)}{opacity:0;transform:scale(.4)}${pc(t + 0.05, CYC)}{opacity:.55;transform:scale(.6)}${pc(t + 0.9, CYC)},100%{opacity:0;transform:scale(2.6)}}`;
    const lx = s === "left" ? x - 14 : s === "right" ? x + 14 : x, ly = s === "below" ? y + 26 : y + 5, anchor = s === "left" ? "end" : s === "right" ? "start" : "middle";
    g += `<circle class="r${i}" cx="${x}" cy="${y}" r="9" fill="none" stroke="${T.glow}" stroke-width="1.5"/><circle class="n${i}" cx="${x}" cy="${y}" r="7" stroke="${T.accent}" stroke-width="2"/>` +
      `<text class="l${i}" x="${lx}" y="${ly}" text-anchor="${anchor}" font-family="${MONO}" font-size="15">${node}</text>`;
  });
  const lines = [{ t: 0, text: "bfs from About" }].concat(VISITS.map((v) => ({ t: v.t, text: v.queue ? `visit ${v.node} · queue [${v.queue}]` : `visit ${v.node} · queue [] · 5 of 5 reached` })));
  lines.forEach((l, i) => {
    const next = i + 1 < lines.length ? lines[i + 1].t : RESET, last = i === lines.length - 1;
    css += `.q${i}{opacity:${last ? 1 : 0};animation:q${i} ${CYC}s step-end infinite}@keyframes q${i}{0%{opacity:${i === 0 ? 1 : 0}}${pc(l.t, CYC)}{opacity:1}${pc(next, CYC)}{opacity:${last ? 1 : 0}}${pc(RESET + 0.01, CYC)}{opacity:${i === 0 ? 1 : 0}}100%{opacity:${i === 0 ? 1 : 0}}}`;
    g += `<text class="q${i}" x="1160" y="296" text-anchor="end" font-family="${MONO}" font-size="13" fill="${T.muted}">${l.text}</text>`;
  });
  return svgOpen(320, "Ankit Kumar. I build things that read, reason and render. A breadth-first search walks the five sections of the portfolio at anki1kr.me: About, Skills, Projects, Education, Contact.") +
    `<style>${css}</style><rect width="${W}" height="320" fill="${T.canvas}"/>` +
    `<text x="36" y="150" font-family="${SANS}" font-weight="700" font-size="92" letter-spacing="-2.5" fill="${T.ink}">Ankit Kumar</text>` +
    sans(T, 40, 204, 28, "I build things that read, reason & render.", T.soft) +
    sans(T, 40, 244, 17, "A DSA prep platform in production, a WebGL portfolio you fly through,", T.muted) +
    sans(T, 40, 268, 17, "and pull requests to the LLM routers those projects depend on.", T.muted) +
    `<g>${g}</g></svg>\n`;
}

/* 2. stats: six counted numbers, each digit rolls into place once */
function stats(T) {
  const H = 170, LH = 56;
  const items = [[N.problems, "problems"], [N.roles, "job roles"], [N.languages, "languages judged"], [N.platforms, "platforms synced"], [N.prs, "pull requests"], [N.products, "products live"]];
  let css = REDUCED, g = "", clips = "";
  for (let d = 0; d < 10; d++) css += `@keyframes roll${d}{to{transform:translateY(-${d * LH}px)}}@media (prefers-reduced-motion: reduce){.d${d}{transform:translateY(-${d * LH}px)}}`;
  const cellW = (W - 72) / items.length;
  items.forEach(([val, label], i) => {
    const x0 = 36 + i * cellW + 16, digits = String(val).split("");
    digits.forEach((d, j) => {
      const x = x0 + j * 27, id = `c${i}${j}`;
      clips += `<clipPath id="${id}"><rect x="${x - 2}" y="62" width="30" height="${LH}"/></clipPath>`;
      const spans = Array.from({ length: 10 }, (_, k) => `<tspan x="${x}" dy="${k ? LH : 0}">${k}</tspan>`).join("");
      g += `<g clip-path="url(#${id})"><text class="d${d}" x="${x}" y="104" font-family="${SANS}" font-weight="700" font-size="44" fill="${T.ink}" style="animation:roll${d} 1.3s cubic-bezier(.2,.8,.2,1) ${(0.1 * i + 0.08 * j).toFixed(2)}s forwards">${spans}</text></g>`;
    });
    g += mono(T, x0, 140, 14, label);
    if (i) g += `<line x1="${36 + i * cellW}" y1="62" x2="${36 + i * cellW}" y2="150" stroke="${T.line}"/>`;
  });
  return svgOpen(H, `${N.problems} problems, ${N.roles} job roles, ${N.languages} languages judged, ${N.platforms} platforms synced, ${N.prs} pull requests, ${N.products} products live.`) +
    `<style>${css}</style><defs>${clips}</defs>` + frame(T, H, "Counted from the code and from GitHub", "14 Oct 2026") + g + `</svg>\n`;
}

/* 3. timeline: the road so far, drawn once */
function timeline(T) {
  const H = 250, y = 112;
  const years = [
    { x: 120, year: "2024", lines: ["Joined GitHub"] },
    { x: 470, year: "2025", lines: ["Python and SQL foundations", "First notebooks"] },
    { x: 820, year: "2026", lines: ["Orbit, an LLM browser agent as a Chrome extension", `${N.prs} pull requests to 9router and OmniRoute`, "DSA Tracker live at dsatracker.tech", "The flight portfolio at anki1kr.me"] },
  ];
  let css = REDUCED + `.rail{stroke-dasharray:1040;stroke-dashoffset:1040;animation:rail 1.8s cubic-bezier(.3,.7,.2,1) .2s forwards}@keyframes rail{to{stroke-dashoffset:0}}`;
  let g = `<line x1="100" y1="${y}" x2="1140" y2="${y}" stroke="${T.line}" stroke-width="2"/><line class="rail" x1="100" y1="${y}" x2="1140" y2="${y}" stroke="${T.accent}" stroke-width="2"/>`;
  years.forEach((Y, i) => {
    const d = 0.35 + i * 0.6;
    css += `.y${i}{opacity:0;animation:pop ${0.5}s cubic-bezier(.2,.8,.2,1) ${d.toFixed(2)}s forwards}`;
    g += `<g class="y${i}"><circle cx="${Y.x}" cy="${y}" r="8" fill="${T.panel}" stroke="${T.accent}" stroke-width="2.5"/>` +
      `<text x="${Y.x}" y="${y - 24}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="24" fill="${T.ink}">${Y.year}</text>` +
      Y.lines.map((l, k) => `<text x="${Y.x - 8}" y="${y + 40 + k * 22}" font-family="${SANS}" font-size="15" fill="${k ? T.muted : T.soft}">${esc(l)}</text>`).join("") + `</g>`;
  });
  css += `@keyframes pop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){.y0,.y1,.y2{opacity:1}.rail{stroke-dashoffset:0}}`;
  return svgOpen(H, "Timeline: 2024 joined GitHub; 2025 Python and SQL foundations; 2026 Orbit, 31 pull requests, DSA Tracker live, the flight portfolio.") +
    `<style>${css}</style>` + frame(T, H, "The road so far") + g + `</svg>\n`;
}

/* 4. two sum: one of the walkthroughs DSA Tracker draws, one pass with a hash map */
function twoSum(T) {
  const H = 300, nums = [11, 3, 15, 2, 7, 5], target = 9, CYC = 10;
  const cx = (i) => 36 + 20 + i * 118, cw = 100, cy = 112, ch = 66;   // cells sit below the nums line and its index row
  let css = REDUCED + `.ptr{animation:walk ${CYC}s ease-in-out infinite}@keyframes walk{0%,11%{transform:translateX(0)}12%,23%{transform:translateX(118px)}24%,35%{transform:translateX(236px)}36%,47%{transform:translateX(354px)}48%,95%{transform:translateX(472px)}100%{transform:translateX(0)}}`;
  const seen = [["11 → 0", 12], ["3 → 1", 24], ["15 → 2", 36], ["2 → 3", 48]];
  seen.forEach((s, i) => { css += `.s${i}{animation:s${i} ${CYC}s infinite}@keyframes s${i}{0%,${s[1] - 1}%{opacity:0}${s[1]}%,95%{opacity:1}100%{opacity:0}}`; });
  css += `.win{animation:win ${CYC}s infinite}@keyframes win{0%,51%{opacity:0}54%,95%{opacity:1}100%{opacity:0}}`;
  const caps = ["need 9 − 11 = −2 · not seen yet · remember 11", "need 9 − 3 = 6 · not seen yet · remember 3", "need 9 − 15 = −6 · not seen yet · remember 15", "need 9 − 2 = 7 · not seen yet · remember 2"];
  caps.forEach((c, i) => { css += `.c${i}{animation:c${i} ${CYC}s step-end infinite}@keyframes c${i}{0%,${i * 12 - 1 < 0 ? 0 : i * 12 - 1}%{opacity:${i ? 0 : 1}}${i * 12}%,${i * 12 + 11}%{opacity:1}${i * 12 + 12}%,100%{opacity:0}}`; });
  css += `.c4{animation:c4 ${CYC}s step-end infinite}@keyframes c4{0%,47%{opacity:0}48%,95%{opacity:1}100%{opacity:0}}` +
    `@media (prefers-reduced-motion: reduce){.ptr{transform:translateX(472px)}.s0,.s1,.s2,.s3,.win,.c4{opacity:1}.c0,.c1,.c2,.c3{opacity:0}}`;
  let g = "";
  nums.forEach((n, i) => {
    g += `<rect x="${cx(i)}" y="${cy}" width="${cw}" height="${ch}" rx="10" fill="${T.canvas}" stroke="${T.line}" stroke-width="1.5"/>` +
      `<text x="${cx(i) + cw / 2}" y="${cy + 43}" text-anchor="middle" font-family="${MONO}" font-size="26" fill="${T.ink}">${n}</text>` +
      `<text x="${cx(i) + cw / 2}" y="${cy - 12}" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${T.muted}">${i}</text>`;
  });
  g += `<g class="win"><rect x="${cx(3) - 3}" y="${cy - 3}" width="${cw + 6}" height="${ch + 6}" rx="12" fill="none" stroke="${T.ok}" stroke-width="3"/><rect x="${cx(4) - 3}" y="${cy - 3}" width="${cw + 6}" height="${ch + 6}" rx="12" fill="none" stroke="${T.ok}" stroke-width="3"/></g>`;
  g += `<g class="ptr"><path d="M${cx(0) + cw / 2} ${cy + ch + 10} l-8 12 h16 z" fill="${T.accent}"/><text x="${cx(0) + cw / 2}" y="${cy + ch + 42}" text-anchor="middle" font-family="${MONO}" font-size="15" fill="${T.accent}">i</text></g>`;
  g += mono(T, 790, 96, 14, "seen");
  seen.forEach((s, i) => { g += `<text class="s${i}" x="${790 + (i > 1 ? 130 : 0)}" y="${120 + (i % 2) * 24}" font-family="${MONO}" font-size="16" fill="${T.glow}">${s[0]}</text>`; });
  caps.forEach((c, i) => { g += `<text class="c${i}" x="36" y="258" font-family="${MONO}" font-size="15" fill="${T.soft}">${esc(c)}</text>`; });
  g += `<text class="c4" x="36" y="258" font-family="${MONO}" font-size="15" fill="${T.soft}">need 9 − 7 = 2 · seen at index 3 · <tspan fill="${T.ok}">return [3, 4]</tspan>  O(n) time</text>`;
  return svgOpen(H, "Two Sum walkthrough: the pointer walks the array, remembers each value, and at 7 finds 2 already seen, so it returns [3, 4].") +
    `<style>${css}</style>` + frame(T, H, "Two Sum, one pass with a hash map", "one of the walkthroughs dsatracker.tech draws") +
    `<text x="36" y="70" font-family="${MONO}" font-size="14" fill="${T.soft}">nums = [${nums.join(", ")}]   target = ${target}</text>` + g + `</svg>\n`;
}

/* 5. roles: the same problem set, reordered for each role (real orders from the dataset) */
function roles(T) {
  const H = 380, ROWS = 8, ROW = 34, PH = 3.0, names = Object.keys(D.roles), CYC = PH * names.length;
  const order = (r) => D.roles[r].shown.slice(0, ROWS);   // the top of each role's list, as the site shows it
  const coreCount = (r) => Math.min(ROWS, D.roles[r].core);
  const topics = [...new Set(names.flatMap(order))];
  const chipX = 470, top = 78;
  let css = REDUCED, g = "";
  names.forEach((r, k) => {
    const a = k * PH, b = (k + 1) * PH;
    css += `.role${k}{opacity:${k ? 0 : 1};animation:role${k} ${CYC}s step-end infinite}@keyframes role${k}{0%{opacity:${k ? 0 : 1}}${pc(a, CYC)}{opacity:1}${pc(b, CYC)}{opacity:${k === names.length - 1 ? 1 : 0}}100%{opacity:${k ? 0 : 1}}}`;
    g += `<g class="role${k}">` + sans(T, 36, 150, 30, r, T.ink, 'font-weight="700"') + mono(T, 36, 182, 14, `${coreCount(r)} core topics first, then the rest`) + `</g>`;
  });
  topics.forEach((tp, i) => {
    const w = 18 + tp.length * 9.2;
    const states = names.map((r) => { const idx = order(r).indexOf(tp); return idx < 0 ? { y: ROWS * ROW + 10, o: 0, core: false } : { y: idx * ROW, o: 1, core: idx < coreCount(r) }; });
    let kf = "";
    const frameAt = (s) => `{transform:translateY(${s.y}px);opacity:${s.o}}`;
    names.forEach((_, k) => {
      const a = k * PH;
      kf += `${pc(Math.max(0, a - 0.55), CYC)}${frameAt(states[(k + names.length - 1) % names.length])}${pc(a, CYC)}${frameAt(states[k])}`;
    });
    kf += `${pc(CYC - 0.55, CYC)}${frameAt(states[names.length - 1])}100%${frameAt(states[0])}`;
    css += `.t${i}{transform:translateY(${states[0].y}px);opacity:${states[0].o};animation:t${i} ${CYC}s cubic-bezier(.3,.7,.2,1) infinite}@keyframes t${i}{${kf}}`;
    // the chip's colour follows whether the topic is core for the role on screen
    let ck = "";
    names.forEach((_, k) => { ck += `${pc(k * PH, CYC)}{stroke:${states[k].core ? T.accent : T.line}}`; });
    css += `.b${i}{stroke:${states[0].core ? T.accent : T.line};animation:b${i} ${CYC}s step-end infinite}@keyframes b${i}{${ck}100%{stroke:${states[0].core ? T.accent : T.line}}}`;
    let tk = "";
    names.forEach((_, k) => { tk += `${pc(k * PH, CYC)}{fill:${states[k].core ? T.ink : T.muted}}`; });
    css += `.x${i}{fill:${states[0].core ? T.ink : T.muted};animation:x${i} ${CYC}s step-end infinite}@keyframes x${i}{${tk}100%{fill:${states[0].core ? T.ink : T.muted}}}`;
    g += `<g class="t${i}"><rect class="b${i}" x="${chipX}" y="${top}" width="${w.toFixed(0)}" height="28" rx="14" fill="${T.canvas}" stroke-width="1.5"/>` +
      `<text class="x${i}" x="${chipX + w / 2}" y="${top + 19}" text-anchor="middle" font-family="${MONO}" font-size="15">${esc(tp)}</text></g>`;
  });
  for (let r = 0; r < ROWS; r++) g += mono(T, chipX - 30, top + r * ROW + 19, 14, String(r + 1), 'text-anchor="end"');
  return svgOpen(H, `The same ${N.problems} problems reordered for each role: core topics first. Roles shown: ${names.join(", ")}.`) +
    `<style>${css}</style>` + frame(T, H, `The same ${N.problems} problems, reordered for the role`, `${names.length} of ${N.roles} roles`) + mono(T, 36, 110, 14, "role") +
    `<text x="36" y="330" font-family="${SANS}" font-size="15" fill="${T.muted}">A chip with a violet edge is a core topic for that role.</text>` + g + `</svg>\n`;
}

/* 6. cascade: one AI request through the providers, with the two failures the code handles */
function cascade(T) {
  const H = 260, y = 128, CYC = 9;
  // the providers are not named: the product is private, the behaviour is the point
  const stops = ["1st provider", "2nd provider", "3rd provider", "4th provider", "rule-based answer"], xs = [150, 390, 630, 870, 1110];
  // the request waits at each stop long enough for its verdict to be read before it moves on
  const events = [{ i: 0, at: 1.5, ok: false, text: "rate limit hit" }, { i: 1, at: 3.6, ok: false, text: "answer came back cut short" }, { i: 2, at: 5.7, ok: true, text: "answer returned" }];
  let css = REDUCED + `.req{animation:req ${CYC}s cubic-bezier(.4,0,.2,1) infinite}@keyframes req{0%,${pc(2.3, CYC)}{transform:translateX(0)}${pc(3.1, CYC)},${pc(4.4, CYC)}{transform:translateX(240px)}${pc(5.2, CYC)},${pc(8.6, CYC)}{transform:translateX(480px)}100%{transform:translateX(0)}}`;
  let g = `<line x1="${xs[0]}" y1="${y}" x2="${xs[4]}" y2="${y}" stroke="${T.line}" stroke-width="2"/>`;
  stops.forEach((s, i) => {
    g += `<circle cx="${xs[i]}" cy="${y}" r="13" fill="${T.panel}" stroke="${T.line}" stroke-width="2"/>` + `<text x="${xs[i]}" y="${y + 44}" text-anchor="middle" font-family="${MONO}" font-size="15" fill="${T.soft}">${esc(s)}</text>`;
  });
  events.forEach((e, k) => {
    const col = e.ok ? T.ok : T.bad;
    css += `.m${k}{opacity:0;animation:m${k} ${CYC}s step-end infinite}@keyframes m${k}{0%,${pc(e.at, CYC)}{opacity:0}${pc(e.at + 0.01, CYC)},${pc(8.6, CYC)}{opacity:1}${pc(8.61, CYC)},100%{opacity:0}}`;
    const x = xs[e.i];
    const mark = e.ok ? `<path d="M${x - 6} ${y} l4 4 l8 -9" fill="none" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>` : `<path d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>`;
    g += `<g class="m${k}"><circle cx="${x}" cy="${y}" r="13" fill="${T.panel}" stroke="${col}" stroke-width="2"/>${mark}<text x="${x}" y="${y - 30}" text-anchor="middle" font-family="${SANS}" font-size="14" fill="${col}">${esc(e.text)}</text></g>`;
  });
  g += `<g class="req"><circle cx="${xs[0]}" cy="${y}" r="6" fill="${T.accent}"/><circle cx="${xs[0]}" cy="${y}" r="11" fill="none" stroke="${T.accent}" stroke-width="1.5" opacity=".5"/></g>`;
  g += sans(T, 36, 232, 15, "Every model failed? A rule-based answer, never a blank screen. A cut-short answer counts as a failure and moves on.", T.muted);
  return svgOpen(H, "One AI request through the cascade: the first provider hits a rate limit, the second answers cut short, the third answers. If every model fails, a rule-based answer.") +
    `<style>${css}</style>` + frame(T, H, "AI help: one request through the cascade", "several free-tier providers, not named") + g + `</svg>\n`;
}

/* 7. flight: the portfolio in one loop, fly from one planet to the next, land, the flag goes up */
function flight(T) {
  const H = 260, CYC = 8;
  const A = [190, 150], B = [1010, 142];
  // the arc stays inside the panel, and the ship parks left of the landing spot so the flag has room
  const path = `M${A[0]} ${A[1] - 66} C ${A[0] + 220} ${A[1] - 112}, ${B[0] - 300} ${B[1] - 118}, ${B[0] - 76} ${B[1] - 72}`;
  const PX = B[0] - 30, PY = B[1] - 50;   // where the flag pole stands on the planet
  let css = REDUCED + `.pole{transform-box:view-box;transform-origin:${PX}px ${PY}px;transform:scaleY(0);animation:pole ${CYC}s cubic-bezier(.2,.8,.2,1) infinite}@keyframes pole{0%,${pc(4.1, CYC)}{transform:scaleY(0)}${pc(4.5, CYC)},${pc(7.5, CYC)}{transform:scaleY(1)}${pc(7.6, CYC)},100%{transform:scaleY(0)}}` +
    `.flag{transform-box:view-box;transform-origin:${PX}px ${PY - 36}px;transform:scaleX(0);animation:flag ${CYC}s cubic-bezier(.2,.8,.2,1) infinite}@keyframes flag{0%,${pc(4.5, CYC)}{transform:scaleX(0)}${pc(4.9, CYC)},${pc(7.5, CYC)}{transform:scaleX(1)}${pc(7.6, CYC)},100%{transform:scaleX(0)}}` +
    `.who{opacity:0;animation:who ${CYC}s step-end infinite}@keyframes who{0%,${pc(3.9, CYC)}{opacity:0}${pc(3.91, CYC)},${pc(7.5, CYC)}{opacity:1}${pc(7.51, CYC)},100%{opacity:0}}` +
    `.cap0{opacity:1;animation:cap0 ${CYC}s step-end infinite}@keyframes cap0{0%,${pc(3.9, CYC)}{opacity:1}${pc(3.91, CYC)},${pc(7.5, CYC)}{opacity:0}${pc(7.51, CYC)},100%{opacity:1}}` +
    `.cap1{opacity:0;animation:cap1 ${CYC}s step-end infinite}@keyframes cap1{0%,${pc(3.9, CYC)}{opacity:0}${pc(3.91, CYC)},${pc(7.5, CYC)}{opacity:1}${pc(7.51, CYC)},100%{opacity:0}}` +
    `@media (prefers-reduced-motion: reduce){.pole{transform:scaleY(1)}.flag{transform:scaleX(1)}.who,.cap1{opacity:1}.cap0{opacity:0}}`;
  const stars = [[300, 70], [520, 50], [700, 90], [860, 60], [1120, 70], [420, 200], [640, 215], [960, 230]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="${T.muted}" opacity=".6"/>`).join("");
  let g = stars +
    `<circle cx="${A[0]}" cy="${A[1]}" r="46" fill="${T.canvas}" stroke="${T.line}" stroke-width="2"/><text x="${A[0]}" y="${A[1] + 5}" text-anchor="middle" font-family="${MONO}" font-size="15" fill="${T.soft}">About</text>` +
    `<circle cx="${B[0]}" cy="${B[1]}" r="58" fill="${T.canvas}" stroke="${T.line}" stroke-width="2"/><text x="${B[0]}" y="${B[1] + 5}" text-anchor="middle" font-family="${MONO}" font-size="15" fill="${T.soft}">Projects</text>` +
    `<path d="${path}" fill="none" stroke="${T.line}" stroke-dasharray="3 7"/>` +
    `<g><path d="M-14 -7 L10 0 L-14 7 L-8 0 Z" fill="${T.accent}"/><animateMotion dur="${CYC}s" repeatCount="indefinite" rotate="auto" calcMode="spline" keyPoints="0;0;1;1" keyTimes="0;0.06;0.5;1" keySplines="0 0 1 1;.4 0 .2 1;0 0 1 1" path="${path}"/></g>` +
    `<line class="pole" x1="${PX}" y1="${PY}" x2="${PX}" y2="${PY - 36}" stroke="${T.ink}" stroke-width="2"/>` +
    `<path class="flag" d="M${PX} ${PY - 36} h24 l-6 7 l6 7 h-24 z" fill="${T.accent}"/>` +
    `<g class="who"><circle cx="${PX + 16}" cy="${PY - 18}" r="5" fill="${T.glow}"/><rect x="${PX + 12}" y="${PY - 12}" width="8" height="12" rx="3" fill="${T.glow}"/></g>` +
    `<text class="cap0" x="36" y="232" font-family="${SANS}" font-size="15" fill="${T.muted}">Pilot the ship between the planets named About, Skills, Projects, Education and Contact.</text>` +
    `<text class="cap1" x="36" y="232" font-family="${SANS}" font-size="15" fill="${T.muted}">Land, and an astronaut steps out, plants a flag, and the section opens. In a hurry? A recruiter quick-view skips the flying.</text>`;
  return svgOpen(H, "The flight portfolio: the ship flies from About to Projects, lands, an astronaut plants a flag and the section opens.") +
    `<style>${css}</style>` + frame(T, H, "anki1kr.me: fly, land, read", "Three.js, no build step") + g + `</svg>\n`;
}

/* 8. pull requests: the two routers, to scale */
function prs(T) {
  const H = 230, rows = [["9router", N.prs9router], ["OmniRoute", N.prsOmniRoute]], max = Math.max(...rows.map((r) => r[1])), full = 620;
  let css = REDUCED + `.bar{transform-box:view-box;transform-origin:220px 0;transform:scaleX(0);animation:bar 1.2s cubic-bezier(.2,.8,.2,1) .3s forwards}@keyframes bar{to{transform:scaleX(1)}}.num{opacity:0;animation:num .4s 1.3s forwards}@keyframes num{to{opacity:1}}@media (prefers-reduced-motion: reduce){.bar{transform:scaleX(1)}.num{opacity:1}}`;
  let g = "";
  rows.forEach(([name, n], i) => {
    const y = 78 + i * 50, w = (full * n) / max;
    g += `<text x="200" y="${y + 20}" text-anchor="end" font-family="${MONO}" font-size="16" fill="${T.soft}">${name}</text>` +
      `<rect x="220" y="${y}" width="${full}" height="28" rx="6" fill="${T.canvas}" stroke="${T.line}"/><rect class="bar" x="220" y="${y}" width="${w.toFixed(0)}" height="28" rx="6" fill="${T.accent}"/>` +
      `<text class="num" x="${220 + w + 14}" y="${y + 20}" font-family="${SANS}" font-weight="700" font-size="18" fill="${T.ink}">${n}</text>`;
  });
  g += `<text class="num" x="1164" y="120" text-anchor="end" font-family="${SANS}" font-weight="700" font-size="56" fill="${T.ink}">${N.prs}</text>` + mono(T, 1164, 146, 14, "pull requests", 'text-anchor="end"');
  const chips = ["i18n coverage", "multi-key load balancing", "provider compatibility", "WebSocket bundling"];
  let x = 36;
  chips.forEach((c) => { const w = 20 + c.length * 8.6; g += `<rect x="${x}" y="186" width="${w.toFixed(0)}" height="26" rx="13" fill="${T.canvas}" stroke="${T.line}"/><text x="${x + w / 2}" y="${204}" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${T.soft}">${esc(c)}</text>`; x += w + 10; });
  return svgOpen(H, `${N.prs} pull requests: 9router ${N.prs9router}, OmniRoute ${N.prsOmniRoute}. Areas: i18n coverage, multi-key load balancing, provider compatibility, WebSocket bundling.`) +
    `<style>${css}</style>` + frame(T, H, "Pull requests to the LLM routers my projects run on", "github.com, 14 Oct 2026") + g + `</svg>\n`;
}

const PANELS = { header, stats, timeline, "two-sum": twoSum, roles, cascade, flight, prs };
for (const [name, fn] of Object.entries(PANELS)) {
  writeFileSync(join(HERE, `${name}.svg`), fn(THEMES.dark));
  writeFileSync(join(HERE, `${name}-light.svg`), fn(THEMES.light));
}
console.log(`wrote ${Object.keys(PANELS).length} panels x 2 themes`);
