import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({ onClick }) {
  return <Link className="brand" to="/" aria-label="KHIDevs home" onClick={onClick}>
    <span className="brand-mark" aria-hidden="true"><i></i><i></i></span>
    <span className="brand-word">KHI<span>DEVS</span></span>
  </Link>
}
