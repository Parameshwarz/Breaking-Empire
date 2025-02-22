import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export function BackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particle systems
    const particleSystems: THREE.Points[] = [];
    const particleGroups = 3;

    for (let i = 0; i < particleGroups; i++) {
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);

      for (let j = 0; j < particleCount * 3; j += 3) {
        positions[j] = (Math.random() - 0.5) * 10;
        positions[j + 1] = (Math.random() - 0.5) * 10;
        positions[j + 2] = (Math.random() - 0.5) * 10;
      }

      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x28A745,
        size: 0.02,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.rotation.x = Math.random() * Math.PI;
      particles.rotation.y = Math.random() * Math.PI;
      scene.add(particles);
      particleSystems.push(particles);

      // Animate particles with GSAP
      gsap.to(particles.rotation, {
        y: particles.rotation.y + Math.PI * 2,
        duration: 10 + i * 5,
        ease: "none",
        repeat: -1
      });
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      particleSystems.forEach((particles, index) => {
        particles.rotation.x += 0.0003 * (index + 1);
        particles.rotation.z += 0.0002 * (index + 1);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 bg-gradient-to-br from-[#121212] to-[#0B3D2E]"
    />
  );
}