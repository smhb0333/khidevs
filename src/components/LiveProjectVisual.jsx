import React from 'react'
import Icon from './Icon.jsx'

export default function LiveProjectVisual({project,index=0}){
  const number=String(index+1).padStart(2,'0')
  const initials=project.title.split(/\s+/).map(word=>word[0]).join('').slice(0,3).toUpperCase()
  const isShopify=project.platform==='Shopify'
  const isPortfolio=project.category==='Portfolio'

  return <div className={`live-project-visual live-project-visual-${index%6} ${isShopify?'is-shopify':''} ${isPortfolio?'is-portfolio':''}`} aria-hidden="true">
    <div className="live-project-grid"></div>
    <div className="project-browser">
      <div className="project-browser-bar">
        <div className="project-browser-dots"><i></i><i></i><i></i></div>
        <div className="project-browser-url">{project.url.replace('https://','').replace(/\/$/,'')}</div>
        <span>{number}</span>
      </div>
      {isShopify ? <div className="shopify-preview">
        <div className="shopify-preview-top"><strong>TRENDYZ TECH</strong><div><span>SHOP</span><span>SEARCH</span><span>CART</span></div></div>
        <div className="shopify-preview-badge">SHOPIFY COMMERCE</div>
        <div className="shopify-preview-hero"><div><small>CONSUMER TECHNOLOGY</small><b>Shop smarter.<br/>Discover what’s next.</b><i></i></div><span className="device-orb">TT</span></div>
        <div className="shopify-products"><span></span><span></span><span></span></div>
      </div> : isPortfolio ? <div className="portfolio-preview">
        <div className="portfolio-preview-copy"><small>PORTFOLIO</small><b>Selected work<br/>and capabilities.</b><i></i><i></i></div>
        <div className="portfolio-preview-card"><span>{initials}</span><small>PROFILE / WORK</small></div>
      </div> : <div className="website-preview">
        <div className="website-preview-nav"><strong>{project.title.toUpperCase()}</strong><span></span><span></span><span></span></div>
        <div className="website-preview-hero"><small>{project.role}</small><b>{project.title}</b><p></p><p></p><i></i></div>
        <div className="website-preview-panels"><span></span><span></span><span></span></div>
      </div>}
    </div>
    <div className="live-project-topline"><span>{project.platform || 'LIVE WEB'}</span><span>{project.category}</span></div>
    <div className="live-project-launch"><span>LIVE</span><Icon name="up" size={15}/></div>
  </div>
}
