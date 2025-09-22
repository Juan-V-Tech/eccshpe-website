import { useEffect } from 'react';

// Delta-based boundary scroll control to avoid trapping upward scroll
const ScrollControl = () => {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    let lastY = null; // last touch Y position
    const boundaryLeeway = 4; // px leeway at top/bottom

    const handleTouchStart = (e) => {
      lastY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (lastY == null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastY; // positive when finger moving down (page should scroll up)

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      const atTop = scrollTop <= boundaryLeeway;
      const atBottom = scrollTop >= maxScroll - boundaryLeeway;

      // If at top and attempting to scroll further up (deltaY > 0 means pulling down)
      if (atTop && deltaY > 0) {
        e.preventDefault();
        return;
      }
      // If at bottom and attempting to scroll further down (deltaY < 0 means pushing up)
      if (atBottom && deltaY < 0) {
        e.preventDefault();
        return;
      }

      // Otherwise allow normal scroll
      lastY = currentY;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
};

export default ScrollControl;
