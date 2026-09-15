import React from 'react'
export default function PageHero({ eyebrow, title, lead, index='KHIDEVS / STUDIO' }) {
  return <section className="sub-hero"><div className="shell"><div className="sub-hero-index reveal">{index}</div><h1 className="reveal">{title}</h1><p className="reveal">{lead}</p></div></section>
}
