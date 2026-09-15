import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Icon from '../components/Icon.jsx'

const solutions=[
  ['01','Launch a Digital Product','From a rough idea to a real MVP with strategy, UX, engineering, launch and an iteration plan.',['Product strategy','UI/UX','Web / SaaS / Mobile','Cloud','Analytics']],
  ['02','Build & Grow E-commerce','Store development connected to merchandising, analytics, SEO, campaigns and automation.',['E-commerce','UI/UX','SEO','Paid media','Automation']],
  ['03','Automate Business Operations','Map repetitive work, connect systems and introduce AI or workflow automation where it makes operational sense.',['AI Agents','Integrations','Dashboards','CRM / ERP','Workflows']],
  ['04','Create a Digital Brand','Turn an early business identity into a coherent brand, website, social presence and campaign system.',['Branding','Graphic design','Web','Social','Content']],
  ['05','Modernize Internal Systems','Replace fragmented spreadsheets or legacy tools with clearer portals, dashboards and custom operational software.',['Custom software','Portals','Dashboards','APIs','Data']],
  ['06','Build a Growth Engine','Connect content, search, paid media, social, landing experiences and analytics into a repeatable marketing system.',['Digital marketing','SEO','Social','Ads','Analytics']],
]
const path=[['01','DISCOVER'],['02','DEFINE'],['03','DESIGN'],['04','BUILD'],['05','LAUNCH'],['06','MEASURE'],['07','IMPROVE']]
export default function Solutions(){return <>
  <Meta title="Digital Business Solutions — KHIDevs" description="Connected KHIDevs solutions for launching products, growing e-commerce, automating operations and modernizing digital businesses." path="/solutions/"/>
  <PageHero eyebrow="SOLUTIONS" title={<>Start with the <em style={{fontStyle:'normal',color:'var(--accent)'}}>business problem.</em></>} lead="Technology, creative and growth services become more useful when they are assembled around a real objective." index="SOLUTIONS / OUTCOME-LED"/>
  <section className="section"><div className="shell"><SectionHead index="01" label="CONNECTED SOLUTIONS" title="Outcomes first. Capabilities second."/><div className="solutions-grid">{solutions.map(s=><article className="solution-card reveal" key={s[0]}><span className="micro">{s[0]} / SOLUTION</span><Icon name="up" size={21}/><h2>{s[1]}</h2><p>{s[2]}</p><ul>{s[3].map(t=><li key={t}>{t}</li>)}</ul></article>)}</div></div></section>
  <section className="section section-tint"><div className="shell growth-grid"><div className="growth-copy reveal"><span className="eyebrow">END-TO-END</span><h2>Design → Build → Launch → <em>Grow.</em></h2><p>A solution can begin in one discipline and continue into the next without resetting context every time.</p><Link className="button" to="/contact/">Talk through your goal <Icon name="up" size={16}/></Link></div><div className="growth-path reveal">{path.map(r=><div className="path-row" key={r[0]}><span>{r[0]}</span><b>{r[1]}</b><i></i></div>)}</div></div></section>
</>}
