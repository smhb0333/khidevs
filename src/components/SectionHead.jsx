import React from 'react'
export default function SectionHead({ index, label, title='' }) {
  return <div className="section-head reveal"><div className="section-index"><span>{index}</span>{label}</div><div className="section-rule"></div>{title ? <p>{title}</p> : null}</div>
}
