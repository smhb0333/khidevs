import React, { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import PageHero from '../components/PageHero.jsx'
import Icon from '../components/Icon.jsx'
import data from '../data/siteData.json'

const EMAIL='hello@khidevs.com'
const initialForm={name:'',company:'',email:'',phone:'',service:'',description:'',budget:'Not sure yet',timeline:'Flexible',current_url:''}

export default function Contact(){
  const [params]=useSearchParams()
  const preselect=params.get('service')||''
  const [form,setForm]=useState(()=>({...initialForm,service:preselect==='not-sure'?"I'm not sure what I need yet":preselect}))
  const [status,setStatus]=useState(null)
  const endpoint=import.meta.env.VITE_CONTACT_ENDPOINT || ''
  const options=useMemo(()=>{
    const core=Object.values(data.services).map(s=>s.title)
    const complete=Object.values(data.serviceCatalog||{}).flat()
    return [...new Set([...core,...complete])].sort((a,b)=>a.localeCompare(b))
  },[])
  const update=e=>setForm(v=>({...v,[e.target.name]:e.target.value}))
  const submit=async e=>{
    e.preventDefault(); setStatus({type:'working',text:'Sending…'})
    if(!form.name.trim()||!form.email.trim()||!form.service||!form.description.trim()){setStatus({type:'error',text:'Please complete the required fields.'});return}
    try{
      if(endpoint){
        const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,source:'khidevs.com'})})
        if(!res.ok) throw new Error('Request failed')
        setStatus({type:'success',text:'Thanks — your project inquiry was sent successfully.'})
        setForm({...initialForm})
      }else{
        const stored=JSON.parse(localStorage.getItem('khidevs-local-inquiries')||'[]')
        stored.push({...form,createdAt:new Date().toISOString()})
        localStorage.setItem('khidevs-local-inquiries',JSON.stringify(stored.slice(-20)))
        setStatus({type:'success',text:'Local test successful — this inquiry was saved in your browser only.'})
      }
    }catch(err){setStatus({type:'error',text:`Could not send the inquiry. Please email ${EMAIL} directly.`})}
  }
  return <>
    <Meta title="Start a Project — KHIDevs" description="Tell KHIDevs what you are trying to build, improve, automate or grow. Start with a business problem, rough idea or complete project brief." path="/contact/"/>
    <PageHero eyebrow="START A PROJECT" title={<>Have an idea?<br/><em style={{fontStyle:'normal',color:'var(--accent)'}}>Let’s build it.</em></>} lead="Website, app, SaaS, AI, automation, branding, marketing—or a problem you are not sure how to solve yet. Tell us where you are starting." index="CONTACT / START HERE"/>
    <section className="section"><div className="shell contact-layout">
      <div className="contact-info reveal"><span className="eyebrow">A GOOD FIRST MESSAGE</span><h2>Tell us the goal, not the jargon.</h2><p>You do not need a technical specification. Share the business objective, who it is for, what exists today, and any budget or timeline constraints you already know.</p><div className="contact-lines"><div><small>Email</small><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div><div><small>Working model</small><span>Project-based / ongoing partnership</span></div><div><small>Location</small><span>Karachi, Pakistan · Serving clients worldwide</span></div></div></div>
      <form className="contact-form reveal" onSubmit={submit} noValidate>
        {status && <div className={`form-status ${status.type==='error'?'error':'success'}`}>{status.text}</div>}
        <div className="form-grid">
          <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" required maxLength="100" autoComplete="name" value={form.name} onChange={update}/></div>
          <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" maxLength="120" autoComplete="organization" value={form.company} onChange={update}/></div>
          <div className="field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" required maxLength="160" autoComplete="email" value={form.email} onChange={update}/></div>
          <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" maxLength="60" autoComplete="tel" value={form.phone} onChange={update}/></div>
          <div className="field full"><label htmlFor="service">What do you need? *</label><select id="service" name="service" required value={form.service} onChange={update}><option value="">Select a starting point</option><option value="I'm not sure what I need yet">I'm not sure what I need yet</option>{options.map(o=><option key={o}>{o}</option>)}</select></div>
          <div className="field full"><label htmlFor="description">Project / business problem *</label><textarea id="description" name="description" required maxLength="5000" placeholder="What are you trying to build, improve, automate or grow?" value={form.description} onChange={update}></textarea></div>
          <div className="field"><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget" value={form.budget} onChange={update}><option>Not sure yet</option><option>Under $1,000</option><option>$1,000 – $3,000</option><option>$3,000 – $10,000</option><option>$10,000 – $25,000</option><option>$25,000+</option></select></div>
          <div className="field"><label htmlFor="timeline">Timeline</label><select id="timeline" name="timeline" value={form.timeline} onChange={update}><option>Flexible</option><option>ASAP</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option></select></div>
          <div className="field full"><label htmlFor="current_url">Current website / app</label><input id="current_url" name="current_url" maxLength="240" placeholder="https:// (if applicable)" value={form.current_url} onChange={update}/></div>
        </div>
        <p className="form-note">By submitting, you agree that KHIDevs may use these details to respond to your project inquiry. See our <Link to="/legal/privacy/" style={{color:'var(--accent)'}}>privacy policy</Link>.</p>
        <button className="button" type="submit">Send project inquiry <Icon name="arrow" size={16}/></button>
        {!endpoint && <p className="local-preview-note"><strong>Local preview mode:</strong> submissions are stored only in this browser so you can test the form offline. Add <code>VITE_CONTACT_ENDPOINT</code> before production to connect your API/form service.</p>}
      </form>
    </div></section>
  </>
}
