'use client';

import { FC, useEffect, useState, useRef } from 'react';
import FAQ from './components/FAQ';
import StarryParallax from './components/StarryParallax';

const Home: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [highlightedWord, setHighlightedWord] = useState<'lifespan' | 'healthspan' | null>(null);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const animationFrameRef = useRef<number>();
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastHourAngle = useRef(0);
  const lastMinuteAngle = useRef(0);
  const highlightTimeoutRef = useRef<NodeJS.Timeout>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, glowIntensity: 0 });
  const cellRef = useRef<HTMLDivElement>(null);

  // Word highlight animation
  useEffect(() => {
    const animateHighlight = () => {
      // Sequence: null -> lifespan -> healthspan -> null
      setHighlightedWord(current => {
        if (current === null) return 'lifespan';
        if (current === 'lifespan') return 'healthspan';
        return null;
      });

      // Schedule next animation
      highlightTimeoutRef.current = setTimeout(animateHighlight, 2000); // Change word every 2 seconds
    };

    // Start the animation
    highlightTimeoutRef.current = setTimeout(animateHighlight, 2000);

    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  // Clock animation
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTime.current;
      lastTime.current = now;

      if (!isScrolling.current) {
        // Optimized speeds with smoother transitions
        const minuteDelta = (deltaTime / 1000) * 15; // Slower rotation (was 30)
        const hourDelta = minuteDelta / 12;

        // Batch state updates
        requestAnimationFrame(() => {
          setMinuteAngle(prev => prev + minuteDelta);
          setHourAngle(prev => prev + hourDelta);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Scroll handler
  useEffect(() => {
    let ticking = false;
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      const now = Date.now();
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Throttle scroll updates
      if (!ticking) {
        requestAnimationFrame(() => {
          const progress = (scrolled / documentHeight) * 100;
          const delta = scrolled - lastScrollY.current;
          const timeDelta = now - lastScrollTime;
          
          // Smooth out the rotation speed based on scroll velocity and time
          const scrollFactor = Math.min(Math.abs(delta) / timeDelta * 10, 2);
          const minuteDelta = delta * 0.4 * scrollFactor;
          const hourDelta = minuteDelta / 12;
          
          setMinuteAngle(prev => prev - minuteDelta);
          setHourAngle(prev => prev - hourDelta);
          setScrollProgress(progress);
          
          lastScrollY.current = scrolled;
          lastScrollTime = now;
          ticking = false;
        });
        
        ticking = true;
      }
      
      // Set scrolling state with debounce
      isScrolling.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
      }, 100); // Reduced from 150ms for quicker transition back to regular animation
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Mouse move handler for cell interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cellRef.current) {
        const rect = cellRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 50;
        const y = (e.clientY - rect.top - rect.height / 2) / 50;
        
        // Calculate distance from mouse to nucleus center for glow effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distance = Math.sqrt(
          Math.pow((e.clientX - rect.left - centerX), 2) + 
          Math.pow((e.clientY - rect.top - centerY), 2)
        );
        const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
        const glowIntensity = 1 - Math.min(distance / maxDistance, 1);
        
        setMousePosition({ x, y, glowIntensity });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate visual angles with smooth transitions
  const getVisualAngle = (currentAngle: number, lastAngle: number) => {
    const normalizedCurrent = currentAngle % 360;
    const normalizedLast = lastAngle % 360;
    
    // Calculate the difference between current and last angle
    let diff = normalizedCurrent - normalizedLast;
    
    // Adjust the difference to ensure shortest path
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Update last angle reference
    const newAngle = lastAngle + diff;
    return newAngle;
  };

  // Update visual angles
  const visualHourAngle = getVisualAngle(hourAngle, lastHourAngle.current);
  const visualMinuteAngle = getVisualAngle(minuteAngle, lastMinuteAngle.current);
  lastHourAngle.current = visualHourAngle;
  lastMinuteAngle.current = visualMinuteAngle;

  return (
    <main className="relative bg-black text-white">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-1 h-full z-50 bg-white/5">
        <div 
          className="w-full bg-white/20 transition-all duration-150"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Logo (centered) */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-transparent backdrop-blur-[3px]
                     border-b border-white/[0.05]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center relative">
          <div className="flex items-center">
            <div className="relative" style={{ marginRight: '-0.2em' }}>
              <span className="absolute rotate-90 origin-left text-4xl font-light tracking-wider whitespace-nowrap" style={{ left: '0.1em', bottom: '0.08em' }}>
                0K
              </span>
              <div className="w-6"></div>
            </div>
            <span className="text-4xl font-light">BIO</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <h1 className="text-4xl tracking-tight font-extralight sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl">
                  <span className="block opacity-0 animate-slide-up [animation-delay:300ms]">
                    Evolving Human
                  </span>
                  <span className="block opacity-0 animate-slide-up [animation-delay:600ms]">
                    Longevity
                  </span>
                </h1>
                <p className="mt-6 text-base text-neutral-400 sm:text-lg md:text-xl leading-relaxed font-extralight tracking-wide opacity-0 animate-slide-up [animation-delay:900ms]">
                  Leveraging synthetic biology and machine learning to develop adaptive gene therapies 
                  that enhance both{' '}
                  <span className={`transition-all duration-500 ${highlightedWord === 'lifespan' ? 'text-white font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
                    lifespan
                  </span>{' '}
                  and{' '}
                  <span className={`transition-all duration-500 ${highlightedWord === 'healthspan' ? 'text-white font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
                    healthspan
                  </span>. 
                  We're redefining the boundaries of human potential.
                </p>
                <div className="mt-12 opacity-0 animate-slide-up [animation-delay:1200ms]">
                  <div className="inline-flex items-center space-x-3 text-sm tracking-[0.2em] font-extralight text-neutral-400">
                    <span>SCROLL TO EXPLORE</span>
                    <span className="animate-bounce">↓</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 mt-12 lg:mt-0">
              <div className="relative opacity-0 animate-fade-in [animation-delay:1500ms]">
                <div className="aspect-square relative">
                  {/* Clock-inspired circular design */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border border-white/5 relative">
                      {/* Cardinal dots (12, 3, 6, 9 o'clock) */}
                      <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full top-0 left-1/2 -translate-x-1/2" /> {/* 12 o'clock */}
                      <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full right-0 top-1/2 translate-y-[-50%]" /> {/* 3 o'clock */}
                      <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full bottom-0 left-1/2 -translate-x-1/2" /> {/* 6 o'clock */}
                      <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full left-0 top-1/2 translate-y-[-50%]" /> {/* 9 o'clock */}
                      
                      {/* Clock hands with smoother transitions */}
                      <div 
                        className="absolute w-[1px] h-[40%] bg-white/40 top-[10%] left-1/2 -translate-x-1/2 origin-bottom transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ 
                          transform: `translateX(-50%) rotate(${visualHourAngle}deg)`
                        }}
                      />
                      <div 
                        className="absolute w-[1px] h-[48%] bg-white/60 top-[2%] left-1/2 -translate-x-1/2 origin-bottom transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ 
                          transform: `translateX(-50%) rotate(${visualMinuteAngle}deg)`
                        }}
                      />
                      
                      {/* Center dot */}
                      <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="absolute w-[80%] h-[80%] rounded-full border border-white/10"></div>
                    <div className="absolute w-[60%] h-[60%] rounded-full border border-white/15"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="min-h-screen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center min-h-screen">
            {/* Left side - Cell Animation */}
            <div className="lg:col-span-5 mt-12 lg:mt-0 order-last lg:order-first">
              <div className="relative opacity-0 animate-fade-in [animation-delay:200ms]">
                <div 
                  ref={cellRef}
                  className="aspect-square relative"
                >
                  {/* Organic cell shape */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Cell membrane - asymmetric shape with discrete gradients */}
                    <div className="relative w-[90%] h-[90%]">
                      <div 
                        className="absolute inset-0 rounded-[65%_35%_45%_55%_/_35%_55%_65%_45%] 
                                 before:content-[''] before:absolute before:inset-0 
                                 before:rounded-[inherit]
                                 border border-white/[0.12]
                                 transition-all duration-1000
                                 animate-idle-glow"
                      >
                        {/* Discrete gradient layers */}
                        <div className="absolute inset-[4%] rounded-[60%_40%_50%_50%_/_45%_55%_60%_40%] border border-white/[0.08]" />
                        <div className="absolute inset-[8%] rounded-[55%_45%_40%_60%_/_50%_45%_55%_50%] border border-white/[0.06]" />
                        <div className="absolute inset-[12%] rounded-[45%_55%_55%_45%_/_55%_40%_60%_45%] border border-white/[0.04]" />
                        
                        {/* Enhanced nucleus with stronger presence - centered position */}
                        <div 
                          className="absolute rounded-[40%_60%_55%_45%_/_45%_55%_45%_55%] 
                                   border border-white/[0.15] backdrop-blur-[2px]
                                   transition-all duration-1000 ease-out
                                   animate-nucleus-pulse"
                          style={{
                            inset: '32% 32% 32% 32%', // Centered position
                            background: `
                              radial-gradient(circle at 45% 45%,
                                rgba(255,255,255,${0.06 + mousePosition.glowIntensity * 0.08}) 0%,
                                rgba(255,255,255,${0.04 + mousePosition.glowIntensity * 0.06}) 25%,
                                rgba(255,255,255,${0.02 + mousePosition.glowIntensity * 0.04}) 50%,
                                rgba(255,255,255,${0.01 + mousePosition.glowIntensity * 0.02}) 75%,
                                rgba(255,255,255,0.01) 100%
                              )
                            `,
                            boxShadow: `
                              0 0 ${40 + mousePosition.glowIntensity * 50}px ${mousePosition.glowIntensity * 25}px rgba(255,255,255,${0.03 + Math.pow(mousePosition.glowIntensity, 2) * 0.06}),
                              inset 0 0 ${20 + mousePosition.glowIntensity * 30}px ${mousePosition.glowIntensity * 15}px rgba(255,255,255,${0.02 + Math.pow(mousePosition.glowIntensity, 2) * 0.05})
                            `,
                            transform: `scale(${1 + mousePosition.glowIntensity * 0.04})`,
                            animation: 'nucleus-pulse 3s cubic-bezier(0.45, 0, 0.55, 1) infinite, nucleus-glow 4s cubic-bezier(0.45, 0, 0.55, 1) infinite'
                          }}
                        >
                          {/* Nucleus core with stronger glow - centered */}
                          <div 
                            className="absolute rounded-[45%_55%_50%_50%_/_55%_45%_50%_50%] 
                                     transition-all duration-1000 ease-out"
                            style={{
                              inset: '25% 25% 25% 25%', // Centered core
                              background: `
                                radial-gradient(circle at 45% 45%,
                                  rgba(255,255,255,${0.08 + mousePosition.glowIntensity * 0.12}) 0%,
                                  rgba(255,255,255,${0.05 + mousePosition.glowIntensity * 0.08}) 30%,
                                  rgba(255,255,255,${0.03 + mousePosition.glowIntensity * 0.05}) 60%,
                                  rgba(255,255,255,0.01) 100%
                                )
                              `,
                              opacity: 0.6 + mousePosition.glowIntensity * 0.4,
                              animation: 'core-pulse 3s cubic-bezier(0.45, 0, 0.55, 1) infinite, core-glow 4s cubic-bezier(0.45, 0, 0.55, 1) infinite'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Text Content */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <h2 className="text-4xl tracking-tight font-extralight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl opacity-0 animate-slide-up [animation-delay:400ms]">
                  Evolution is the only approach proven to work
                </h2>
                <p className="mt-6 text-base text-neutral-400 sm:text-lg md:text-xl leading-relaxed font-extralight tracking-wide opacity-0 animate-slide-up [animation-delay:600ms]">
                  Nature has already solved the challenge of biological immortality. 
                  Various organisms demonstrate that aging is not an inevitable process.
                </p>
                <p className="mt-6 text-base text-neutral-400 sm:text-lg md:text-xl leading-relaxed font-extralight tracking-wide opacity-0 animate-slide-up [animation-delay:800ms]">
                  Human aging is not an immutable ceiling—it's a challenge that nature has already overcome. 
                  By understanding these evolutionary successes, we can work towards extending human healthspan and lifespan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Update keyframes for cell animations */}
        <style jsx>{`
          @keyframes idle-glow {
            0%, 100% { opacity: 0.85; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.015); }
          }

          @keyframes nucleus-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.025); }
          }

          @keyframes nucleus-glow {
            0%, 100% { 
              box-shadow: 0 0 40px 10px rgba(255,255,255,0.02),
                         inset 0 0 20px 5px rgba(255,255,255,0.01);
            }
            50% { 
              box-shadow: 0 0 60px 20px rgba(255,255,255,0.06),
                         inset 0 0 30px 10px rgba(255,255,255,0.04);
            }
          }

          @keyframes core-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }

          @keyframes core-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.85; }
          }
        `}</style>
      </section>

      {/* Technology Section */}
      <section className="min-h-screen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center min-h-screen">
            {/* Left side - Text Content */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <h2 className="text-4xl tracking-tight font-extralight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl opacity-0 animate-slide-up [animation-delay:400ms]">
                  Our Technology
                </h2>
                <p className="mt-6 text-base text-neutral-400 sm:text-lg md:text-xl leading-relaxed font-extralight tracking-wide opacity-0 animate-slide-up [animation-delay:600ms]">
                  We leverage advanced machine learning algorithms to decode the complexities of cellular aging, 
                  identifying key pathways and molecular targets that can be modified to enhance longevity.
                </p>
                <p className="mt-6 text-base text-neutral-400 sm:text-lg md:text-xl leading-relaxed font-extralight tracking-wide opacity-0 animate-slide-up [animation-delay:800ms]">
                  Our synthetic biology platform enables precise genetic modifications, 
                  allowing us to implement these insights through targeted interventions 
                  that promote cellular health and resilience.
                </p>
                <div className="mt-12 opacity-0 animate-slide-up [animation-delay:1000ms]">
                  <a href="/technology" className="inline-flex items-center space-x-3 text-sm tracking-[0.2em] font-extralight text-neutral-400 hover:text-white transition-colors group">
                    <span>LEARN MORE ABOUT OUR TECHNOLOGY</span>
                    <span className="text-lg transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Visual Element */}
            <div className="lg:col-span-5 mt-12 lg:mt-0">
              <div className="relative opacity-0 animate-fade-in [animation-delay:200ms]">
                <div className="aspect-square relative">
                  {/* Abstract geometric design with processor/petri dish */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 240 240" className="w-[90%] h-[90%]">
                      {/* Base X lines that don't intersect - adjusted to leave gap */}
                      <path 
                        d="M30 30 L85 85 M155 85 L210 30" 
                        className="stroke-white/10 stroke-[0.5] fill-none"
                      />
                      <path 
                        d="M30 210 L85 155 M155 155 L210 210" 
                        className="stroke-white/10 stroke-[0.5] fill-none"
                      />

                      {/* Central processor with enhanced visibility */}
                      <rect 
                        x="90" y="90" 
                        width="60" height="60" 
                        className="stroke-white/20 stroke-[0.75] fill-none"
                      />
                      <rect 
                        x="100" y="100" 
                        width="40" height="40" 
                        className="stroke-white/20 stroke-[0.75] fill-white/[0.01]"
                      />
                      
                      {/* Processor pins - Left side (evenly spaced and centered) */}
                      <path 
                        d="M90 105 L80 105 M90 115 L80 115 M90 125 L80 125 M90 135 L80 135" 
                        className="stroke-white/20 stroke-[0.75] fill-none"
                      />
                      
                      {/* Processor pins - Right side (evenly spaced and centered) */}
                      <path 
                        d="M150 105 L160 105 M150 115 L160 115 M150 125 L160 125 M150 135 L160 135" 
                        className="stroke-white/20 stroke-[0.75] fill-none"
                      />
                      
                      {/* Processor pins - Top side (evenly spaced and centered) */}
                      <path 
                        d="M105 90 L105 80 M115 90 L115 80 M125 90 L125 80 M135 90 L135 80" 
                        className="stroke-white/20 stroke-[0.75] fill-none"
                      />
                      
                      {/* Processor pins - Bottom side (evenly spaced and centered) */}
                      <path 
                        d="M105 150 L105 160 M115 150 L115 160 M125 150 L125 160 M135 150 L135 160" 
                        className="stroke-white/20 stroke-[0.75] fill-none"
                      />
                      
                      {/* Animated flowing paths */}
                      <path 
                        d="M30 30 L85 85" 
                        className="stroke-white/0 stroke-[0.5] animate-circuit-flow-1"
                        fill="none"
                      />
                      <path 
                        d="M210 30 L155 85" 
                        className="stroke-white/0 stroke-[0.5] animate-circuit-flow-2"
                        fill="none"
                      />
                      <path 
                        d="M30 210 L85 155" 
                        className="stroke-white/0 stroke-[0.5] animate-circuit-flow-3"
                        fill="none"
                      />
                      <path 
                        d="M210 210 L155 155" 
                        className="stroke-white/0 stroke-[0.5] animate-circuit-flow-4"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes circuit-flow-1 {
            0% {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              stroke: rgba(255, 255, 255, 0);
            }
            50% {
              stroke: rgba(255, 255, 255, 0.8);
              filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.6));
            }
            100% {
              stroke-dasharray: 100;
              stroke-dashoffset: -100;
              stroke: rgba(255, 255, 255, 0);
            }
          }
        `}</style>

        {/* Add Tailwind classes for animations */}
        <style global jsx>{`
          .animate-circuit-flow-1 {
            animation: circuit-flow-1 3s ease-in-out infinite;
          }
          .animate-circuit-flow-2 {
            animation: circuit-flow-1 3s ease-in-out infinite;
            animation-delay: 0.75s;
          }
          .animate-circuit-flow-3 {
            animation: circuit-flow-1 3s ease-in-out infinite;
            animation-delay: 1.5s;
          }
          .animate-circuit-flow-4 {
            animation: circuit-flow-1 3s ease-in-out infinite;
            animation-delay: 2.25s;
          }
        `}</style>
      </section>

      {/* Roadmap Section */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-24">
            <h2 className="text-4xl tracking-tight font-extralight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Research Roadmap
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* Timeline items */}
            <div className="space-y-24">
              {[
                {
                  title: "AI & Protein Engineering",
                  description: "Advanced implementation of Evo2 (beamsearch) integrated with AlphaFold3 for protein structure prediction and engineering.",
                  phase: "Phase 1"
                },
                {
                  title: "Simulation & Modeling",
                  description: "Development of simulation frameworks for functional longevity enhancement prediction and microarray automata for continuous monitoring.",
                  phase: "Phase 2"
                },
                {
                  title: "Therapeutic Development",
                  description: "Research into immunosuppressive factors alternatives and evolutionary algorithms for senolytic aptamers.",
                  phase: "Phase 3"
                },
                {
                  title: "Cell Line Research",
                  description: "Investigation of immortal cell lines transferability and differentiation from cancer cells, with focus on maintaining apoptosis control.",
                  phase: "Phase 4"
                },
                {
                  title: "Translation & Validation",
                  description: "Development of in vitro to in vivo translation methods using human-on-a-chip technology, organoids, and mathematical models.",
                  phase: "Phase 5"
                }
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Content box */}
                  <div className={`w-[45%] ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="relative border border-white/[0.08] p-8 
                                  transition-all duration-300 ease-out
                                  hover:border-white/30
                                  hover:bg-white/[0.02]
                                  group">
                      <div className="relative">
                        <div className="text-sm tracking-[0.2em] text-neutral-400 mb-2 
                                      transition-colors duration-300 group-hover:text-neutral-300">{item.phase}</div>
                        <h3 className="text-xl font-light mb-4 
                                     transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                        <p className="text-neutral-400 font-light leading-relaxed 
                                    transition-colors duration-300 group-hover:text-neutral-300">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/20 rounded-full
                                border border-white/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.02); opacity: 0.8; }
          }
          @keyframes pulse-slower {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.04); opacity: 0.9; }
          }
          @keyframes pulse-slowest {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.06); opacity: 1; }
          }
          @keyframes data-flow {
            0% { opacity: 0; transform: rotate(var(--rotation)) translateY(-50%); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: rotate(var(--rotation)) translateY(50%); }
          }
        `}</style>
      </section>

      {/* Meet the Team Button Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            <a 
              href="/team" 
              className="inline-flex items-center justify-center space-x-4 
                       px-12 py-4
                       text-base tracking-[0.2em] font-extralight
                       text-white/80 hover:text-white
                       transition-all duration-500 ease-out
                       rounded-full
                       border border-white/[0.08] hover:border-white/20
                       relative
                       group
                       after:absolute after:inset-0
                       after:rounded-full
                       after:border after:border-white/[0.08]
                       after:scale-[1.05] after:opacity-0
                       hover:after:scale-[1.15] hover:after:opacity-100
                       after:transition-all after:duration-500
                       after:ease-out"
            >
              <span className="relative z-10">MEET THE TEAM</span>
              <span className="relative z-10 text-lg opacity-60 transform transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section with time theme */}
      <section className="min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 gap-16 sm:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="text-5xl font-extralight tabular-nums">10+</div>
              <div className="text-xs text-neutral-400 tracking-[0.2em]">YEARS OF RESEARCH</div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-extralight tabular-nums">5+</div>
              <div className="text-xs text-neutral-400 tracking-[0.2em]">BREAKTHROUGHS</div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-extralight tabular-nums">20+</div>
              <div className="text-xs text-neutral-400 tracking-[0.2em]">SCIENTISTS</div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-extralight tabular-nums">∞</div>
              <div className="text-xs text-neutral-400 tracking-[0.2em]">POTENTIAL</div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Starry background section with centered CTA */}
      <section className="relative h-[70vh] py-32 my-32">
        <div className="absolute inset-0">
          <StarryParallax />
        </div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center space-x-4 
                     px-12 py-4
                     text-base tracking-[0.2em] font-extralight
                     text-white hover:text-white
                     transition-all duration-500 ease-out
                     rounded-full
                     border border-white/10 hover:border-white/20
                     relative
                     group
                     after:absolute after:inset-0
                     after:rounded-full
                     after:border after:border-white/[0.08]
                     after:scale-[1.02] after:opacity-0
                     hover:after:scale-[1.08] hover:after:opacity-100
                     after:transition-all after:duration-500
                     after:ease-out
                     backdrop-filter backdrop-blur-sm
                     bg-black/10
                     hover:bg-black/20"
          >
            <span className="relative z-10">GET IN TOUCH</span>
            <span className="relative z-10 text-lg opacity-60 transform transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <div className="relative" style={{ marginRight: '-0.2em' }}>
                  <span className="absolute rotate-90 origin-left text-xl font-light tracking-wider whitespace-nowrap" style={{ left: '0.1em', bottom: '-0.05em' }}>
                    0K
                  </span>
                  <div className="w-3"></div>
                </div>
                <span className="text-xl font-light">BIO</span>
              </div>
              <p className="mt-4 text-sm text-neutral-400">
                Pioneering the future of human longevity through advanced biotechnology.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light tracking-wider text-neutral-300 mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-light tracking-wider text-neutral-300 mb-4">CONTACT</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@0kbio.com" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    info@0kbio.com
                  </a>
                </li>
                <li>
                  <span className="text-sm text-neutral-400">
                    Paris, France
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="text-xs text-neutral-400 text-center">
              © {new Date().getFullYear()} 0K BIO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
