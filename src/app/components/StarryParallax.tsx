import { FC, useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  parallaxSpeed: number;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
  glowSize: number;
}

const StarryParallax: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollOffset = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initStars(); // Reinitialize stars when size changes
    };

    const initStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 6000); // Even higher density

      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.2 + 0.3;
        const glowSize = size * (Math.random() * 2 + 2);
        
        stars.push({
          x,
          y,
          size,
          opacity: Math.random() * 0.5 + 0.3, // Slightly brighter
          parallaxSpeed: Math.random() * 0.4 + 0.1, // More parallax
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * 1.5 + 0.5, // Larger orbits
          centerX: x,
          centerY: y,
          glowSize
        });
      }
      starsRef.current = stars;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
      
      scrollOffset.current = {
        x: distanceFromCenter * 100, // Increased parallax effect
        y: distanceFromCenter * 60
      };
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    let animationFrame: number;
    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        const orbitSpeed = 0.15; // Slightly slower orbit
        const newAngle = star.angle + orbitSpeed * 0.001;
        star.angle = newAngle;
        
        const idleX = star.centerX + Math.cos(newAngle) * star.radius;
        const idleY = star.centerY + Math.sin(newAngle) * star.radius;
        
        const x = idleX + scrollOffset.current.x * star.parallaxSpeed;
        const y = idleY + scrollOffset.current.y * star.parallaxSpeed;

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.glowSize);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, star.glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw star
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
    </div>
  );
};

export default StarryParallax; 