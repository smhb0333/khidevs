import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import Solutions from './pages/Solutions.jsx'
import Work from './pages/Work.jsx'
import Technologies from './pages/Technologies.jsx'
import About from './pages/About.jsx'
import Process from './pages/Process.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App(){return <Layout><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/services/" element={<Services/>}/>
  <Route path="/services/:slug/" element={<ServiceDetail/>}/>
  <Route path="/solutions/" element={<Solutions/>}/>
  <Route path="/work/" element={<Work/>}/>
  <Route path="/technologies/" element={<Technologies/>}/>
  <Route path="/about/" element={<About/>}/>
  <Route path="/process/" element={<Process/>}/>
  <Route path="/contact/" element={<Contact/>}/>
  <Route path="/legal/privacy/" element={<Legal type="privacy"/>}/>
  <Route path="/legal/terms/" element={<Legal type="terms"/>}/>
  <Route path="/legal/cookies/" element={<Legal type="cookies"/>}/>
  <Route path="/404" element={<NotFound/>}/>
  <Route path="*" element={<NotFound/>}/>
</Routes></Layout>}
