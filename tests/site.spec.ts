import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { resolve, sep } from 'node:path'

test('page renders without errors, overflow, trackers, or accessibility violations', async ({ page }, testInfo) => {
  const errors: string[] = []
  const externalRequests: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4173')) externalRequests.push(request.url())
  })
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('HawkPP')
  await expect(page).toHaveTitle('HawkPP · 作品与探索')
  await expect(page.getByRole('article')).toHaveCount(2)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  const overflow = await page.locator('main *').evaluateAll((elements) => elements.filter((element) => {
    const bounds = element.getBoundingClientRect()
    return bounds.width > 0 && (bounds.right > window.innerWidth + 1 || bounds.left < -1)
  }).map((element) => element.tagName + '.' + element.className))
  expect(overflow).toEqual([])
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(results.violations).toEqual([])
  expect(errors).toEqual([])
  expect(externalRequests).toEqual([])
  await expect(page.locator('.thread-accent')).toHaveCSS('stroke-dashoffset', '0px', { timeout: 6000 })
  await mkdir('artifacts', { recursive: true })
  await page.screenshot({ path: `artifacts/${testInfo.project.name}.png`, fullPage: true })
  if (testInfo.project.name === 'desktop') await page.screenshot({ path: 'artifacts/desktop-first-screen.png' })
  if (testInfo.project.name === 'mobile') await page.screenshot({ path: 'artifacts/mobile-first-screen.png' })
})

test('navigation, keyboard details, project destinations, and refresh work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到主要内容' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await page.getByRole('link', { name: '看看我的作品' }).click()
  await expect(page).toHaveURL(/#projects$/)
  for (const [name, id] of [['作品', 'projects'], ['探索', 'exploring'], ['关于', 'about']]) {
    await page.getByRole('navigation').getByRole('link', { name, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.getByRole('navigation').getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'location')
    const sectionTop = await page.locator(`#${id}`).evaluate((element) => element.getBoundingClientRect().top)
    expect(sectionTop).toBeGreaterThanOrEqual(0)
    expect(sectionTop).toBeLessThan((page.viewportSize()?.height ?? 0) - 100)
  }
  await page.reload()
  await expect(page.locator('#about')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const projects = page.locator('.project-link')
  await expect(projects.nth(0)).toHaveAttribute('href', 'https://cet6.hawkpp2025.com/')
  await expect(projects.nth(1)).toHaveAttribute('href', 'https://research.hawkpp2025.com/')
  for (const link of await projects.all()) {
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(link).toHaveAttribute('target', '_blank')
  }
  await expect(page.locator('a[href=""], a[href="#"], a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
  for (const details of await page.locator('.project-details').all()) {
    const summary = details.locator('summary')
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(details).toHaveAttribute('open', '')
    await expect(details.locator('p')).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(details).not.toHaveAttribute('open')
  }
  await page.getByRole('link', { name: '回到顶部', exact: true }).click()
  await expect(page).toHaveURL(/#top$/)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('motion ends, can replay, and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const accent = page.locator('.thread-accent')
  await expect(accent).toHaveCSS('animation-iteration-count', '1')
  await expect(accent).toHaveCSS('stroke-dashoffset', '0px', { timeout: 6000 })
  await page.getByRole('button', { name: '重新绘制探索路径动画' }).click()
  expect(await accent.evaluate((element) => element.getAnimations().some((animation) => animation.playState === 'running'))).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(accent).toHaveCSS('animation-name', 'none')
  await expect(page.getByRole('button', { name: '重新绘制探索路径动画' })).toBeHidden()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
})

test('production assets load under a repository subdirectory', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'URL resolution is independent of viewport size')
  const root = resolve('dist')
  const failures: string[] = []
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
    if (!pathname.startsWith('/portfolio/')) { response.writeHead(404).end(); return }
    const relative = pathname.slice('/portfolio/'.length) || 'index.html'
    const file = resolve(root, relative)
    if (!file.startsWith(root + sep)) { response.writeHead(403).end(); return }
    try {
      const body = await readFile(file)
      const type = file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.svg') ? 'image/svg+xml' : 'text/html'
      response.writeHead(200, { 'Content-Type': type }).end(body)
    } catch { response.writeHead(404).end() }
  })
  await new Promise<void>((done) => server.listen(0, '127.0.0.1', done))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Local test server did not bind')
  try {
    page.on('requestfailed', (request) => failures.push(request.url()))
    page.on('response', (response) => { if (response.status() >= 400) failures.push(response.url()) })
    await page.goto(`http://127.0.0.1:${address.port}/portfolio/#projects`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('HawkPP')
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(page.locator('.hero')).toHaveCSS('display', 'grid')
    const favicon = await page.locator('link[rel="icon"]').evaluate((element) => (element as HTMLLinkElement).href)
    expect((await page.request.get(favicon)).status()).toBe(200)
    await page.reload()
    await expect(page.getByRole('article')).toHaveCount(2)
    expect(failures).toEqual([])
  } finally {
    await page.goto('about:blank')
    server.closeAllConnections()
    await new Promise<void>((done, reject) => server.close((error) => error ? reject(error) : done()))
  }
})
