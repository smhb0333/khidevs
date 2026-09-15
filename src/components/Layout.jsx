import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import Brand from './Brand.jsx'
import data from '../data/siteData.json'

const email='hello@khidevs.com'
const groupSlugs = Object.entries(data.groups)
const serviceAnchors={'Technology & Development':'build','Creative & Design':'design','Business & Digital Solutions':'automate','Digital Marketing & Growth':'grow'}
const capabilityCount=Object.values(data.serviceCatalog||{}).reduce((total,items)=>total+items.length,0)

function useSiteEffects(setMenuOpen){
  const location=useLocation()
  useEffect(()=>{
    setMenuOpen(false)
    const hash=location.hash
    requestAnimationFrame(()=>{
      if(hash){ const el=document.querySelector(hash); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); else window.scrollTo(0,0) }
      else window.scrollTo(0,0)
    })
  },[location.pathname,location.hash,setMenuOpen])

  useEffect(()=>{
    const root=document.documentElement
    try{ const saved=localStorage.getItem('khidevs-theme'); if(saved) root.dataset.theme=saved }catch(_){ }
  },[])

  useEffect(()=>{
    const header=document.getElementById('siteHeader')
    const progress=document.querySelector('.scroll-progress span')
    const update=()=>{
      const y=window.scrollY||0
      header?.classList.toggle('scrolled',y>16)
      if(progress){ const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight); progress.style.width=`${Math.min(100,(y/max)*100)}%` }
    }
    update(); window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update,{passive:true})
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}
  },[])

  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals=[...document.querySelectorAll('.reveal')]
    if(reduced||!('IntersectionObserver' in window)){reveals.forEach(el=>el.classList.add('in-view'));return}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08})
    reveals.forEach(el=>observer.observe(el)); return()=>observer.disconnect()
  },[location.pathname])

  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(reduced||window.matchMedia('(pointer: coarse)').matches)return
    const cleanups=[]
    document.querySelectorAll('[data-magnetic]').forEach(el=>{
      const move=e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.13;const y=(e.clientY-r.top-r.height/2)*.13;el.style.transform=`translate(${x}px,${y}px)`}
      const leave=()=>{el.style.transform=''}
      el.addEventListener('mousemove',move);el.addEventListener('mouseleave',leave)
      cleanups.push(()=>{el.removeEventListener('mousemove',move);el.removeEventListener('mouseleave',leave)})
    })
    return()=>cleanups.forEach(fn=>fn())
  },[location.pathname])
}

function navActive(pathname,key){
  if(key==='services') return pathname.startsWith('/services')
  return pathname.startsWith(`/${key}`)
}

