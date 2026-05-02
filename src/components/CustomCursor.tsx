'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const hovered  = useRef(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let rafId: number
    let mounted = true

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    const setEnter = () => {
      hovered.current = true
      if (ring) ring.classList.add('hovered')
    }
    const setLeave = () => {
      hovered.current = false
      if (ring) ring.classList.remove('hovered')
    }

    document.addEventListener('mousemove', onMove)
    const interactables = document.querySelectorAll('a, button, [data-hover]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', setEnter)
      el.addEventListener('mouseleave', setLeave)
    })

    const animate = () => {
      if (!mounted) return
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      const s = hovered.current ? 28 : 18
      ring.style.transform = `translate(${rx - s}px, ${ry - s}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      mounted = false
      document.removeEventListener('mousemove', onMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', setEnter)
        el.removeEventListener('mouseleave', setLeave)
      })
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
