import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const dist=path.join(root,'dist')
const ssrDir=path.join(root,'.ssr')

function parseDotEnv(text=''){
  const out={}
  for(const line of text.split(/\r?\n/)){
    const trimmed=line.trim()
    if(!trimmed || trimmed.startsWith('#')) continue
    const index=trimmed.indexOf('=')
    if(index<0) continue
    out[trimmed.slice(0,index).trim()]=trimmed.slice(index+1).trim().replace(/^['"]|['"]$/g,'')
  }
  return out
}

let fileEnv={}
try{ fileEnv=parseDotEnv(await fs.readFile(path.join(root,'.env'),'utf8')) }catch{}
const SITE_URL=(process.env.VITE_SITE_URL || fileEnv.VITE_SITE_URL || 'https://smhb0333.github.io/khidevs').replace(/\/+$/,'')
const IMAGE_URL=`${SITE_URL}/assets/img/og-khidevs.png`
const LOGO_URL=`${SITE_URL}/assets/icons/icon-512.png`

const siteData=JSON.parse(await fs.readFile(path.join(root,'src/data/siteData.json'),'utf8'))
const { render }=await import(pathToFileURL(path.join(ssrDir,'entry-server.js')).href)
const baseHtml=await fs.readFile(path.join(dist,'index.html'),'utf8')

const baseRoutes=[
  ['/', 'KHIDevs — Build. Design. Automate. Grow.', 'KHIDevs is a full-service digital agency for websites, Shopify and e-commerce, software, apps, AI automation, branding, design, SEO, social media and business systems.'],
  ['/services/', 'Full-Service Digital Agency Services — KHIDevs', 'Explore KHIDevs services across web and software development, Shopify and e-commerce, design and branding, AI automation, digital marketing, SEO, social media and business systems.'],
  ['/solutions/', 'Digital Business Solutions — KHIDevs', 'Connected KHIDevs solutions for launching products, growing e-commerce, automating operations and modernizing digital businesses.'],
  ['/work/', 'KHIDevs Portfolio — Shopify, Websites, Web Apps & E-commerce', 'Explore KHIDevs live projects including Shopify e-commerce development, responsive websites, web apps, portfolio experiences and custom web builds.'],
  ['/technologies/', 'Technologies & Platforms — KHIDevs', 'KHIDevs works across modern web, mobile, commerce, AI, automation, cloud and growth platforms, choosing technology around project requirements.'],
  ['/about/', 'About KHIDevs — Full-Service Digital Agency', 'KHIDevs combines technology, design, automation and digital growth to help businesses build and improve digital products and operations.'],
  ['/process/', 'Our Process — KHIDevs', 'See the KHIDevs digital product process from discovery and strategy through design, development, launch, marketing, automation and growth.'],
  ['/contact/', 'Start a Project — KHIDevs', 'Tell KHIDevs what you are trying to build, improve, automate or grow. Start with a business problem, rough idea or complete project brief.'],
  ['/legal/privacy/', 'Privacy Policy — KHIDevs', 'KHIDevs privacy policy for website visitors and project inquiries.'],
  ['/legal/terms/', 'Terms of Use — KHIDevs', 'Terms governing the use of the KHIDevs website.'],
  ['/legal/cookies/', 'Cookie Policy — KHIDevs', 'KHIDevs cookie and local storage policy.'],
]

const serviceRoutes=Object.entries(siteData.services).map(([slug,s])=>[
  `/services/${slug}/`,
  `${s.title} — KHIDevs`,
  s.description,
  s,
])
const routes=[...baseRoutes,...serviceRoutes]

const escapeHtml=(value='')=>String(value)
  .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
  .replaceAll('"','&quot;').replaceAll("'",'&#039;')

function schemaFor(route,service,title,description){
  const canonical=`${SITE_URL}${route==='/'?'/':route}`
  const org={
    '@type':'Organization','@id':`${SITE_URL}/#organization`,name:'KHIDevs',url:`${SITE_URL}/`,logo:LOGO_URL,email:'hello@khidevs.com',
    description:'Full-service digital agency for technology, creative, automation and growth.',slogan:'Build. Design. Automate. Grow.',sameAs:['https://github.com/smhb0333'],
    knowsAbout:['Web Development','Shopify','E-commerce','SaaS','Mobile Apps','AI Automation','Branding','UI/UX Design','SEO','Social Media Marketing','Paid Advertising','Business Automation']
  }
  const website={'@type':'WebSite','@id':`${SITE_URL}/#website`,url:`${SITE_URL}/`,name:'KHIDevs',publisher:{'@id':org['@id']},inLanguage:'en'}
  const agency={'@type':'ProfessionalService','@id':`${SITE_URL}/#agency`,name:'KHIDevs',url:`${SITE_URL}/`,email:'hello@khidevs.com',areaServed:'Worldwide',parentOrganization:{'@id':org['@id']}}
  const pageType=route==='/work/'||route==='/services/'?'CollectionPage':route==='/contact/'?'ContactPage':route==='/about/'?'AboutPage':'WebPage'
  const webPage={'@type':pageType,'@id':`${canonical}#webpage`,url:canonical,name:title,description,isPartOf:{'@id':website['@id']},about:{'@id':org['@id']},inLanguage:'en',primaryImageOfPage:{'@type':'ImageObject',url:IMAGE_URL,width:1200,height:630}}
  const graph=[org,website,agency,webPage]
  if(service){
    graph.push({'@type':'Service','@id':`${canonical}#service`,name:service.title,url:canonical,description:service.description,provider:{'@id':agency['@id']},areaServed:'Worldwide',serviceType:service.title})
    graph.push({'@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${SITE_URL}/`},
      {'@type':'ListItem',position:2,name:'Services',item:`${SITE_URL}/services/`},
      {'@type':'ListItem',position:3,name:service.title,item:canonical}
    ]})
  }
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')
}

function withMeta(html,{route,title,description,service}){
  const canonical=`${SITE_URL}${route==='/'?'/':route}`
  let out=html
    .replace(/<title>[\s\S]*?<\/title>/i,`<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i,`<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<div id="root"><\/div>/i,`<div id="root" data-prerender-path="${route}">${render(route)}</div>`)
  const seo=`
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta name="author" content="KHIDevs" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="KHIDevs" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${IMAGE_URL}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="KHIDevs — Build. Design. Automate. Grow." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${IMAGE_URL}" />
    <script type="application/ld+json" id="khidevs-schema">${schemaFor(route,service,title,description)}</script>`
  out=out.replace('</head>',`${seo}\n  </head>`)
  return out
}

for(const [route,title,description,service] of routes){
  const html=withMeta(baseHtml,{route,title,description,service})
  const target=route==='/'?path.join(dist,'index.html'):path.join(dist,route.replace(/^\//,''),'index.html')
  await fs.mkdir(path.dirname(target),{recursive:true})
  await fs.writeFile(target,html)
}

const now=new Date().toISOString().slice(0,10)
const sitemapUrls=routes.map(([route])=>`${SITE_URL}${route==='/'?'/':route}`)
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url,i)=>`  <url>\n    <loc>${escapeHtml(url)}</loc>\n    <lastmod>${now}</lastmod>\n    <priority>${i===0?'1.0':url.includes('/services/')?'0.8':'0.7'}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
await fs.writeFile(path.join(dist,'sitemap.xml'),sitemap)
await fs.writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

// Remove the temporary SSR bundle from the final project after prerendering.
await fs.rm(ssrDir,{recursive:true,force:true})
console.log(`Prerendered ${routes.length} indexable routes for ${SITE_URL}`)
