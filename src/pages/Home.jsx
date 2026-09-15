import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ProjectVisual from '../components/ProjectVisual.jsx'
import LiveProjectVisual from '../components/LiveProjectVisual.jsx'
import Meta from '../components/Meta.jsx'
import data from '../data/siteData.json'

const capabilities=['Websites','SaaS','Mobile Apps','AI','Automation','Branding','UI/UX','E-commerce','SEO','Social Media','Paid Media','Games']
const growth=[['01','BRAND'],['02','WEBSITE / APP'],['03','E-COMMERCE'],['04','ANALYTICS'],['05','SEO + ADS'],['06','AUTOMATION'],['07','GROWTH']]
const principles=[
  ['01','One agency','Technology, design, automation and growth can stay connected under one team.'],
  ['02','Custom solutions','We shape the solution around the business instead of forcing every problem into one template.'],
  ['03','Technology agnostic','We select tools based on requirements, budget, maintainability and speed—not loyalty to one stack.'],
  ['04','End-to-end','Strategy, design, development, launch, marketing and iteration can work as one process.'],
  ['05','Scalable thinking','We design the next practical version without overengineering day one.'],
  ['06','Long-term partner','We can keep improving, supporting, automating and marketing after launch.'],
]

export default function Home(){
  return <>
    <Meta title="KHIDevs — Build. Design. Automate. Grow." description="KHIDevs is a full-service digital agency helping businesses build digital products, create brands, automate operations and grow online." path="/"/>
    <section className="hero"><div className="hero-glow a"></div><div className="hero-glow b"></div><div className="shell hero-grid">
      <div className="hero-top"><div><span className="eyebrow reveal">FULL-SERVICE DIGITAL AGENCY</span><h1 className="reveal"><span>Build.</span><span>Design.</span><span className="hero-line-split"><em>Automate.</em> <b>Grow.</b></span></h1></div>
        <div className="hero-side reveal"><p>KHIDevs is a full-service digital agency for websites, Shopify and e-commerce, software, apps, AI automation, branding, design, SEO, social media, paid marketing and business systems.</p><div className="hero-actions"><Link className="button" data-magnetic="true" to="/contact/">Start a project <Icon name="up" size={16}/></Link><Link className="text-link" to="/services/">Explore capabilities <Icon name="arrow" size={15}/></Link></div></div>
      </div>
      <div className="command-stage reveal"><div className="command-top"><div className="window-dots"><i></i><i></i><i></i></div><span className="command-url">khidevs://digital-ecosystem</span><span className="command-status">SYSTEM READY</span></div>
        <div className="command-body"><div className="command-side"><span className="active"><Icon name="code" size={17}/></span><span><Icon name="pen" size={17}/></span><span><Icon name="spark" size={17}/></span><span><Icon name="chart" size={17}/></span></div>
          <div className="ecosystem"><div className="eco-line"></div><div className="eco-line b"></div><div className="eco-center"><div><strong>KHI</strong><small>ECOSYSTEM</small></div></div><div className="eco-node n1"><small>01 / BUILD</small><b>Products & platforms</b></div><div className="eco-node n2"><small>02 / DESIGN</small><b>Brands & interfaces</b></div><div className="eco-node n3"><small>03 / AUTOMATE</small><b>AI & operations</b></div><div className="eco-node n4"><small>04 / GROW</small><b>Marketing & performance</b></div></div>
        </div>
      </div>
      <div className="hero-foot"><span>Technology</span><i></i><span>Creative</span><i></i><span>AI & Automation</span><i></i><span>Marketing & Growth</span><i></i><span>{Object.values(data.serviceCatalog||{}).flat().length}+ Capabilities</span></div>
    </div></section>

    <section className="marquee" aria-label="Capabilities"><div className="marquee-track">{[...capabilities,...capabilities].map((item,i)=><React.Fragment key={`${item}-${i}`}><span>{item}</span><i>✦</i></React.Fragment>)}</div></section>

    <section className="section"><div className="shell"><SectionHead index="01" label="ONE DIGITAL PARTNER" title="Technology, creativity and growth — under one roof."/>
      <div className="intro-grid"><h2 className="display-title reveal">A complete agency for <em>build, design, automation</em> and growth.</h2><div className="intro-copy reveal"><p>KHIDevs works across product engineering, Shopify and e-commerce, brand and UI/UX, AI automation, SEO, social media, paid advertising and business systems—so your digital presence does not get lost between disconnected vendors.</p><p><strong>You bring the idea or business problem.</strong> We help define what should be built, how it should feel, what can be automated and how it can grow.</p></div></div>
      <div className="pillar-grid">{data.pillars.map(p=><Link className="pillar-card reveal" to={`/services/#${p.id}`} key={p.id}><div className="pillar-top"><span>{p.no} / {p.label}</span><Icon name="up" size={19}/></div><h3>{p.title}</h3><p>{p.copy}</p><div className="pillar-tags">{p.items.map(item=><span key={item}>{item}</span>)}</div></Link>)}</div>
    </div></section>

    <section className="section section-tint growth-band"><div className="shell growth-grid"><div className="growth-copy reveal"><span className="eyebrow">BUILD + GROW</span><h2>We don't just build it.<br/><em>We help it grow.</em></h2><p>Brand, website, commerce, analytics, search, paid media and automation should reinforce each other. We can connect the whole journey instead of handing you a finished build and disappearing.</p><div className="hero-actions"><Link className="button" to="/solutions/">See connected solutions <Icon name="arrow" size={16}/></Link></div></div><div className="growth-path reveal">{growth.map(r=><div className="path-row" key={r[0]}><span>{r[0]}</span><b>{r[1]}</b><i></i></div>)}</div></div></section>

    <section className="section"><div className="shell"><SectionHead index="02" label="PRODUCT LIFECYCLE" title="From a first idea to a system that keeps improving"/><h2 className="display-title reveal" style={{maxWidth:1050,marginBottom:58}}>One connected path from <em>idea</em> to growth.</h2><div className="lifecycle">{data.lifecycle.map(step=><article className="life-step reveal" key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div></div></section>

    <section className="section section-tint"><div className="shell"><SectionHead index="03" label="SELECTED WORK" title="Shopify commerce + custom web projects"/><div className="intro-grid" style={{marginBottom:58}}><h2 className="display-title reveal">Work clients can<br/><em>open and explore.</em></h2><div className="intro-copy reveal"><p>Selected live builds across Shopify e-commerce and custom websites. We lead with the projects that best represent KHIDevs as a practical digital agency, then keep the full project library available on the portfolio page.</p><Link className="text-link" to="/work/">Explore all {data.liveProjects.length} live projects <Icon name="arrow" size={15}/></Link></div></div>
      <div className="live-project-grid-cards home-live-projects">{data.liveProjects.filter(p=>p.featured).map((p,i)=><article className={`live-project-card reveal ${p.platform==='Shopify'?'shopify-project-card':''}`} key={p.slug}><a className="live-project-visual-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} live project`}><LiveProjectVisual project={p} index={i}/></a><div className="live-project-copy"><div className="case-top"><div className="project-labels"><span className="eyebrow live-category">{p.category}</span><span className={`platform-badge ${p.platform==='Shopify'?'shopify-badge':''}`}>{p.platform}</span></div><span className="project-type live-type"><i></i> Live</span></div><h2>{p.title}</h2><div className="project-role">{p.role}</div><p>{p.copy}</p><div className="live-project-bottom"><div className="case-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="live-project-button" href={p.url} target="_blank" rel="noopener noreferrer">Visit website <Icon name="up" size={15}/></a></div></div></article>)}</div>
    </div></section>

    <section className="section"><div className="shell tech-split"><div className="reveal"><span className="eyebrow">TECHNOLOGY AGNOSTIC</span><h2>You don't need to know what technology you need.</h2><p>Tell us what you are trying to build or improve. We will help decide whether the right answer is custom development, a proven platform, automation, AI—or something simpler.</p><Link className="button" to="/contact/">Tell us the problem <Icon name="up" size={16}/></Link></div><div className="tech-cloud reveal">{['React','PHP','Node.js','Python','Swift','Flutter','Shopify','WordPress','Odoo','WooCommerce','AI Agents','RAG','APIs','Cloud','SEO','Analytics'].map(t=><span key={t}>{t}</span>)}</div></div></section>

    <section className="section section-tint"><div className="shell"><div className="problem-panel reveal"><div><span className="eyebrow">NOT SURE WHERE TO START?</span><h2>You bring the idea.<br/>We figure out the <em style={{fontStyle:'normal',color:'var(--accent)'}}>digital system.</em></h2><p>You do not need a technical specification before contacting us. A goal, problem or rough idea is enough to begin.</p></div><div><div className="problem-checks">{['What should be built','Which technology fits','What can be automated','How it should launch','How it can be marketed','What to improve next'].map(c=><span key={c}><i>✓</i>{c}</span>)}</div><div className="hero-actions"><Link className="button" to="/contact/?service=not-sure">I'm not sure what I need yet <Icon name="arrow" size={15}/></Link></div></div></div></div></section>

    <section className="section"><div className="shell"><SectionHead index="04" label="WHY KHIDEVS" title="Built around the business outcome"/><div className="principles">{principles.map(v=><article className="principle reveal" key={v[0]}><span>{v[0]}</span><h3>{v[1]}</h3><p>{v[2]}</p></article>)}</div></div></section>
  </>
}
