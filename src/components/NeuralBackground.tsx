'use client'
import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; pulsePhase: number
}

interface Pulse {
  nodeA: number; nodeB: number; t: number; speed: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let rafId: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const NODE_COUNT = 70
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
    }))

    // Pulses traveling along edges
    const pulses: Pulse[] = Array.from({ length: 12 }, () => ({
      nodeA: Math.floor(Math.random() * NODE_COUNT),
      nodeB: Math.floor(Math.random() * NODE_COUNT),
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.003,
    }))

    const MAX_DIST = 180
    let frame = 0

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw faint grid
      ctx.strokeStyle = 'rgba(0,245,255,0.02)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Update & draw nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        const pulse = 0.8 + 0.2 * Math.sin(frame * 0.02 + n.pulsePhase)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,245,255,${n.opacity * pulse})`
        ctx.shadowColor = '#00f5ff'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,245,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw pulses
      pulses.forEach(p => {
        p.t += p.speed
        if (p.t >= 1) {
          p.t = 0
          p.nodeA = Math.floor(Math.random() * NODE_COUNT)
          p.nodeB = Math.floor(Math.random() * NODE_COUNT)
        }
        const a = nodes[p.nodeA]; const b = nodes[p.nodeB]
        const dx = b.x - a.x; const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > MAX_DIST) return
        const px = a.x + dx * p.t
        const py = a.y + dy * p.t
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#a855f7'
        ctx.shadowColor = '#a855f7'
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
      })

      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
