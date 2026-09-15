import { useEffect } from 'react'

const SITE_URL=(import.meta.env.VITE_SITE_URL || 'https://smhb0333.github.io/khidevs').replace(/\/+$/,'')
const SOCIAL_IMAGE=`${SITE_URL}/assets/img/og-khidevs.png`
const LOGO_IMAGE=`${SITE_URL}/assets/icons/icon-512.png`

const absoluteUrl=(path='/')=>{
  const clean=path.startsWith('/')?path:`/${path}`
  return `${SITE_URL}${clean==='/'?'/':clean}`
}

const ensureMeta=(selector,attrs)=>{
  let el=document.head.querySelector(selector)
  if(!el){
    el=document.createElement('meta')
    Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v))
    document.head.appendChild(el)
  }
  return el
}

const ensureLink=(selector,attrs)=>{
  let el=document.head.querySelector(selector)
  if(!el){
    el=document.createElement('link')
    Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v))
    document.head.appendChild(el)
  }
  return el
}

export default function Meta({ title, description, path='/', service=null, noIndex=false }) {
  useEffect(()=>{
    const canonical=absoluteUrl(path)
    document.title=title

    ensureMeta('meta[name="description"]',{name:'description'}).setAttribute('content',description)
    ensureMeta('meta[name="robots"]',{name:'robots'}).setAttribute('content',noIndex?'noindex,nofollow':'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    ensureMeta('meta[name="googlebot"]',{name:'googlebot'}).setAttribute('content',noIndex?'noindex,nofollow':'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    ensureMeta('meta[name="author"]',{name:'author'}).setAttribute('content','KHIDevs')

    ensureLink('link[rel="canonical"]',{rel:'canonical'}).setAttribute('href',canonical)
    ensureLink('link[rel="alternate"][hreflang="en"]',{rel:'alternate',hreflang:'en'}).setAttribute('href',canonical)
    ensureLink('link[rel="alternate"][hreflang="x-default"]',{rel:'alternate',hreflang:'x-default'}).setAttribute('href',canonical)

    const meta={
      'meta[property="og:title"]':['property','og:title',title],
      'meta[property="og:description"]':['property','og:description',description],
      'meta[property="og:url"]':['property','og:url',canonical],
      'meta[property="og:type"]':['property','og:type','website'],
      'meta[property="og:site_name"]':['property','og:site_name','KHIDevs'],
      'meta[property="og:locale"]':['property','og:locale','en_US'],
      'meta[property="og:image"]':['property','og:image',SOCIAL_IMAGE],
      'meta[property="og:image:type"]':['property','og:image:type','image/png'],
      'meta[property="og:image:width"]':['property','og:image:width','1200'],
      'meta[property="og:image:height"]':['property','og:image:height','630'],
      'meta[property="og:image:alt"]':['property','og:image:alt','KHIDevs — Build. Design. Automate. Grow.'],
      'meta[name="twitter:card"]':['name','twitter:card','summary_large_image'],
      'meta[name="twitter:title"]':['name','twitter:title',title],
      'meta[name="twitter:description"]':['name','twitter:description',description],
      'meta[name="twitter:image"]':['name','twitter:image',SOCIAL_IMAGE],
      'meta[name="twitter:image:alt"]':['name','twitter:image:alt','KHIDevs — Build. Design. Automate. Grow.'],
    }
    Object.entries(meta).forEach(([selector,[attr,name,value]])=>ensureMeta(selector,{[attr]:name}).setAttribute('content',value))

    let schema=document.head.querySelector('#khidevs-schema')
    if(!schema){
      schema=document.createElement('script')
      schema.type='application/ld+json'
      schema.id='khidevs-schema'
      document.head.appendChild(schema)
    }

    const org={
      '@type':'Organization',
      '@id':`${SITE_URL}/#organization`,
      name:'KHIDevs',
      url:`${SITE_URL}/`,
      logo:LOGO_IMAGE,
      email:'hello@khidevs.com',
      description:'Full-service digital agency for technology, creative, automation and growth.',
      slogan:'Build. Design. Automate. Grow.',
      sameAs:['https://github.com/smhb0333'],
      knowsAbout:['Web Development','Shopify','E-commerce','SaaS','Mobile Apps','AI Automation','Branding','UI/UX Design','SEO','Social Media Marketing','Paid Advertising','Business Automation']
    }
    const website={
      '@type':'WebSite',
      '@id':`${SITE_URL}/#website`,
      url:`${SITE_URL}/`,
      name:'KHIDevs',
      publisher:{'@id':org['@id']},
      inLanguage:'en'
    }
    const professionalService={
      '@type':'ProfessionalService',
      '@id':`${SITE_URL}/#agency`,
      name:'KHIDevs',
      url:`${SITE_URL}/`,
      email:'hello@khidevs.com',
      areaServed:'Worldwide',
      parentOrganization:{'@id':org['@id']},
      description:'Full-service digital agency for websites, software, Shopify and e-commerce, AI automation, design, branding and digital marketing.'
    }

    const pageType=path==='/work/'||path==='/services/'?'CollectionPage':path==='/contact/'?'ContactPage':path==='/about/'?'AboutPage':'WebPage'
    const webPage={
      '@type':pageType,
      '@id':`${canonical}#webpage`,
      url:canonical,
      name:title,
      description,
      isPartOf:{'@id':website['@id']},
      about:{'@id':org['@id']},
      inLanguage:'en',
      primaryImageOfPage:{'@type':'ImageObject',url:SOCIAL_IMAGE,width:1200,height:630}
    }
    const graph=[org,website,professionalService,webPage]
    if(service){
      graph.push({
        '@type':'Service',
        '@id':`${canonical}#service`,
        name:service.title,
        url:canonical,
        description,
        provider:{'@id':professionalService['@id']},
        areaServed:'Worldwide',
        serviceType:service.title
      })
      graph.push({
        '@type':'BreadcrumbList',
        itemListElement:[
          {'@type':'ListItem',position:1,name:'Home',item:`${SITE_URL}/`},
          {'@type':'ListItem',position:2,name:'Services',item:`${SITE_URL}/services/`},
          {'@type':'ListItem',position:3,name:service.title,item:canonical}
        ]
      })
    }
    schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph})
  },[title,description,path,service,noIndex])

  return null
}
