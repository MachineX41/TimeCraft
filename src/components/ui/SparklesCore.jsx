import { useEffect, useId, useMemo, useRef } from 'react'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

let engineReady = null

function ensureEngine() {
  if (!engineReady) {
    engineReady = loadSlim(tsParticles)
  }
  return engineReady
}

export default function SparklesCore({
  id,
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  className = '',
  particleColor = '#FFFFFF',
  speed = 4,
}) {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  const generatedId = useId().replace(/:/g, '')
  const particleId = id || generatedId

  const options = useMemo(
    () => ({
      background: {
        color: { value: background },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 120,
      particles: {
        color: { value: particleColor },
        move: {
          enable: true,
          direction: 'none',
          random: false,
          straight: false,
          outModes: { default: 'out' },
          speed: { min: 0.1, max: 1 },
        },
        number: {
          density: {
            enable: true,
            width: 400,
            height: 400,
          },
          value: particleDensity,
        },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: {
            enable: true,
            speed,
            sync: false,
          },
        },
        shape: { type: 'circle' },
        size: {
          value: { min: minSize, max: maxSize },
        },
      },
      detectRetina: true,
    }),
    [background, minSize, maxSize, particleDensity, particleColor, speed],
  )

  useEffect(() => {
    let cancelled = false

    ensureEngine()
      .then(() => {
        if (cancelled || !containerRef.current) return undefined
        return tsParticles.load({
          id: particleId,
          element: containerRef.current,
          options,
        })
      })
      .then((instance) => {
        if (cancelled) {
          instance?.destroy()
          return
        }
        instanceRef.current = instance
      })

    return () => {
      cancelled = true
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [particleId, options])

  return (
    <div
      ref={containerRef}
      id={particleId}
      className={className}
      aria-hidden="true"
    />
  )
}