export default function Layout({children}){
  const location=useLocation()
  const [menuOpen,setMenuOpen]=useState(false)
  const [cookieVisible,setCookieVisible]=useState(false)
  useSiteEffects(setMenuOpen)

  useEffect(()=>{
    document.body.classList.toggle('menu-open',menuOpen)
    return()=>document.body.classList.remove('menu-open')
  },[menuOpen])
  useEffect(()=>{ try{ setCookieVisible(!localStorage.getItem('khidevs-cookie-choice')) }catch(_){ setCookieVisible(false) } },[])
  useEffect(()=>{ const key=e=>{if(e.key==='Escape')setMenuOpen(false)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[])

  const toggleTheme=()=>{
    const root=document.documentElement
    const next=root.dataset.theme==='light'?'dark':'light'
    root.dataset.theme=next
    try{localStorage.setItem('khidevs-theme',next)}catch(_){ }
  }
  const chooseCookie=choice=>{try{localStorage.setItem('khidevs-cookie-choice',choice)}catch(_){ }setCookieVisible(false)}
  const active=useMemo(()=>({
    services:navActive(location.pathname,'services'),solutions:navActive(location.pathname,'solutions'),work:navActive(location.pathname,'work'),technologies:navActive(location.pathname,'technologies'),about:navActive(location.pathname,'about'),process:navActive(location.pathname,'process')
  }),[location.pathname])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="scroll-progress" aria-hidden="true"><span></span></div>
    <header className="site-header" id="siteHeader">
      <div className="shell nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-drop">
            <button className={`nav-link ${active.services?'active':''}`} type="button">Services <span>+</span></button>
            <div className="mega-menu">
              <div className="mega-intro"><span className="micro">FULL-SERVICE AGENCY / 04</span><strong>One agency across product, brand, automation and growth.</strong><Link to="/services/">Explore {capabilityCount}+ capabilities <Icon name="arrow" size={15}/></Link></div>
              <div className="mega-grid">
                {groupSlugs.map(([group,slugs])=><div className="mega-group" key={group}><b>{group}</b>{slugs.slice(0,5).map(slug=><Link key={slug} to={`/services/${slug}/`}>{data.services[slug].title}</Link>)}<Link className="mega-all-link" to={`/services/#directory-${serviceAnchors[group]}`}>View all {data.serviceCatalog?.[group]?.length||slugs.length} services →</Link></div>)}
              </div>
            </div>
          </div>
          <NavLink className={`nav-link ${active.solutions?'active':''}`} to="/solutions/">Solutions</NavLink>
          <NavLink className={`nav-link ${active.work?'active':''}`} to="/work/">Work</NavLink>
          <NavLink className={`nav-link ${active.technologies?'active':''}`} to="/technologies/">Technologies</NavLink>
          <NavLink className={`nav-link ${active.about?'active':''}`} to="/about/">About</NavLink>
          <NavLink className={`nav-link ${active.process?'active':''}`} to="/process/">Process</NavLink>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme"><span className="theme-sun"><Icon name="sun" size={16}/></span><span className="theme-moon"><Icon name="moon" size={16}/></span></button>
          <Link className="button button-small desktop-cta" to="/contact/">Start a project <Icon name="up" size={15}/></Link>
          <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobileNav" aria-label="Open navigation" onClick={()=>setMenuOpen(true)}><Icon name="menu" size={22}/></button>
        </div>
      </div>
    </header>
    <div className={`mobile-nav ${menuOpen?'open':''}`} id="mobileNav" aria-hidden={!menuOpen}>
      <div className="mobile-nav-top"><Brand onClick={()=>setMenuOpen(false)}/><button className="mobile-menu-close" type="button" aria-label="Close navigation" onClick={()=>setMenuOpen(false)}><Icon name="close" size={22}/></button></div>
      <div className="mobile-nav-body"><span className="micro">NAVIGATION / 07</span>
        {[['01','Services','/services/'],['02','Solutions','/solutions/'],['03','Work','/work/'],['04','Technologies','/technologies/'],['05','About','/about/'],['06','Process','/process/'],['07','Contact','/contact/']].map(([n,label,to])=><Link key={to} to={to} onClick={()=>setMenuOpen(false)}><small>{n}</small>{label}<Icon name="up" size={18}/></Link>)}
      </div>
      <div className="mobile-nav-foot"><span>Technology × Creativity × Growth</span><a href={`mailto:${email}`}>{email}</a></div>
    </div>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="shell">
      <div className="footer-cta reveal"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Have an idea?<br/><em>Let's build it.</em></h2></div><Link className="circle-cta" to="/contact/" aria-label="Start a project"><Icon name="up" size={30}/></Link></div>
      <div className="footer-grid">
        <div className="footer-brand"><Brand/><p>Full-service digital partner for technology, creative, automation and growth.</p><a className="mail-link" href={`mailto:${email}`}>{email}</a></div>
        <div className="footer-col"><b>Explore</b><Link to="/services/">Services</Link><Link to="/solutions/">Solutions</Link><Link to="/work/">Work</Link><Link to="/technologies/">Technologies</Link></div>
        <div className="footer-col"><b>Company</b><Link to="/about/">About</Link><Link to="/process/">Process</Link><Link to="/contact/">Contact</Link><Link to="/legal/privacy/">Privacy</Link></div>
        <div className="footer-col"><b>Popular services</b><Link to="/services/web-development/">Web Development</Link><Link to="/services/ai-automation/">AI Automation</Link><Link to="/services/branding/">Branding</Link><Link to="/services/digital-marketing/">Digital Marketing</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} KHIDevs. All rights reserved.</span><span>Build. Design. Automate. Grow.</span><span>www.khidevs.com</span></div>
    </div></footer>
    {cookieVisible && <div className="cookie-panel" id="cookiePanel"><p>We use essential browser storage to keep preferences such as your theme and cookie choice.</p><div><button className="button button-ghost button-small" onClick={()=>chooseCookie('essential')}>Essential only</button><button className="button button-small" onClick={()=>chooseCookie('all')}>Accept</button></div></div>}
  </>
}
