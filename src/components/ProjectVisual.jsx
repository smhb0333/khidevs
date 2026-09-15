import React from 'react'
export default function ProjectVisual({ index }) {
  if (index === 0) return <div className="mock-dashboard"><div className="chart-bars">{[35,56,48,73,62,91,78,65,85].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></div>
  if (index === 1) return <div className="commerce-orbit"><i></i><strong>STORE<br/>+</strong></div>
  if (index === 2) return <div className="brand-board"><div>N.</div><div>IDENTITY</div><div>TYPE / COLOR<br/>SYSTEM</div></div>
  return <div className="workflow-art"><span>TRIGGER</span><span>AI / RULES</span><span>REVIEW</span></div>
}
