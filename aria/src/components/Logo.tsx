import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

// Main Logo component
export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-xl' },
    md: { icon: 'w-10 h-10', text: 'text-2xl' },
    lg: { icon: 'w-14 h-14', text: 'text-4xl' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Modern Logo Icon - Magic Wand with Sparkles */}
      <div className="relative group">
        {/* Gradient Background Circle */}
        <div className={`${sizes[size].icon} rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 p-2 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 relative overflow-hidden`}>
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white relative z-10"
          >
            {/* Magic wand stick */}
            <path
              d="M3 21L12 12M12 12L21 3M12 12L17 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sparkles */}
            <path
              d="M5 3L6 6L9 7L6 8L5 11L4 8L1 7L4 6L5 3Z"
              fill="currentColor"
              className="animate-pulse"
            />
            <path
              d="M19 14L19.5 15.5L21 16L19.5 16.5L19 18L18.5 16.5L17 16L18.5 15.5L19 14Z"
              fill="currentColor"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            <path
              d="M14 2L14.3 3L15 3.3L14.3 3.6L14 4.5L13.7 3.6L13 3.3L13.7 3L14 2Z"
              fill="currentColor"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
        
        {/* Floating sparkle particles */}
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <Sparkles className="w-full h-full text-yellow-400 animate-ping" />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent leading-none tracking-tight`}>
            AdSync
          </span>
          <span className="text-xs text-gray-500 font-medium tracking-wider">
            AI POWERED
          </span>
        </div>
      )}
    </div>
  );
}

// Default export
export default Logo;

// Alternative minimal version for small spaces
export function LogoIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <div className={`relative group ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"></div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 text-white p-1"
        style={{ width: size, height: size }}
      >
        <path
          d="M3 21L12 12M12 12L21 3M12 12L17 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 3L6 6L9 7L6 8L5 11L4 8L1 7L4 6L5 3Z"
          fill="currentColor"
        />
        <path
          d="M19 14L19.5 15.5L21 16L19.5 16.5L19 18L18.5 16.5L17 16L18.5 15.5L19 14Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

// Animated version for loading states
export function AnimatedLogo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={`${sizes[size]} ${className} relative`}>
      {/* Spinning gradient ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 animate-spin" style={{ animationDuration: '3s' }}>
        <div className="absolute inset-2 rounded-full bg-white"></div>
      </div>
      
      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LogoIcon size={parseInt(sizes[size].split('-')[1]) * 2} />
      </div>
    </div>
  );
}
