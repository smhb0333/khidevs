import fs from 'node:fs'
import path from 'node:path'

const root=path.resolve(new URL('..',import.meta.url).pathname)
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8')
const fail=(m)=>{throw new Error(m)}
const data=JSON.parse(read('src/data/siteData.json'))
const manifest=JSON.parse(read('public/site.webmanifest'))
const pkg=JSON.parse(read('package.json'))

if(Object.keys(data.services).length!==17) fail('Expected 17 core service pages')
if(data.liveProjects.length!==15) fail('Expected 15 live portfolio projects')
if(new Set(data.liveProjects.map(p=>p.url)).size!==data.liveProjects.length) fail('Duplicate live project URL found')
if(!manifest.start_url || !manifest.scope) fail('PWA start_url/scope missing')
if(!read('src/main.jsx').includes("responsive-v9.css")) fail('Final responsive stylesheet is not imported')
if(!read('vite.config.js').includes("/khidevs/")) fail('GitHub Pages base path missing')
if(!pkg.scripts.build.includes('prerender')) fail('SEO prerender step missing from build')
if(!read('scripts/prerender.mjs').includes('application/ld+json')) fail('Structured data generator missing')
if(!read('public/robots.txt').includes('sitemap.xml')) fail('robots.txt sitemap declaration missing')

console.log('KHIDevs QA passed')
console.log(`Core services: ${Object.keys(data.services).length}`)
console.log(`Live projects: ${data.liveProjects.length}`)
console.log('Responsive layer, PWA paths, sitemap and prerender pipeline detected')
