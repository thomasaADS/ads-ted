import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  type?: 'particles' | 'mesh' | 'shapes' | 'radial';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const AnimatedBackground = ({ 
  type = 'mesh', 
  intensity = 'medium',
  className = '' 
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (type !== 'particles' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type, intensity]);

  if (type === 'particles') {
    return (
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 -z-10 ${className}`}
      />
    );
  }

  if (type === 'mesh') {
    return (
      <div className={`absolute inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,163,0.15),transparent_50%)]" />
      </div>
    );
  }

  if (type === 'shapes') {
    const shapeCount = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8;
    return (
      <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
        {[...Array(shapeCount)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full blur-3xl animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'][i % 3]
              }, transparent)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'radial') {
    return (
      <div className={`absolute inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 radial-glow" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    );
  }

  return null;
};
