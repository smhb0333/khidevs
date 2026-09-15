import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import Icon from '../components/Icon.jsx'
export default function NotFound(){return <><Meta title="Page Not Found — KHIDevs" description="The requested KHIDevs page could not be found." path="/404" noIndex/><section className="shell not-found-shell"><div className="not-found-code">404</div><h1>That route doesn't exist.</h1><p>The page may have moved, or the URL may be incomplete. Head back to the agency overview or explore our capabilities.</p><div className="hero-actions"><Link className="button" to="/">Back home <Icon name="arrow" size={16}/></Link><Link className="text-link" to="/services/">Explore services <Icon name="up" size={15}/></Link></div></section></>}
