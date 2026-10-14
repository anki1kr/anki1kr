<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/header-light.svg" />
  <img src="assets/header.svg" width="100%" alt="Ankit Kumar. I build things that read, reason and render. A breadth-first search walks the five sections of the portfolio at anki1kr.me." />
</picture>

<p>
  <a href="https://dsatracker.tech" title="DSA Tracker, in production">dsatracker.tech</a>&ensp;&ensp;
  <a href="https://anki1kr.me" title="The portfolio gate">anki1kr.me</a>&ensp;&ensp;
  <a href="https://www.linkedin.com/in/anki1kr">LinkedIn</a>&ensp;&ensp;
  <a href="mailto:ankitkumar67930@gmail.com">Email</a>
</p>

## Who's watching?

The front door of [anki1kr.me](https://anki1kr.me) asks that question, and so does this page. Pick the way in that fits how you like to look at work. Each picture opens the live thing.

<table>
<tr>
<td width="33%" align="center" valign="top">
<a href="https://anki1kr.me/aura/"><img src="assets/media/poster-resume.jpg" width="100%" alt="The résumé: a red name rising out of fog, the figure stepping in front of it." /></a>
<br/><b><a href="https://anki1kr.me/aura/">Developer</a></b>
<br/><sub>A cinematic résumé you scroll through.</sub>
</td>
<td width="33%" align="center" valign="top">
<a href="https://anki1kr.me/space.html"><img src="assets/media/poster-flight.jpg" width="100%" alt="The 3D portfolio: a ship flying through a field of stars toward a bright nebula." /></a>
<br/><b><a href="https://anki1kr.me/space.html">Creative</a></b>
<br/><sub>A small open world you fly a ship through.</sub>
</td>
<td width="33%" align="center" valign="top">
<a href="https://dsatracker.tech"><img src="assets/media/poster-dsa.jpg" width="100%" alt="DSA Tracker: the problem set reordered for the role you pick." /></a>
<br/><b><a href="https://dsatracker.tech">DSA Tracker</a></b>
<br/><sub>The product I run. Try it with no account.</sub>
</td>
</tr>
</table>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/stats-light.svg" />
  <img src="assets/stats.svg" width="100%" alt="370 problems, 30 job roles, 9 languages judged, 6 platforms synced, 31 pull requests, 2 products live." />
</picture>

I build complete products: the database, the API on it, the LLM pipeline behind it, and the frontend that makes sense of it. Everything I run is on free tiers, which is where I learned failover, caching and quota handling: each one broke in front of someone before I fixed it.

**Current focus:** the first hour of a new DSA Tracker user. Fewer clicks to the first solved problem, pages that do not shift while they load, and AI help that never leaves a blank screen.

<sub>On this page:&ensp;<a href="#dsa-tracker">DSA Tracker</a>&ensp;<a href="#the-resume">Résumé</a>&ensp;<a href="#the-flight-portfolio">Flight portfolio</a>&ensp;<a href="#open-source">Open source</a>&ensp;<a href="#internship-and-analysis-work">Internships</a>&ensp;<a href="#timeline">Timeline</a>&ensp;<a href="#contact">Contact</a></sub>

## DSA Tracker

**In production at [dsatracker.tech](https://dsatracker.tech).** Source is private while it runs as a business.

It answers one question: what should I solve next for my target role? A curated dataset of 370 problems across 22 topics, reordered for 30 job roles. No account is needed to try it: one click lands on the first problem.

<p align="center">
<a href="https://dsatracker.tech" title="Open DSA Tracker">
<img src="assets/media/dsa-tracker.gif" width="90%" alt="Recorded from the product film: the role picker reorders the 370 problems, a Two Sum solution is typed and accepted, then a step-by-step run of an array problem." />
</a>
</p>
<sub>From the product's own film: pick a role, solve in the browser, watch an algorithm run step by step.</sub>

<a href="https://dsatracker.tech/problems" title="Open the role view on dsatracker.tech">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/roles-light.svg" />
  <img src="assets/roles.svg" width="100%" alt="The same 370 problems reordered for each role: core topics first. Four of the 30 roles cycle through. Opens the role view on dsatracker.tech." />
</picture>
</a>
<sub>Pick any of the 30 roles yourself: <a href="https://dsatracker.tech/problems">dsatracker.tech/problems</a></sub>

<a href="https://dsatracker.tech/visualize/arrays-two-sum" title="Step through this walkthrough on dsatracker.tech">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/two-sum-light.svg" />
  <img src="assets/two-sum.svg" width="100%" alt="Two Sum walkthrough: the pointer walks the array, remembers each value, and at 7 finds 2 already seen, so it returns [3, 4]. Opens the walkthrough on dsatracker.tech." />
</picture>
</a>
<sub>Step through it yourself: <a href="https://dsatracker.tech/visualize/arrays-two-sum">dsatracker.tech/visualize/arrays-two-sum</a>. Then solve it in the editor: <a href="https://dsatracker.tech/compiler">dsatracker.tech/compiler</a></sub>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/cascade-light.svg" />
  <img src="assets/cascade.svg" width="100%" alt="One AI request through the cascade: the first provider hits a rate limit, the second answers cut short, the third answers. If every model fails, a rule-based answer." />
</picture>

- Animated algorithm visualizers: step-through traces generated by running the real algorithm and recording its state.
- An in-browser editor and judge in 9 languages, and progress pulled from 6 platforms (LeetCode, Codeforces, CodeChef, GeeksforGeeks, AtCoder, HackerRank).
- AI help that fails over across several free-tier providers, so a quota or a cut-short answer never leaves a blank screen.

<code title="the dashboard and every rendered page">next.js</code> <code title="typed frontend, shared types with the api">typescript</code> <code title="the backend api">fastapi</code> <code title="backend logic and the failover layer">python</code> <code title="the 370-problem dataset and every user's progress">postgres</code>

## The résumé

**[anki1kr.me/aura](https://anki1kr.me/aura/).** One page, seven scenes, all of it driven from a single content file: the hero, the journey, skills, experience, projects on a turning drum, certifications and contact. It scrolls with inertia, and every scene works on a phone too.

<p align="center">
<a href="https://anki1kr.me/aura/" title="Scroll the résumé">
<img src="assets/media/resume.gif" width="90%" alt="Recorded from the live page: the name rises out of fog and the figure steps in, then scenes for skills, experience and projects scroll past." />
</a>
</p>
<sub>Recorded from the live page. Scroll it yourself: <a href="https://anki1kr.me/aura/">anki1kr.me/aura</a></sub>

<code title="scroll-driven scenes and timelines">gsap</code> <code title="inertial scrolling">lenis</code> <code title="the ember particles">three.js</code>

## The flight portfolio

**[anki1kr.me/space.html](https://anki1kr.me/space.html).** Instead of a scrolling page, a small open world in Three.js WebGL with no build step. You pilot a ship between planets named About, Skills, Projects, Education and Contact. Land on one and an astronaut steps out, plants a flag, and the section opens.

<p align="center">
<a href="https://anki1kr.me/space.html" title="Take the ship out">
<img src="assets/media/flight.gif" width="90%" alt="Recorded from the live site: the ship flies through a star field past nebulae, with the radar map in the corner." />
</a>
</p>
<sub>Recorded from the live site. Fly it yourself: <a href="https://anki1kr.me/space.html">anki1kr.me/space.html</a>. Keys: W A S D to fly. In a hurry? A recruiter quick-view skips the flying.</sub>

<details>
<summary><b>How it stays fast</b></summary>
<br/>

- The ship and station are modelled in Blender and exported as GLB.
- Draco compression took the models from about 18 MB to 3.5 MB, and launch-ready time from about 10 s to 4.6 s.
- A custom GLSL world-space joystick for phones, plus a radar map of the whole sector.
- The landing cinematic (astronaut, flag, wave) is skippable and respects reduced motion.

</details>

<code title="renders the whole 3d world">three.js</code> <code title="what three.js draws through">webgl</code> <code title="the custom mobile joystick shader">glsl</code> <code title="where the ship and station were modelled">blender</code> <code title="compressed the models about 5x for a fast load">draco</code>

## Open source

<a href="https://github.com/search?q=author%3Aanki1kr+is%3Apr&type=pullrequests" title="Every pull request, on GitHub">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/prs-light.svg" />
  <img src="assets/prs.svg" width="100%" alt="31 pull requests: 9router 20, OmniRoute 11. Areas: i18n coverage, multi-key load balancing, provider compatibility, WebSocket bundling. Opens the list on GitHub." />
</picture>
</a>
<sub>Read them: <a href="https://github.com/search?q=author%3Aanki1kr+is%3Apr&type=pullrequests">all pull requests on GitHub</a></sub>

[9router](https://github.com/decolua/9router) and [OmniRoute](https://github.com/diegosouzapw/OmniRoute) are self-hosted LLM routers, the tooling my own projects run on.

## Internship and analysis work

- [Agriculture-Agribusiness](https://github.com/anki1kr/Agriculture-Agribusiness): pre-harvest crop yield forecasting across 320 districts (2009 to 2023) from MODIS NDVI, ERA5-Land weather and SoilGrids data. LightGBM with leave-one-year-out validation; out-of-sample MAPE from 15.4% to 7.4%.
- [healthcare](https://github.com/anki1kr/healthcare): 30-day readmission risk across chronic-disease cohorts, with the operational and financial impact under the CMS Hospital Readmissions Reduction Program.
- [crawler](https://github.com/anki1kr/crawler): Orbit, an LLM browser agent as a Chrome extension (MV3) with a local bridge.

## Timeline

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/timeline-light.svg" />
  <img src="assets/timeline.svg" width="100%" alt="2024 joined GitHub. 2025 Python and SQL foundations, first notebooks. 2026 Orbit, 31 pull requests, DSA Tracker live, the flight portfolio." />
</picture>

## Stack

- **Backend and data:** Python, FastAPI, Flask, PostgreSQL, Pandas, NumPy.
- **Frontend and 3D:** TypeScript, Next.js, React, Tailwind, GSAP, Three.js, GLSL, Blender.
- **Automation and analysis:** Playwright, Chrome extensions (MV3), SQL, Power BI.
- **Learning now:** statistical reasoning, async patterns, prompt design that holds up in production.

## Activity

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/anki1kr/anki1kr/output/github-contribution-grid-snake-dark.svg" />
  <img src="https://raw.githubusercontent.com/anki1kr/anki1kr/output/github-contribution-grid-snake.svg" width="100%" alt="A snake eating this year's contribution squares, redrawn every day" />
</picture>

## Contact

<a href="https://www.linkedin.com/in/anki1kr">linkedin.com/in/anki1kr</a>&ensp;&ensp;<a href="mailto:ankitkumar67930@gmail.com">ankitkumar67930@gmail.com</a>&ensp;&ensp;<a href="https://anki1kr.me">anki1kr.me</a>&ensp;&ensp;<a href="https://leetcode.com/anki1kr/">leetcode.com/anki1kr</a>

Open to collaboration on LLM tooling, data pipelines and browser automation.

<details>
<summary><b>How this page is made</b></summary>
<br/>

The animated panels are drawn by <code>assets/build.mjs</code> from <code>assets/profile-data.json</code>, which is exported from the project code, so no number on them is typed by hand. The three moving pictures of live sites in <code>assets/media</code> are recordings of the real pages.

</details>
