import React from 'react';
import type { ArrowDirection } from '../../types/signage';

interface DirectionalArrowProps {
  direction: ArrowDirection;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  variant?: 'orange' | 'white' | 'dark' | 'amber';
  className?: string;
}

export const DirectionalArrow: React.FC<DirectionalArrowProps> = ({
  direction,
  size = 'lg',
  variant = 'orange',
  className = ''
}) => {
  if (direction === 'none') return null;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    giant: 'w-36 h-36'
  }[size];

  const variantClasses = {
    orange: 'text-amber-500 fill-amber-500 drop-shadow-md',
    white: 'text-white fill-white drop-shadow-lg',
    dark: 'text-slate-900 fill-slate-900',
    amber: 'text-yellow-400 fill-yellow-400'
  }[variant];

  // SVG high-contrast directional arrow paths
  const renderArrowSvg = () => {
    switch (direction) {
      case 'straight':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClasses} ${variantClasses} ${className}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="21" x2="12" y2="3" />
            <polyline points="5 10 12 3 19 10" />
          </svg>
        );
      case 'slight_right':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClasses} ${variantClasses} ${className}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        );
      case 'slight_left':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClasses} ${variantClasses} ${className}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="17" y1="17" x2="7" y2="7" />
            <polyline points="17 7 7 7 7 17" />
          </svg>
        );
      case 'right':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClasses} ${variantClasses} ${className}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <polyline points="14 5 21 12 14 19" />
          </svg>
        );
      case 'left':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClasses} ${variantClasses} ${className}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="21" y1="12" x2="3" y2="12" />
            <polyline points="10 19 3 12 10 5" />
          </svg>
        );
      case 'u_turn':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClasses} ${variantClasses} ${className}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 10 4 15 9 20" />
            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return <div className="inline-flex items-center justify-center select-none">{renderArrowSvg()}</div>;
};
