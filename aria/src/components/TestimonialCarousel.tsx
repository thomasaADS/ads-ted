import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const avatarGradients = [
    'from-pink-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-lime-600',
    'from-orange-500 to-red-600',
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const next = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((current + 1) % testimonials.length);
      setIsAnimating(false);
    }, 150);
  };

  const prev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((current - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 150);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const testimonial = testimonials[current];

  // Default avatar colors
  const avatarColors = ['bg-primary', 'bg-secondary', 'bg-purple', 'bg-coral', 'bg-success'];
  const avatarColor = avatarColors[current % avatarColors.length];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className={`p-8 md:p-12 shadow-hover hover:shadow-strong transition-all duration-300 border-2 border-primary/20 relative overflow-hidden ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-hero opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        
        {/* Rating stars with animation */}
        <div className="flex items-center gap-1 mb-4 relative z-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 transition-all duration-300 ${
                i < testimonial.rating
                  ? 'fill-accent text-accent scale-110 animate-bounce-in'
                  : 'fill-muted text-muted'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          <Badge variant="secondary" className="ml-2">
            {testimonial.rating}/5
          </Badge>
        </div>
        
        {/* Testimonial text */}
        <blockquote className="text-lg md:text-xl text-foreground mb-6 italic relative z-10 leading-relaxed">
          <span className="text-4xl text-primary/30 font-serif">"</span>
          {testimonial.text}
          <span className="text-4xl text-primary/30 font-serif">"</span>
        </blockquote>
        
        {/* Author section with enhanced styling */}
        <div className="flex items-center gap-4 relative z-10">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-lg ring-4 ring-primary/10",
            `bg-gradient-to-br ${avatarGradients[current % avatarGradients.length]}`
          )}>
            <span className="text-white font-bold text-xl">
              {getInitials(testimonial.name)}
            </span>
          </div>
          <div>
            <div className="font-bold text-lg text-foreground">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role}
            </div>
            <Badge variant="outline" className="mt-1">
              {testimonial.company}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          aria-label="Previous testimonial"
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current 
                  ? 'bg-primary w-8' 
                  : 'bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          aria-label="Next testimonial"
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
