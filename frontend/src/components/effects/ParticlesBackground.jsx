import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Fondo 3D inmersivo con partículas flotantes (Three.js).
 * Pensado para el modo oscuro / splash de ÍXA.
 */
export default function ParticlesBackground({ count = 1400, color = 0xc9a227 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      70,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(1)
    mount.appendChild(renderer.domElement)

    // Geometría de partículas
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 160
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      points.rotation.y += 0.0006
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.04
      camera.position.y += (-mouseY * 8 - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    // Pausar el render cuando la pestaña no está visible (ahorra CPU/GPU)
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
      } else {
        animate()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [count, color])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
