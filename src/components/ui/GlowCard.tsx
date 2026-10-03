import React, { useRef } from 'react';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowRadius?: number;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowRadius,
  style,
  onMouseMove,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
    if (onMouseMove) {
      onMouseMove(e);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 backdrop-blur-xl transition-all duration-300 ${className}`}
      style={{
        ...(glowRadius ? ({ '--glow-radius': `${glowRadius}px` } as React.CSSProperties) : {}),
        ...style,
      }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
