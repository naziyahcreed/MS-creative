/**
 * Portrait mobile promo: one section → pause → next (no jitter scroll).
 * Full flow incl. Google Maps + end Instagram text overlay.
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const TMP_DIR = path.join(ROOT, '.record-tmp')
const OUT_DIR = path.join(ROOT, 'public', 'promo')
const BASE_URL = process.env.INVITE_URL || 'http://127.0.0.1:4173/'

const W = 390
const H = 844
const SCROLL_MS = 750
const HEADER_OFFSET = 76

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** One smooth scroll, then hold — no wheel jitter */
async function showSection(page, selector, holdMs) {
  await page.evaluate(
    async ({ sel, offset, duration }) => {
      const el = document.querySelector(sel)
      if (!el) return
      const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
      const start = window.scrollY
      const dist = target - start
      if (Math.abs(dist) < 4) return
      const t0 = performance.now()
      await new Promise((resolve) => {
        function frame(t) {
          const p = Math.min(1, (t - t0) / duration)
          const ease = 1 - Math.pow(1 - p, 3)
          window.scrollTo(0, start + dist * ease)
          if (p < 1) requestAnimationFrame(frame)
          else resolve()
        }
        requestAnimationFrame(frame)
      })
    },
    { sel: selector, offset: HEADER_OFFSET, duration: SCROLL_MS },
  )
  await sleep(SCROLL_MS + 80)
  await sleep(holdMs)
}

async function smoothScrollToElement(locator, holdMs) {
  await locator.waitFor({ state: 'visible', timeout: 15000 })
  await locator.evaluate(
    async (el, { duration, offset }) => {
      const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
      const start = window.scrollY
      const dist = target - start
      const t0 = performance.now()
      await new Promise((resolve) => {
        function frame(t) {
          const p = Math.min(1, (t - t0) / duration)
          const ease = 1 - Math.pow(1 - p, 3)
          window.scrollTo(0, start + dist * ease)
          if (p < 1) requestAnimationFrame(frame)
          else resolve()
        }
        requestAnimationFrame(frame)
      })
    },
    { duration: SCROLL_MS, offset: HEADER_OFFSET },
  )
  await sleep(SCROLL_MS + 80)
  await sleep(holdMs)
}

async function showHeading(page, pattern, holdMs) {
  await smoothScrollToElement(page.getByRole('heading', { name: pattern }).first(), holdMs)
}

async function showText(page, pattern, holdMs) {
  await smoothScrollToElement(page.getByText(pattern).first(), holdMs)
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
      if (res.ok) return
    } catch {
      /* retry */
    }
    await sleep(500)
  }
  throw new Error(`Server not ready: ${url}`)
}

function startPreview() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd: ROOT,
    stdio: 'ignore',
    detached: false,
  })
}

async function getFfmpeg() {
  try {
    const mod = await import('ffmpeg-static')
    if (mod.default) return mod.default
  } catch {
    /* fall through */
  }
  return 'ffmpeg'
}

async function convertToMp4(webmPath, mp4Path) {
  const ffmpegBin = await getFfmpeg()
  const vf = 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920'

  await execFileAsync(ffmpegBin, [
    '-y',
    '-i',
    webmPath,
    '-an',
    '-vf',
    vf,
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-t',
    '60',
    mp4Path,
  ])
}

async function main() {
  fs.mkdirSync(TMP_DIR, { recursive: true })
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const preview = startPreview()
  try {
    await waitForServer(BASE_URL)

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      viewport: { width: W, height: H },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      locale: 'en-IN',
      recordVideo: { dir: TMP_DIR, size: { width: W, height: H } },
      colorScheme: 'light',
    })

    const page = await context.newPage()
    await page.addInitScript(() => {
      document.documentElement.style.scrollBehavior = 'auto'
    })

    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 })

    // Opening screen
    await sleep(2200)
    await page.getByRole('button', { name: /Open Invitation|அழைப்பிதழை/i }).click()
    await sleep(1800)

    // Full flow: smooth scroll → pause on each page (no wheel jitter)
    await showSection(page, '#home', 2600)
    await showSection(page, '#story', 2200)
    await showHeading(page, /With the blessings of our families/i, 2200)
    await showSection(page, '#events', 2400)
    await showHeading(page, /Until we begin forever|Today is our wedding/i, 2200)
    await showSection(page, '#gallery', 2400)
    await showSection(page, '#venue', 2400)
    await showHeading(page, /How to Reach/i, 2200)
    await showSection(page, '#maps', 3200)
    await showText(page, /Your presence is our greatest gift/i, 2000)
    await showHeading(page, /Share Invitation/i, 2000)
    await showSection(page, '#thanks', 2400)

    // Instagram end card (recorded in-frame)
    await page.evaluate(() => {
      const wrap = document.createElement('div')
      wrap.id = 'promo-end-card'
      wrap.style.cssText =
        'position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:0 24px 18% 24px;background:linear-gradient(180deg,transparent 40%,rgba(26,16,10,.72) 70%,rgba(26,16,10,.88));pointer-events:none;text-align:center;font-family:Cinzel,serif;color:#fff8e7;'
      wrap.innerHTML = `
        <p style="margin:0;font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#e8d5a3">Save the date</p>
        <p style="margin:10px 0 0;font-size:28px;font-weight:700;letter-spacing:.08em;text-shadow:0 2px 12px rgba(0,0,0,.45)">Wedding Invitation</p>
        <p style="margin:8px 0 0;font-family:'Great Vibes',cursive;font-size:34px;color:#f4e2b3">Niveditha & Natraj</p>
        <p style="margin:10px 0 0;font-size:13px;letter-spacing:.12em;color:#e8d5a3">25 Oct 2026 · 06:30 AM · Madurai</p>
      `
      document.querySelector('.phone-shell')?.appendChild(wrap)
    })
    await sleep(4200)

    const video = page.video()
    await context.close()
    await browser.close()

    const webmPath = await video.path()
    const stampedWebm = path.join(OUT_DIR, 'nivi-weds-instagram.webm')
    fs.copyFileSync(webmPath, stampedWebm)

    const mp4Path = path.join(OUT_DIR, 'nivi-weds-instagram.mp4')
    await convertToMp4(stampedWebm, mp4Path)

    const rootCopy = path.join(ROOT, '..', '..', 'nivi-weds-instagram.mp4')
    fs.copyFileSync(mp4Path, rootCopy)

    const stat = fs.statSync(mp4Path)
    console.log(`Done: ${mp4Path}`)
    console.log(`Copy: ${rootCopy} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`)
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
