import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ChevronRight, Crown, Shield, TrendingUp } from 'lucide-react';

export default function LandingPage() {
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
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Crystal formation effect
    const crystalGeometry = new THREE.IcosahedronGeometry(1, 0);
    const crystalMaterial = new THREE.MeshPhongMaterial({
      color: 0x28A745,
      transparent: true,
      opacity: 0.8,
      wireframe: true,
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    scene.add(crystal);

    // Add lights
    const light1 = new THREE.PointLight(0x28A745, 2);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00A8E8, 2);
    light2.position.set(-2, -2, -2);
    scene.add(light2);

    // Animation
    gsap.to(crystal.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    const animate = () => {
      requestAnimationFrame(animate);
      crystal.rotation.x += 0.001;
      crystal.rotation.y += 0.002;
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#121212] to-[#0B3D2E]">
      <div ref={containerRef} className="absolute inset-0 -z-10" />
      
      <div className="relative z-10">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="p-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#28A745] text-center">
            Criminal Empire
          </h1>
          <p className="text-xl md:text-2xl text-center mt-4 text-gray-400">
            Build Your Legacy. Rule Your Territory.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/30 p-6 rounded-lg border border-[#28A745]/30"
          >
            <Crown className="w-12 h-12 text-[#28A745] mb-4" />
            <h3 className="text-xl font-bold text-[#28A745] mb-2">Build Empire</h3>
            <p className="text-gray-400">
              Start from scratch and build your criminal empire from the ground up.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/30 p-6 rounded-lg border border-[#28A745]/30"
          >
            <Shield className="w-12 h-12 text-[#28A745] mb-4" />
            <h3 className="text-xl font-bold text-[#28A745] mb-2">Manage Risk</h3>
            <p className="text-gray-400">
              Balance profit with risk, avoid law enforcement, and protect your assets.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/30 p-6 rounded-lg border border-[#28A745]/30"
          >
            <TrendingUp className="w-12 h-12 text-[#28A745] mb-4" />
            <h3 className="text-xl font-bold text-[#28A745] mb-2">Expand Power</h3>
            <p className="text-gray-400">
              Grow your influence, upgrade facilities, and dominate the market.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center py-12"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#28A745] text-black px-8 py-4 rounded-lg text-xl font-bold inline-flex items-center gap-2 hover:bg-[#28A745]/90 transition-colors"
            >
              Enter Dashboard
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
