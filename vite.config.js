import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeBase=(value)=>{
  if(!value) return '/khidevs/'
  const withLeading=value.startsWith('/')?value:`/${value}`
  return withLeading.endsWith('/')?withLeading:`${withLeading}/`
}

export default defineConfig(({ command, mode }) => {
  const env=loadEnv(mode,process.cwd(),'')
  const productionBase=normalizeBase(env.VITE_BASE_PATH || '/khidevs/')
  return {
    // GitHub Pages defaults to /khidevs/. Set VITE_BASE_PATH=/ when moving to a root custom domain.
    base: command === 'build' ? productionBase : '/',
    plugins:[react()],
    server:{port:43127,strictPort:false},
    preview:{port:43127,strictPort:false},
    build:{
      target:'es2020',
      cssCodeSplit:true,
      sourcemap:false,
      reportCompressedSize:true
    }
  }
})
