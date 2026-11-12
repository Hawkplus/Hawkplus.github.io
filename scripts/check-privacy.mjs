import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Conservative local guard, not a substitute for reviewing future content.
const publicRules = [
  ['private contact address', /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i],
  ['telephone link', /tel:\+?[\d-]+/i],
  ['personal background', /大学|入学|专业：|所在地|出生|手机号|身份证|简历|就读/],
  ['account link', /https?:\/\/(?:www\.)?(?:github\.com|linkedin\.com|weibo\.com)\//i],
  ['tracking service', /google-analytics|googletagmanager|clarity\.ms|hotjar\.com|umami|plausible\.io/i],
]
const secretRules = [
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['GitHub credential', /(?:gh[pousr]_[a-zA-Z0-9]{30,}|github_pat_[a-zA-Z0-9_]{30,})/],
  ['API credential', /sk-(?:proj-)?[a-zA-Z0-9_-]{30,}/],
  ['cloud credential', /AKIA[0-9A-Z]{16}/],
  ['JWT', /eyJ[a-zA-Z0-9_-]{15,}\.[a-zA-Z0-9_-]{15,}\.[a-zA-Z0-9_-]{15,}/],
  ['local user path', /[A-Z]:[\\/]Users[\\/][^\s"'<>]+/i],
]

async function collect(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collect(path))
    else files.push(path)
  }
  return files
}

const publicFiles = ['index.html', ...await collect('src'), ...await collect('public'), ...await collect('dist')]
const supportFiles = ['README.md', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'playwright.config.ts', ...await collect('scripts'), ...await collect('tests'), ...await collect('.github')]
const failures = []
for (const path of publicFiles) {
  if (!/\.(?:html|tsx?|css|js|svg|json|txt|xml)$/.test(path)) continue
  const source = await readFile(path, 'utf8')
  for (const [label, pattern] of [...publicRules, ...secretRules]) {
    if (pattern.test(source)) failures.push(`${path}: ${label}`)
  }
}
for (const path of supportFiles) {
  const source = await readFile(path, 'utf8')
  for (const [label, pattern] of secretRules) {
    if (pattern.test(source)) failures.push(`${path}: ${label}`)
  }
}
for (const name of await readdir('.')) {
  if (/^\.env(?:\.|$)/.test(name) && name !== '.env.example') failures.push(`${name}: environment file needs manual review`)
}
if (failures.length) {
  console.error('Privacy review required (matched values are intentionally not printed):\n' + failures.join('\n'))
  process.exitCode = 1
} else console.log(`Privacy scan passed: ${publicFiles.length + supportFiles.length} public, build, and support files; no detected personal data, credentials, or trackers.`)
