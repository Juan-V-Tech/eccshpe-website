import { useEffect } from 'react';

/**
 * Component to control scroll behavior, especially on mobile devices
 * This prevents overscrolling while still allowing normal page scrolling
 */
const ScrollControl = () => {
  useEffect(() => {
    // Function to handle touch move events on mobile
    const handleTouchMove = (e) => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // If we're at the bottom of the page and trying to scroll down more
      if (scrollTop + windowHeight >= documentHeight - 10) {
        // Only prevent default if we're trying to scroll down further
        if (e.touches[0].clientY < e.touches[0].screenY) {
          e.preventDefault();
        }
      }
      
      // If we're at the top of the page and trying to scroll up more
      if (scrollTop <= 10) {
        // Only prevent default if we're trying to scroll up further
        if (e.touches[0].clientY > e.touches[0].screenY) {
          e.preventDefault();
        }
      }
    };

    // Only add the passive touch handler on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    return () => {
      if (isMobile) {
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollControl;
