import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import Icon from '../components/Icon.jsx'
import SectionHead from '../components/SectionHead.jsx'
import data from '../data/siteData.json'

const anchors={'Technology & Development':'build','Creative & Design':'design','Digital Marketing & Growth':'grow','Business & Digital Solutions':'automate'}
const groupNotes={
  'Technology & Development':'Custom engineering, platforms, commerce, apps, AI and the systems that power digital businesses.',
  'Creative & Design':'Brand, interface and visual communication services that make products and companies feel credible and consistent.',
  'Digital Marketing & Growth':'Search, social, paid media, content and measurement services designed to grow visibility and demand.',
  'Business & Digital Solutions':'Automation, dashboards, portals and connected systems that improve how a business operates behind the scenes.',
}

export default function Services(){
  const capabilityCount=Object.values(data.serviceCatalog||{}).reduce((total,items)=>total+items.length,0)
  return <>
    <Meta title="Full-Service Digital Agency Services — KHIDevs" description="Explore KHIDevs services across web and software development, Shopify and e-commerce, design and branding, AI automation, digital marketing, SEO, social media and business systems." path="/services/"/>
    <PageHero eyebrow="SERVICES" title={<>Everything digital.<br/><em style={{fontStyle:'normal',color:'var(--accent)'}}>One connected agency.</em></>} lead="KHIDevs brings technology, creative, automation and growth under one roof — from websites and Shopify stores to branding, AI systems, SEO, social media and business automation." index={`${capabilityCount}+ CAPABILITIES`}/>
    <section className="section"><div className="shell"><div className="intro-grid"><h2 className="display-title reveal">Choose a capability.<br/>Keep the <em>ecosystem</em> connected.</h2><div className="intro-copy reveal"><p>Bring us in for one focused service or for a connected end-to-end engagement. Our core service pages explain the major capabilities in detail, while the complete agency directory below shows the wider range of work we can support.</p></div></div><SectionHead index="01" label="CORE SERVICE AREAS" title="Detailed services with dedicated pages"/>{Object.entries(data.groups).map(([group,slugs],gi)=><React.Fragment key={group}><div className="service-group-title" id={anchors[group]}><span className="micro" style={{color:'var(--accent)'}}>{String(gi+1).padStart(2,'0')}</span><h2>{group}</h2><i></i></div><div className="services-list">{slugs.map((slug,i)=>{const s=data.services[slug];return <Link className="service-row reveal" to={`/services/${slug}/`} key={slug}><span>{String(i+1).padStart(2,'0')}</span><h3>{s.title}</h3><p>{s.description}</p><Icon name="up" size={18}/></Link>})}</div></React.Fragment>)}</div></section>
    <section className="section section-tint" id="complete-service-directory"><div className="shell"><SectionHead index="02" label="COMPLETE AGENCY DIRECTORY" title="A complete digital agency, not just a development studio"/><div className="service-directory-intro reveal"><div><span className="eyebrow">{capabilityCount}+ AGENCY CAPABILITIES</span><h2>Build. Design.<br/>Automate. <em>Grow.</em></h2></div><p>These are the services KHIDevs can support across product delivery, creative, marketing and digital operations. A client can bring us a digital business problem and get the right combination of strategy, design, technology and growth support.</p></div><div className="service-directory-grid">{Object.entries(data.serviceCatalog||{}).map(([group,items],gi)=><article className="service-directory-card reveal" id={`directory-${anchors[group]||gi}`} key={group}><div className="service-directory-head"><span>{String(gi+1).padStart(2,'0')}</span><div><small>{anchors[group]?.toUpperCase()}</small><h3>{group}</h3></div><b>{items.length}</b></div><p>{groupNotes[group]}</p><div className="service-directory-list">{items.map(item=><span key={item}><i>+</i>{item}</span>)}</div><Link className="text-link" to={`/contact/?service=${encodeURIComponent(group)}`}>Discuss {group.toLowerCase()} <Icon name="arrow" size={15}/></Link></article>)}</div></div></section>
    <section className="section"><div className="shell"><div className="problem-panel reveal"><div><span className="eyebrow">A DIFFERENT STARTING POINT</span><h2>Don't choose a service yet.<br/>Choose the <em style={{fontStyle:'normal',color:'var(--accent)'}}>outcome.</em></h2><p>If you know the business result but not the solution, that is enough. We can scope the product, platform, creative, automation or growth path with you.</p></div><div><Link className="button" to="/contact/?service=not-sure">Describe your goal <Icon name="arrow" size={16}/></Link></div></div></div></section>
  </>
}
