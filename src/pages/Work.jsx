import React, { useMemo, useState } from 'react'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ProjectVisual from '../components/ProjectVisual.jsx'
import LiveProjectVisual from '../components/LiveProjectVisual.jsx'
import Icon from '../components/Icon.jsx'
import data from '../data/siteData.json'

const filterConfig=[
  {key:'All',label:'All',match:()=>true},
  {key:'Shopify',label:'Shopify',match:p=>p.platform==='Shopify'||p.tags?.includes('Shopify')},
  {key:'Website',label:'Website',match:p=>p.category==='Website'},
  {key:'Web App',label:'Web App',match:p=>p.category==='Web App'},
  {key:'E-commerce',label:'E-commerce',match:p=>p.category==='E-commerce'},
  {key:'Portfolio',label:'Portfolio',match:p=>p.category==='Portfolio'},
]

function ProjectCard({project,index,compact=false,visible=true,position=0}){
  const motionClass=compact?'portfolio-filter-card':'reveal'
  const visibilityClass=compact?(visible?'is-filter-visible':'is-filter-hidden'):''
  const style=compact?{'--filter-delay':`${Math.min(position,8)*32}ms`}:undefined
  return <article className={`live-project-card ${motionClass} ${visibilityClass} ${project.platform==='Shopify'?'shopify-project-card':''} ${compact?'compact-live-card':''}`} data-category={project.category} data-platform={project.platform} aria-hidden={compact&&!visible?'true':undefined} style={style}>
    <a className="live-project-visual-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live project`}><LiveProjectVisual project={project} index={index}/></a>
    <div className="live-project-copy">
      <div className="case-top"><div className="project-labels"><span className="eyebrow live-category">{project.category}</span>{project.platform&&<span className={`platform-badge ${project.platform==='Shopify'?'shopify-badge':''}`}>{project.platform}</span>}</div><span className="project-type live-type"><i></i> Live</span></div>
      <h2>{project.title}</h2><div className="project-role">{project.role}</div>{!compact&&<p>{project.copy}</p>}
      <div className="live-project-bottom"><div className="case-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="live-project-button" href={project.url} target="_blank" rel="noopener noreferrer">View live project <Icon name="up" size={15}/></a></div>
    </div>
  </article>
}

export default function Work(){
  const [filter,setFilter]=useState('All')
  const featured=data.liveProjects.filter(p=>p.featured)
  const activeFilter=filterConfig.find(f=>f.key===filter)||filterConfig[0]
  const filtered=useMemo(()=>data.liveProjects.filter(project=>activeFilter.match(project)),[activeFilter])
  const visibleSlugs=useMemo(()=>new Set(filtered.map(project=>project.slug)),[filtered])
  const counts=useMemo(()=>Object.fromEntries(filterConfig.map(f=>[f.key,data.liveProjects.filter(f.match).length])),[])
  return <>
    <Meta title="KHIDevs Portfolio — Shopify, Websites, Web Apps & E-commerce" description="Explore all KHIDevs live projects including Shopify e-commerce development, responsive websites, web apps, portfolio experiences and custom web builds." path="/work/"/>
    <PageHero eyebrow="PORTFOLIO" title={<>Real projects.<br/><em style={{fontStyle:'normal',color:'var(--accent)'}}>Direct live links.</em></>} lead="Browse the complete KHIDevs project library: Shopify commerce, custom websites, web applications, e-commerce experiences and portfolio work." index={`${data.liveProjects.length} LIVE PROJECTS`}/>
    <section className="section"><div className="shell"><SectionHead index="01" label="FEATURED BUILDS" title="Selected projects, presented like agency work"/><div className="portfolio-intro-row featured-intro reveal"><div><h2 className="display-title portfolio-display">Commerce, websites and <em>digital presence.</em></h2><p>These featured builds lead the portfolio: a live Shopify store plus selected responsive web projects. Every card links directly to the published project so prospective clients can explore the work themselves.</p></div><div className="portfolio-proof"><span><b>{featured.length}</b> Featured builds</span><span><b>{counts.Shopify}</b> Shopify store</span><span><b>{data.liveProjects.length}</b> Live projects</span></div></div><div className="live-project-grid-cards featured-project-grid">{featured.map((p,i)=><ProjectCard project={p} index={i} key={p.slug}/>)}</div></div></section>
    <section className="section section-tint" id="all-projects"><div className="shell"><SectionHead index="02" label="ALL LIVE PROJECTS" title="The complete KHIDevs project library"/><div className="portfolio-intro-row reveal"><div><h2 className="display-title portfolio-display">All projects.<br/><em>One portfolio.</em></h2><p>Use the filters below to browse every published project. Filters update instantly and every project keeps its direct live link.</p><div className="portfolio-result-count" aria-live="polite" aria-atomic="true">Showing <strong>{filtered.length}</strong> of <strong>{data.liveProjects.length}</strong> live projects</div></div><div className="work-filter" aria-label="Filter portfolio projects">{filterConfig.map(item=><button type="button" className={filter===item.key?'active':''} aria-pressed={filter===item.key} onClick={()=>setFilter(item.key)} key={item.key}><span>{item.label}</span><small>{counts[item.key]}</small></button>)}</div></div>{filtered.length?<div className="live-project-grid-cards more-project-grid">{data.liveProjects.map((p,i)=>{const visible=visibleSlugs.has(p.slug);const visiblePosition=visible?filtered.findIndex(item=>item.slug===p.slug):0;return <ProjectCard project={p} index={i} compact visible={visible} position={visiblePosition} key={p.slug}/>})}</div>:<div className="portfolio-empty">No projects in this filter yet.</div>}</div></section>
    <section className="section"><div className="shell"><SectionHead index="03" label="EXPLORATIONS" title="Internal and concept work, clearly labeled"/><div className="intro-grid portfolio-concept-intro"><h2 className="display-title reveal">Ideas we use to <em>explore</em> systems.</h2><div className="intro-copy reveal"><p>These experiments are deliberately separated from the live portfolio above and remain clearly labeled as internal or concept work.</p></div></div><div className="work-page-grid">{data.projects.map((p,i)=><article className="project-card reveal" id={p.slug} key={p.slug}><div className="project-visual"><ProjectVisual index={i}/></div><div className="case-copy"><div className="case-top"><span className="eyebrow" style={{fontSize:'.62rem'}}>{p.category}</span><span className="project-type">{p.type}</span></div><h2>{p.title}</h2><p>{p.copy}</p><div className="case-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></section>
  </>
}
