import React from 'react'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'

const values=[
 ['01','Outcome before output','A deliverable matters only if it moves the business or user experience in the right direction.'],
 ['02','Clarity before complexity','We prefer a clear, maintainable solution over unnecessary technical theatre.'],
 ['03','One connected system','Brand, product, operations and growth should reinforce each other.'],
 ['04','Technology is a tool','We choose platforms and stacks around requirements instead of forcing every brief into the same technology.'],
 ['05','Design for real use','Responsive behavior, accessibility and everyday workflows matter more than a perfect static screenshot.'],
 ['06','Improve after launch','A launch is a starting point for measurement, support, iteration, automation and growth.'],
]
export default function About(){return <>
 <Meta title="About KHIDevs — Full-Service Digital Agency" description="KHIDevs combines technology, design, automation and digital growth to help businesses build and improve digital products and operations." path="/about/"/>
 <PageHero eyebrow="ABOUT KHIDEVS" title={<>A digital partner built for <em style={{fontStyle:'normal',color:'var(--accent)'}}>connected problems.</em></>} lead="KHIDevs brings technology, creative, automation and growth into one agency so businesses can move from idea to launch and beyond with less fragmentation." index="STUDIO / KARACHI + WORLDWIDE"/>
 <section className="section"><div className="shell"><SectionHead index="01" label="THE STUDIO" title="Digital products are rarely only a design problem or only a code problem"/><div className="about-story"><h2 className="reveal">We care about the system around the deliverable.</h2><div className="about-copy reveal"><p>A website connects to a brand. A store connects to marketing. A SaaS product connects to onboarding, support, analytics and operations. Automation connects to the people who need to trust it.</p><p>That is why KHIDevs is positioned as a full-service digital agency rather than a single-discipline development shop.</p><p>Our job is to make the digital system clearer, more useful and easier to grow.</p></div></div></div></section>
 <section className="section section-tint"><div className="shell"><SectionHead index="02" label="HOW WE THINK" title="Practical principles for digital work"/><div className="values-grid">{values.map(v=><article className="value-card reveal" key={v[0]}><span>{v[0]}</span><h3>{v[1]}</h3><p>{v[2]}</p></article>)}</div></div></section>
 <section className="section"><div className="shell tech-split"><div className="reveal"><span className="eyebrow">POSITIONING</span><h2>Build. Design. Automate. Grow.</h2><p>One simple line that describes the full lifecycle: create the product, make it coherent, reduce friction in operations, then help the business reach more people.</p></div><div className="tech-cloud reveal">{['Startups','Entrepreneurs','SMBs','E-commerce brands','Internal teams','Digital products','Organizations','Growing businesses'].map(t=><span key={t}>{t}</span>)}</div></div></section>
</>}
