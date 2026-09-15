import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Icon from '../components/Icon.jsx'
import data from '../data/siteData.json'

export default function Technologies(){return <>
  <Meta title="Technologies & Platforms — KHIDevs" description="KHIDevs works across modern web, mobile, commerce, AI, automation, cloud and growth platforms, choosing technology around project requirements." path="/technologies/"/>
  <PageHero eyebrow="TECHNOLOGIES" title={<>The right tool for the <em style={{fontStyle:'normal',color:'var(--accent)'}}>actual job.</em></>} lead="We are technology-agnostic. The stack should fit the product, team, budget, performance needs and long-term maintenance—not the other way around." index="STACK / FLEXIBLE"/>
  <section className="section"><div className="shell"><SectionHead index="01" label="CAPABILITIES" title="A working toolkit, not a mandatory stack"/><div className="tech-groups">{Object.entries(data.tech).map(([group,items],i)=><article className="tech-group reveal" key={group}><span className="micro" style={{color:'var(--accent)'}}>{String(i+1).padStart(2,'0')}</span><h2>{group}</h2><div className="tech-cloud">{items.map(item=><span key={item}>{item}</span>)}</div></article>)}</div><div className="agnostic-callout reveal"><h2>You do not need to select the stack before you contact us.</h2><p>Tell us what needs to work, who will use it, what systems it must connect to, and what constraints matter. We will recommend a practical route—including no-code or an established platform when custom engineering is unnecessary.</p></div></div></section>
  <section className="section section-tint"><div className="shell"><div className="problem-panel reveal"><div><span className="eyebrow">CUSTOM OR PLATFORM?</span><h2>React? PHP? Shopify? Flutter? AI?</h2><p>That is our decision to help you make, not homework you need to finish before the first conversation.</p></div><div><Link className="button" to="/contact/?service=not-sure">Describe what you need <Icon name="arrow" size={16}/></Link></div></div></div></section>
</>}
