import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Icon from '../components/Icon.jsx'
import data from '../data/siteData.json'
export default function Process(){return <>
 <Meta title="Our Process — KHIDevs" description="See the KHIDevs digital product process from discovery and strategy through design, development, launch, marketing, automation and growth." path="/process/"/>
 <PageHero eyebrow="PROCESS" title={<>A process that keeps the <em style={{fontStyle:'normal',color:'var(--accent)'}}>business goal visible.</em></>} lead="The exact scope changes by project, but the principle stays the same: understand first, choose deliberately, build clearly, launch carefully and improve with evidence." index="PROCESS / 08 STAGES"/>
 <section className="section"><div className="shell"><SectionHead index="01" label="END-TO-END" title="The complete digital product lifecycle"/><div className="process-list">{data.lifecycle.map(s=><div className="process-row reveal" key={s[0]}><span>{s[0]}</span><h2>{s[1]}</h2><p>{s[2]} We define decisions, owners and the next practical milestone before moving forward.</p></div>)}</div></div></section>
 <section className="section section-tint"><div className="shell"><div className="problem-panel reveal"><div><span className="eyebrow">NO PERFECT BRIEF REQUIRED</span><h2>Start with what you know.</h2><p>A rough idea, operational problem, existing product or marketing challenge is enough. Discovery is part of the work.</p></div><div><Link className="button" to="/contact/">Start the conversation <Icon name="arrow" size={16}/></Link></div></div></div></section>
</>}
