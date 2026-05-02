'use client'
import dynamic from 'next/dynamic'
import FloatingSectionIndicator from './FloatingSectionIndicator'

const NeuralBackground  = dynamic(() => import('./NeuralBackground'),  { ssr: false })
const CustomCursor      = dynamic(() => import('./CustomCursor'),       { ssr: false })
const FloatingAssistant = dynamic(() => import('./FloatingAssistant'), { ssr: false })

export default function ClientLayer() {
  return (
    <>
      <NeuralBackground />
      <CustomCursor />
      <FloatingAssistant />
      <FloatingSectionIndicator />
    </>
  )
}
