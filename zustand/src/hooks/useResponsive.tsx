import { useState, useEffect } from 'react';

// Custom hook for responsive design
export function useResponsive() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Define breakpoints
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    // Utility functions
    isSmallScreen: isMobile,
    isMediumScreen: isTablet,
    isLargeScreen: isDesktop,
  };
}

// Responsive container component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  const { isMobile, isTablet } = useResponsive();
  
  const containerClass = `
    ${className}
    ${isMobile ? 'mobile-layout' : ''}
    ${isTablet ? 'tablet-layout' : ''}
    responsive-container
  `.trim();

  return (
    <div className={containerClass}>
      {children}
    </div>
  );
}

// Screen size indicator component (useful for development)
export function ScreenSizeIndicator() {
  const { screenSize, isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace',
    }}>
      📱 {screenSize.width} × {screenSize.height}
      <br />
      {isMobile && '📱 Mobile'}
      {isTablet && '📱 Tablet'}
      {isDesktop && '🖥️ Desktop'}
    </div>
  );
}