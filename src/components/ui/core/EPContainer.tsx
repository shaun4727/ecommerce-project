import { ReactNode } from 'react';

interface EPContainerProps {
  children: ReactNode;
  className?: string;
}

const EPContainer = ({ children, className = '' }: EPContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default EPContainer;
