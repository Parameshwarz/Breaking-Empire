import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import SplitType from 'split-type';
import AnimatedBackground from '../components/AnimatedBackground';
import LabEquipment from '../components/LabEquipment';
import TerritoryMap from '../components/TerritoryMap';

gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface TierStats {
  risk: number;
  profit: number;
  influence: number;
  security: number;
}

interface EmpireTier {
  level: string;
  symbol: string;
  atomicNumber: string;
  description: string;
  color: string;
  icon: string;
  stats: TierStats;
}

interface QuickAccessCardProps {
  title: string;
  path: string;
  icon: string;
  description: string;
  color: string;
}

interface Partner {
  name: string;
  role: string;
  description: string;
  expertise: string[];
}

const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentTier, setCurrentTier] = useState(0);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [crystalClicked, setCrystalClicked] = useState(false);

  // Mouse trail effect
  const cursorX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  // Add new state for interactive elements
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const [partners] = useState<Partner[]>([
    {
      name: "Gustavo Fring",
      role: "Distribution Network",
      description: "Los Pollos Hermanos proprietor. The face of legitimacy.",
      expertise: ["Business Management", "Distribution", "Risk Mitigation"]
    },
    {
      name: "Mike Ehrmantraut",
      role: "Security Operations",
      description: "Former cop. Problem solver. No half measures.",
      expertise: ["Security", "Logistics", "Crisis Management"]
    },
    {
      name: "Saul Goodman",
      role: "Legal Counsel",
      description: "Criminal lawyer. Better call Saul!",
      expertise: ["Legal Strategy", "Asset Protection", "Crisis Management"]
    }
  ]);

  const famousQuotes = [
    { text: "I am the one who knocks!", author: "Walter White" },
    { text: "Say my name.", author: "Heisenberg" },
    { text: "I am not in danger, I am the danger.", author: "Walter White" },
    { text: "No more half measures.", author: "Mike Ehrmantraut" },
    { text: "Better call Saul!", author: "Saul Goodman" },
    { text: "Los Pollos Hermanos, where something delicious is always cooking.", author: "Gus Fring" }
  ];

  const labEquipment = [
    {
      name: "Crystal Synthesis Station",
      icon: "⚗️",
      purity: 99.1,
      status: "Operational",
      temperature: 185,
      pressure: 1013
    },
    {
      name: "Methylamine Reactor",
      icon: "🧪",
      purity: 98.5,
      status: "Operational",
      temperature: 165,
      pressure: 987
    },
    {
      name: "Vacuum Filtration",
      icon: "🔬",
      purity: 97.8,
      status: "Operational",
      temperature: 145,
      pressure: 956
    }
  ];

  const empireLocations = [
    {
      id: 'superlab',
      name: "Gus's Superlab",
      type: 'production',
      status: 'operational',
      coordinates: { x: 35, y: 45 },
      description: "State-of-the-art underground meth laboratory beneath the industrial laundry. Maximum security, cutting-edge equipment.",
      controlLevel: 95,
      threatLevel: 15,
      stats: {
        revenue: 1000000,
        risk: 25,
        personnel: 12,
        purity: 99.1,
        capacity: 100,
        securityLevel: 95
      },
      associatedCharacters: ['Gustavo Fring', 'Walter White', 'Jesse Pinkman', 'Gale Boetticher'],
      incidents: ['DEA investigation (avoided)', 'Cartel confrontation']
    },
    {
      id: 'pollos',
      name: "Los Pollos Hermanos",
      type: 'front',
      status: 'operational',
      coordinates: { x: 65, y: 35 },
      description: "Popular fast-food chain. Primary distribution front. Known for its signature spice curls.",
      controlLevel: 90,
      threatLevel: 20,
      stats: {
        revenue: 300000,
        risk: 15,
        personnel: 25,
        purity: 0,
        capacity: 80,
        securityLevel: 85
      },
      associatedCharacters: ['Gustavo Fring', 'Lyle'],
      notes: "Regular DEA visits - maintain appearance"
    },
    {
      id: 'car-wash',
      name: "A1A Car Wash",
      type: 'front',
      status: 'operational',
      coordinates: { x: 45, y: 55 },
      description: "Primary money laundering operation. 'Have an A1 day!'",
      controlLevel: 85,
      threatLevel: 10,
      stats: {
        revenue: 150000,
        risk: 10,
        personnel: 8,
        purity: 0,
        capacity: 60,
        securityLevel: 40
      },
      associatedCharacters: ['Walter White', 'Skyler White', 'Bogdan'],
      notes: "Cash intensive business - perfect for laundering"
    }
  ];

  // Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Easter egg messages
  const secretMessages = [
    "You're goddamn right",
    "I am the danger",
    "Yeah, science!",
    "Better call Saul!",
    "Say my name",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Split text animation
    const text = new SplitType('#title-text', { types: 'chars' });
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: '#title-text',
        start: 'top center',
        end: 'bottom center',
      },
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
    });

    // Vertical scroll snap
    const sections = gsap.utils.toArray('.tier-section');
    sections.forEach((section: any, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentTier(i),
        onEnterBack: () => setCurrentTier(i),
      });
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);

      if (newKonami.join(',') === konamiCode.join(',')) {
        setShowSecretMessage(true);
        setEasterEggCount(prev => prev + 1);
        setTimeout(() => setShowSecretMessage(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  const empireTiers = [
    { 
      level: "Street Level",
      symbol: "Na",
      atomicNumber: "11",
      description: "Begin your journey in the streets. Small-scale operations, high risk, low reward.",
      color: "from-blue-600/20 to-blue-900/40",
      icon: "🌆",
      stats: {
        risk: 80,
        profit: 20,
        influence: 10,
        security: 15
      }
    },
    {
      level: "Territory Control",
      symbol: "Fe",
      atomicNumber: "26",
      description: "Expand your influence. Control neighborhoods, establish distribution networks.",
      color: "from-yellow-600/20 to-yellow-900/40",
      icon: "🏢",
      stats: {
        risk: 60,
        profit: 45,
        influence: 35,
        security: 40
      }
    },
    {
      level: "Regional Power",
      symbol: "Au",
      atomicNumber: "79",
      description: "Dominate the region. Multiple operations, sophisticated infrastructure.",
      color: "from-orange-600/20 to-orange-900/40",
      icon: "🌍",
      stats: {
        risk: 45,
        profit: 75,
        influence: 70,
        security: 65
      }
    },
    {
      level: "Heisenberg's Empire",
      symbol: "Hg",
      atomicNumber: "80",
      description: "The pinnacle of power. International reach, unmatched product quality.",
      color: "from-green-600/20 to-green-900/40",
      icon: "👑",
      stats: {
        risk: 30,
        profit: 95,
        influence: 100,
        security: 90
      }
    }
  ];

  const teamMembers = [
    {
      name: 'Gustavo Fring',
      role: 'CEO & Founder',
      image: '/images/gus.jpg',
      description: 'Los Pollos Hermanos proprietor, empire architect.'
    },
    {
      name: 'Mike Ehrmantraut',
      role: 'Head of Security',
      image: '/images/mike.png',
      description: 'Former police officer, security expert.'
    },
    {
      name: 'Saul Goodman',
      role: 'Legal Counsel',
      image: '/images/sual.webp',
      description: 'Criminal lawyer with creative solutions.'
    }
  ];

  const scrollToMap = () => {
    const mapSection = document.getElementById('territory-map');
    mapSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Special date check for Heisenberg's birthday
  const isHeisenbergsBirthday = () => {
    const today = new Date();
    return today.getMonth() === 8 && today.getDate() === 7; // September 7th
  };

  // Updated click handler for crystal icon
  const handleCrystalClick = () => {
    setCrystalClicked(true);
    setTimeout(() => setCrystalClicked(false), 200);
    
    setEasterEggCount(prev => {
      const newCount = prev + 1;
      if (newCount === 99) {
        setShowSecretMessage(true);
        setTimeout(() => setShowSecretMessage(false), 3000);
        return 99;
      }
      if (newCount > 99) {
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedBackground />

      {/* Easter Egg Message Overlay - Moved to top level for better z-index */}
      <AnimatePresence>
        {showSecretMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
          >
            <div className="bg-blue-900/90 text-white px-6 py-3 rounded-lg border border-blue-500">
              <p className="text-xl font-bold">{secretMessages[easterEggCount % secretMessages.length]}</p>
              {easterEggCount === 99 && (
                <p className="text-sm text-blue-300 mt-2">99.1% Pure</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crystal Button with Progress Ring */}
      <div className="fixed bottom-8 right-8 z-[90]">
        <div 
          className="absolute inset-0 bg-green-500/20 rounded-full"
          style={{
            clipPath: `circle(${(easterEggCount / 99) * 100}% at center)`
          }}
        />
        <button
          onClick={handleCrystalClick}
          className={`
            relative text-4xl p-4 
            bg-black/40 backdrop-blur-sm rounded-full
            border border-green-500/30
            transition-all duration-200
            hover:scale-110 hover:border-green-500/50
            ${crystalClicked ? 'scale-95 border-green-500' : ''}
          `}
          title={`Purity: ${easterEggCount}%`}
        >
          💎
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs text-green-500">{easterEggCount}% pure</span>
          </div>
        </button>
      </div>

      {/* Birthday Easter Egg - Increased z-index */}
      {isHeisenbergsBirthday() && (
        <div className="fixed top-4 right-4 animate-pulse z-[90]">
          <span className="text-green-500 text-sm">Happy Birthday, Heisenberg! 🎂</span>
        </div>
      )}

      {/* Mouse trail effect */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none mix-blend-screen z-[80]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black/90 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-20">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-green-500 font-bold text-xl">BE</Link>
              <div className="flex space-x-8">
                <Link to="/dashboard" className="text-gray-400 hover:text-green-500 transition-colors">Dashboard</Link>
                <Link to="/analytics" className="text-gray-400 hover:text-green-500 transition-colors">Analytics</Link>
                <Link to="/operations" className="text-gray-400 hover:text-green-500 transition-colors">Operations</Link>
                <Link to="/risk" className="text-gray-400 hover:text-green-500 transition-colors">Risk Management</Link>
                <button 
                  onClick={scrollToMap}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Territory Map
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section with Interactive Quotes */}
        <section className="h-screen relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/images/breaking-bad-criminal.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <span className="inline-block text-green-500 text-lg font-mono mb-4">INITIALIZING EMPIRE PROTOCOL</span>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="h-px w-12 bg-green-500/50" />
                <span className="text-green-500/70 text-sm">99.1% PURE</span>
                <div className="h-px w-12 bg-green-500/50" />
              </div>
            </div>
            <h1 
              id="title-text"
              className="text-8xl md:text-9xl font-bold mb-6 neon-text crystal-text"
            >
              Breaking Empire
            </h1>
            <motion.div
              className="quote-container cursor-pointer"
              onClick={() => {
                setShowQuote(true);
                setCurrentQuoteIndex((prev) => (prev + 1) % famousQuotes.length);
              }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto mb-4 italic">
                "{famousQuotes[currentQuoteIndex].text}"
              </p>
              <p className="text-green-500 text-lg">- {famousQuotes[currentQuoteIndex].author}</p>
            </motion.div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="relative py-20 bg-black/90">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 to-transparent opacity-5" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Empire Control Center</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Command your operations with precision. Every aspect of your empire at your fingertips.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Empire Dashboard */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 group"
              >
                <Link to="/dashboard" className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/40 to-black border border-green-500/20 p-8">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Empire Dashboard</h3>
                        <p className="text-gray-400 mb-4">Comprehensive overview of your empire's performance, metrics, and growth analytics.</p>
                        <div className="flex gap-4">
                          <span className="text-green-400 text-sm">Real-time Metrics</span>
                          <span className="text-green-400 text-sm">Growth Analytics</span>
                          <span className="text-green-400 text-sm">KPI Tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Analytics Hub */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link to="/analytics" className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 p-6 h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4">
                      <span className="text-xl">📈</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Analytics Hub</h3>
                    <p className="text-gray-400 text-sm">Advanced data analysis and predictive modeling for strategic decisions.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Operations Center */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link to="/operations" className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20 p-6 h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4">
                      <span className="text-xl">🏭</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Operations Center</h3>
                    <p className="text-gray-400 text-sm">Streamlined management of production facilities and distribution networks.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Risk Management System */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 group"
              >
                <Link to="/risk" className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/40 to-black border border-red-500/20 p-8">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Risk Management System</h3>
                        <p className="text-gray-400 mb-4">Advanced threat detection and mitigation system to protect your empire.</p>
                        <div className="flex gap-4">
                          <span className="text-red-400 text-sm">Threat Detection</span>
                          <span className="text-red-400 text-sm">Security Protocols</span>
                          <span className="text-red-400 text-sm">Crisis Management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 to-black border border-gray-700/20 p-6 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">System Status</span>
                      <span className="flex items-center text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                        Operational
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Active Operations</span>
                      <span className="text-white">47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Threat Level</span>
                      <span className="text-yellow-400">Medium</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Territory Overview */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 to-black border border-gray-700/20 p-6 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-transparent opacity-20" />
                  <div className="relative">
                    <h4 className="text-white font-bold mb-2">Territory Control</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Albuquerque</span>
                        <span className="text-green-400">87%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Phoenix</span>
                        <span className="text-yellow-400">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Denver</span>
                        <span className="text-red-400">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* New Laboratory Section */}
        <section className="relative py-20 bg-black/95">
          <div className="absolute inset-0 bg-chemical opacity-5" />
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">The Laboratory</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {labEquipment.map((equipment) => (
                <LabEquipment key={equipment.name} {...equipment} />
              ))}
            </div>
          </div>
        </section>

        {/* Empire Tiers Section with Chemical Theme */}
        <section className="relative py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Empire Evolution</h2>
            <div className="grid gap-8">
              {empireTiers.map((tier, index) => (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="absolute left-0 w-1 h-full bg-green-500/20" />
                  <div className={`
                    relative ml-8 p-8 rounded-r-xl
                    bg-gradient-to-r ${tier.color}
                    border-r border-t border-b border-green-500/20
                  `}>
                    <div className="flex items-start gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg bg-black/50 border border-green-500/30 flex flex-col items-center justify-center">
                          <span className="text-sm text-green-500">{tier.atomicNumber}</span>
                          <span className="text-2xl font-bold text-green-400">{tier.symbol}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{tier.level}</h3>
                        <p className="text-gray-400 mb-4">{tier.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(tier.stats).map(([stat, value]) => (
                            <div key={stat} className="relative">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400 capitalize">{stat}</span>
                                <span className="text-green-400">{value}%</span>
                              </div>
                              <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-green-500"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${value}%` }}
                                  transition={{ duration: 1 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Partners Section */}
        <section className="relative py-20 bg-black/95">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">Strategic Partners</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/80 to-black border border-green-500/20">
                    <div className="p-6 relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700" />
                      <h3 className="text-xl font-bold text-white mb-1">{partner.name}</h3>
                      <p className="text-green-500 text-sm mb-3">{partner.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{partner.description}</p>
                      <div className="space-y-2">
                        {partner.expertise.map((skill, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <span className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                            <span className="text-gray-300">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Territory Map Section */}
        <section id="territory-map" className="relative py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-green-500 mb-8">Territory Map</h2>
            <TerritoryMap />
          </div>
        </section>

        {/* Enhanced System Status Footer - Updated z-index */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-sm border-t border-green-500/20 z-[70]">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span 
                className="chemical-formula cursor-help"
                title="The one who knocks"
                onMouseEnter={() => {
                  if (easterEggCount >= 50) {
                    setShowSecretMessage(true);
                    setTimeout(() => setShowSecretMessage(false), 2000);
                  }
                }}
              >
                C₁₀H₁₅N • CH₃
              </span>
              <div className="h-4 w-px bg-green-500/20" />
              <span className="text-green-400 text-sm">SYSTEM v2.0</span>
              <div className="h-4 w-px bg-green-500/20" />
              <span className="text-gray-400 text-sm">LAB TEMPERATURE: {easterEggCount > 80 ? '99.1' : '185'}°C</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="animate-pulse h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-green-400 text-sm">
                {easterEggCount >= 99 ? 'HEISENBERG MODE ACTIVATED' : 'EMPIRE PROTOCOLS ACTIVE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced QuickAccessCard component
const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, path, icon, description, color }) => {
  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.05}
      transitionSpeed={2000}
    >
      <Link to={path} className="block">
        <motion.div
          whileHover={{ y: -5 }}
          className={`
            relative overflow-hidden rounded-xl p-6
            bg-gradient-to-br ${color}
            border border-green-500/20
            backdrop-blur-sm
            transition-all duration-300
            hover:border-green-500/40
            hover:shadow-lg hover:shadow-green-500/10
          `}
        >
          <motion.span 
            className="text-3xl mb-4 block"
            animate={{ 
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {icon}
          </motion.span>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">{description}</p>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </Link>
    </Tilt>
  );
};

export default LandingPage; 