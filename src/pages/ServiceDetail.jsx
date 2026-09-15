import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import Icon from '../components/Icon.jsx'
import SectionHead from '../components/SectionHead.jsx'
import data from '../data/siteData.json'

export default function ServiceDetail(){
  const {slug}=useParams()
  const s=data.services[slug]
  if(!s) return <Navigate to="/404" replace />
  return <>
    <Meta title={`${s.title} — KHIDevs`} description={s.description} path={`/services/${slug}/`} service={s}/>
    <section className="service-hero"><div className="shell">
      <div className="breadcrumbs reveal"><Link to="/">Home</Link><span>/</span><Link to="/services/">Services</Link><span>/</span><b>{s.title}</b></div>
      <div className="service-hero-grid"><div><span className="eyebrow reveal">{s.pillar.toUpperCase()}</span><h1 className="reveal">{s.heading}</h1></div><div className="service-hero-side reveal"><p>{s.description}</p><Link className="button" to={`/contact/?service=${encodeURIComponent(s.title)}`}>Start a project <Icon name="up" size={16}/></Link></div></div>
      <div className="service-signal reveal"><span>CAPABILITY</span><strong>{s.title}</strong><i></i><span>OUTCOME-LED</span></div>
    </div></section>
    <section className="section"><div className="shell"><SectionHead index="01" label="THE APPROACH" title="What this service is built to achieve"/><div className="service-detail-grid"><div className="service-story reveal"><span className="micro">{s.kicker.toUpperCase()}</span><h2>{s.summary}</h2><p>We keep scope, interface and engineering connected to the business goal. Technology is selected for the problem—not because it is fashionable.</p></div><div className="outcome-list">{s.outcomes.map((item,i)=><div className="outcome-row reveal" key={item}><span>{String(i+1).padStart(2,'0')}</span><p>{item}</p></div>)}</div></div></div></section>
    <section className="section section-tint"><div className="shell"><SectionHead index="02" label="WHAT WE CAN DELIVER" title="A focused scope can start small and grow"/><div className="deliverables-grid">{s.deliverables.map((item,i)=><article className="deliverable-card reveal" key={item}><span>{String(i+1).padStart(2,'0')}</span><h3>{item}</h3><i><Icon name="up" size={18}/></i></article>)}</div></div></section>
    <section className="section"><div className="shell tech-split"><div className="reveal"><span className="eyebrow">TECHNOLOGY, WHEN IT MATTERS</span><h2>We choose the stack after we understand the job.</h2><p>These are tools we can work with—not a requirement list you need to understand before talking to us.</p></div><div className="tech-cloud reveal">{s.stack.map(item=><span key={item}>{item}</span>)}</div></div></section>
    <section className="section section-dark"><div className="shell"><SectionHead index="03" label="CONNECTED SERVICES" title="One agency, one digital ecosystem"/><div className="related-grid">{s.related.map(rel=>{const r=data.services[rel];return <Link className="related-card reveal" to={`/services/${rel}/`} key={rel}><span>{r.pillar}</span><h3>{r.title}</h3><p>{r.description}</p><Icon name="up" size={22}/></Link>})}</div></div></section>
  </>
}
