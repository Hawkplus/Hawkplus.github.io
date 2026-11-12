import { useState } from 'react'
import { content } from './content'
import type { Project } from './content'
import { Navigation } from './components/Navigation'
import { OpenPathArt, ProjectArt } from './components/ProjectArt'

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  )
}

function Mark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M6 31C12 7 25 5 30 15S23 33 18 26 26 9 35 7M10 34C15 14 29 10 30 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="35" cy="7" r="2.3" fill="currentColor" /></svg>
}

function ExplorationArt() {
  const [drawing, setDrawing] = useState(0)
  const strand = (i: number) => `M ${28 + i * 0.35} ${360 + i * 1.05} C ${200 + i * 1.7} ${385 - i * 1.5}, ${98 - i * 0.8} ${75 + i * 1.6}, ${292 + i * 0.5} ${98 + i * 1.3} C ${530 - i * 0.7} ${124 + i * 0.55}, ${440 + i * 0.5} ${375 - i * 0.9}, ${248 + i * 0.45} ${332 - i * 0.7} C ${100 + i * 0.4} ${300 - i * 0.8}, ${174 + i * 1.8} ${164 - i * 0.9}, ${420 + i * 0.8} ${34 + i * 0.5}`

  return (
    <figure className="exploration-art">
      <div className="art-stage">
        <svg className="strand-art" viewBox="0 0 540 460" fill="none" role="img" aria-labelledby="strand-title strand-desc">
          <title id="strand-title">探索的路径</title>
          <desc id="strand-desc">多条细线交织成开放的环，一条朱红色的路径穿行其中。原创抽象图形。</desc>
          <g className="art-guides" stroke="currentColor" strokeWidth="0.7">
            <path d="M18 218h504M270 12v424" strokeDasharray="2 7" />
            <circle cx="270" cy="218" r="184" strokeDasharray="2 7" />
            <path d="M14 14h12m-6-6v12M508 14h12m-6-6v12M14 430h12m-6-6v12M508 430h12m-6-6v12" />
          </g>
          <g className="strands" strokeWidth="0.9">
            {Array.from({ length: 43 }, (_, i) => <path key={i} d={strand(i)} />)}
          </g>
          <path key={drawing} className="thread-accent" d={strand(18)} pathLength="1" strokeWidth="1.8" />
          <circle cx="434.4" cy="43" r="4" className="thread-end" />
        </svg>
        <span className="art-side-note" aria-hidden="true">An open-ended exploration</span>
      </div>
      <figcaption>
        <span><span className="tiny-dot" />探索，总有新的路径。</span>
        <button className="replay-button" onClick={() => setDrawing((value) => value + 1)} aria-label="重新绘制探索路径动画">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15.5 7A6 6 0 1 0 16 12M15.5 2v5h-5" /></svg>
          重绘路径
        </button>
      </figcaption>
    </figure>
  )
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className={`project-entry project-${project.visual}`} aria-labelledby={`${project.id}-title`}>
      <ProjectArt visual={project.visual} />
      <div className="project-copy">
        <div className="project-meta"><span>{project.category}</span><span className="project-status"><span className="tiny-dot" />{project.accessNote ?? '公开项目'}</span></div>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-features" aria-label={`${project.title}的主要功能`}>
          {project.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <details className="project-details">
          <summary>项目说明<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M8 3v10" /></svg></summary>
          <p>{project.purpose}</p>
        </details>
        <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`访问${project.title}（在新标签页打开）`}>
          <span>访问项目<span className="project-domain">{project.domain}</span></span>
          <span className="link-circle"><Arrow diagonal /></span>
        </a>
      </div>
    </article>
  )
}

export default function App() {
  const hasNotes = content.notes.length > 0
  const navigation = [
    { id: 'projects', label: '作品' },
    { id: 'exploring', label: '探索' },
    { id: 'about', label: '关于' },
    ...(hasNotes ? [{ id: 'notes', label: '记录' }] : []),
  ]
  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <div id="top" className="page-top" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner shell">
          <a className="brand" href="#top" aria-label={`${content.name}，返回顶部`}><Mark /><span>{content.name}</span></a>
          <Navigation items={navigation} />
          <span className="header-note"><span className="tiny-dot" />慢慢打磨，持续更新</span>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker"><span className="short-rule" />{content.subtitle}<span lang="en">A personal collection</span></p>
            <h1 id="hero-title">{content.name}<span className="name-period">.</span></h1>
            <p className="hero-introduction">{content.introduction}</p>
            <p className="hero-description">{content.description}</p>
            <div className="hero-actions"><a className="primary-link" href="#projects">看看我的作品<Arrow /></a><a className="secondary-link" href="#about">关于这个小站<span aria-hidden="true">↗</span></a></div>
          </div>
          <ExplorationArt />
          <div className="hero-footnote"><span>从一个想法，到可以打开的作品。</span><a href="#projects" aria-label="向下浏览精选项目">继续浏览<svg viewBox="0 0 16 20" fill="none" aria-hidden="true"><path d="M8 2v15m-5-5 5 5 5-5" /></svg></a></div>
        </section>

        <section className="projects-section shell" id="projects" aria-labelledby="projects-title">
          <div className="section-heading"><div><p className="section-en" lang="en">Selected work</p><h2 id="projects-title">从问题出发的作品</h2></div><p>关于学习，也关于探索。<br />一些可以打开、持续打磨的小工具。</p></div>
          <div className="projects-list">{content.projects.map((project) => <ProjectEntry key={project.id} project={project} />)}</div>
        </section>

        <section className="exploring-section shell" id="exploring" aria-labelledby="exploring-title">
          <div className="ongoing-content">
            <div className="exploring-label"><span className="tiny-dot" /><span>继续探索中</span><span lang="en">Work in progress</span></div>
            <h2 id="exploring-title">{content.ongoing.title}</h2>
            <p>{content.ongoing.description}</p>
            <span className="ongoing-status"><span className="tiny-dot" />{content.ongoing.status}</span>
          </div>
          <OpenPathArt />
        </section>

        <section className="about-section shell" id="about" aria-labelledby="about-title">
          <div className="about-heading"><p className="section-en" lang="en">A little about this space</p><h2 id="about-title">{content.about.title}</h2><Mark className="about-mark" /></div>
          <div className="about-copy">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="about-signoff"><span className="about-signature">{content.name}</span><span lang="en">Always a work in progress.</span></div></div>
        </section>

        {hasNotes && <section className="notes-section shell" id="notes" aria-labelledby="notes-title"><div className="section-heading"><div><p className="section-en" lang="en">Field notes</p><h2 id="notes-title">沿途记录</h2></div></div><ol className="notes-list">{content.notes.map((note) => <li key={note.id}><time dateTime={note.date}>{note.date}</time><div><h3>{note.title}</h3><p>{note.summary}</p></div></li>)}</ol></section>}
      </main>

      <footer className="site-footer shell"><a href="#top" className="footer-brand" aria-label="返回页面顶部"><Mark /><span>{content.name}<small>作品与探索</small></span></a><span className="footer-note">保持好奇，慢慢更新。</span><a className="back-top" href="#top">回到顶部<Arrow /></a></footer>
    </>
  )
}
