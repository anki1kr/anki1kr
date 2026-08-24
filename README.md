# Hey 👋

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1200&color=B8392A&center=true&vCenter=true&width=520&lines=Python+%C2%B7+SQL+%C2%B7+JavaScript+%C2%B7+C%2FC%2B%2B;Data+pipelines+%C2%B7+LLM+orchestration+%C2%B7+Postgres;Building+things+that+read%2C+reason+%26+render" alt="Typing SVG" />
</div>

<div align="center">

[![About](https://img.shields.io/badge/-About-B8392A?style=for-the-badge)](#about)
[![Projects](https://img.shields.io/badge/-Projects-B8392A?style=for-the-badge)](#things-ive-built)
[![Stack](https://img.shields.io/badge/-Stack-B8392A?style=for-the-badge)](#stack-i-actually-use)
[![Stats](https://img.shields.io/badge/-GitHub_Stats-B8392A?style=for-the-badge)](#github-at-a-glance)
[![Contact](https://img.shields.io/badge/-Find_Me-B8392A?style=for-the-badge)](#find-me)

</div>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/anki1kr/anki1kr/output/github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/anki1kr/anki1kr/output/github-contribution-grid-snake.svg" />
    <img alt="snake eating my contributions" src="https://raw.githubusercontent.com/anki1kr/anki1kr/output/github-contribution-grid-snake.svg" />
  </picture>
</div>

---

## About

I build things end-to-end — Postgres schemas, REST APIs, LLM pipelines that don't fall over on free-tier rate limits, and dashboards that actually look at the data instead of decorating it.

Mostly I write Python and JavaScript. Most of what I've shipped is data-heavy or LLM-flavoured.

<details>
<summary>🛰️ Currently building / learning</summary>
<br>

- [x] Ship SUITS (DSATracker) to production, keep it alive on free-tier infra
- [x] Multi-provider LLM failover that survives a dead API key mid-demo
- [ ] Better statistical reasoning — hypothesis testing beyond the classroom version
- [ ] Async patterns that don't just work, but read clean six months later
- [ ] Prompt engineering that survives contact with real users, not just a demo

</details>

---

## Stack I actually use

<p align="left">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" />
  <img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Power%20BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
</p>

<details>
<summary>📊 Breakdown by how often I actually reach for it</summary>
<br>

**Day-to-day:** Python · SQL · Pandas · NumPy · Flask · Supabase · Chart.js · LLM APIs
**Comfortable:** JavaScript · Chrome extensions (MV3) · Power BI · Excel (Pivot/VLOOKUP/Power Query) · C/C++
**Learning:** Better statistical reasoning, async patterns, prompt engineering that survives production.

</details>

---

## Things I've built

<details open>
<summary><h3 style="display:inline">🎯 SUITS — Career Intelligence Platform</h3></summary>
<br>

**[Repo →](https://github.com/anki1kr/SUITS) · [Live →](https://dsatracker.tech)**

Full-stack analytics platform for **22 job-role profiles** with personalized skill-gap insights from a curated 370-problem dataset.

- Normalized PostgreSQL schema on Supabase + Google OAuth
- Multi-provider LLM pipeline with auto-failover across **OpenRouter** and **NVIDIA NIM** — built this after watching one provider's free tier nuke me mid-demo
- Interactive dashboard: mastery rings, activity heatmaps, per-topic skill breakdowns (Chart.js)

**Stack:** Python · Flask · PostgreSQL · Supabase · Chart.js · OpenRouter · Render

</details>

<details>
<summary><h3 style="display:inline">🕷️ Crawler — AI Browser Agent</h3></summary>
<br>

**[Repo →](https://github.com/anki1kr/crawler)**

Chrome extension that does **multi-step web automation** via LLM tool-calling. Give it a page, it pulls structured data out.

- Unified routing layer across **8 LLM providers** with cooldown-based failover
- Built to stay alive under free-tier quotas — the whole point was "make it work without paying"

**Stack:** JavaScript · Chrome MV3 · Service Workers · SSE Streaming

</details>

<details>
<summary><h3 style="display:inline">📸 Scroll Screenshotter</h3></summary>
<br>

**[Repo →](https://github.com/anki1kr/scroll-shot)**

Chrome extension that captures full-page screenshots in scroll-steps and packages them as a downloadable ZIP via the Offscreen Document API. Small tool, scratched a real itch.

**Stack:** JavaScript · Chrome MV3 · Offscreen Document API · JSZip

</details>

---

## GitHub at a glance

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api?username=anki1kr&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true" alt="GitHub Stats" />
  <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=anki1kr&theme=tokyonight&hide_border=true" alt="GitHub Streak" />
</div>

<div align="center">
  <img width="80%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=anki1kr&layout=compact&theme=tokyonight&hide_border=true&langs_count=8" alt="Top Languages" />
</div>

<details>
<summary align="center">🏆 Trophy case</summary>
<br>
<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anki1kr&theme=tokyonight&no-frame=true&row=1&column=4" alt="GitHub Trophies" />
</div>
</details>

---

## Find me

<p align="left">
  <a href="https://github.com/anki1kr" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://leetcode.com/anki1kr/" target="_blank"><img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" /></a>
</p>

---

<div align="center">
  <sub>Open to collabs and weird side projects. If you're working on something with LLMs, data pipelines, or browser automation — open an issue and say hi.</sub>
  <br/><br/>
  <img src="https://komarev.com/ghpvc/?username=anki1kr&style=flat-square&color=B8392A&label=visitors" alt="Profile Views" />
</div>
