// Navigation utilities for smooth scrolling and route handling

/**
 * Smooth scroll to an element on the page
 * @param {string} hash - The hash to scroll to (e.g., '#services')
 * @param {number} offset - Offset from top in pixels (default: 80)
 */
export const scrollToSection = (hash, offset = 80) => {
  if (!hash) return;
  
  const elementId = hash.replace('#', '');
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Handle hash navigation - scrolls to section if on home page, otherwise navigates
 * @param {string} hash - The hash to navigate to (e.g., '#services' or '/#services')
 * @param {Function} navigate - React Router navigate function
 */
export const handleHashNavigation = (hash, navigate) => {
  // Extract hash from path if it includes '/#'
  const hashValue = hash.includes('#') ? hash.split('#')[1] : hash.replace('/', '');
  const finalHash = hashValue.startsWith('#') ? hashValue : `#${hashValue}`;
  
  if (window.location.pathname === '/') {
    // Already on home page, just scroll
    setTimeout(() => scrollToSection(finalHash), 100);
  } else {
    // Navigate to home page first, then scroll
    navigate(`/${finalHash}`);
    setTimeout(() => scrollToSection(finalHash), 500);
  }
};

/**
 * Check if current route matches a path
 * @param {string} path - Path to check
 * @param {string} currentPath - Current pathname
 * @returns {boolean}
 */
export const isActiveRoute = (path, currentPath) => {
  if (path.startsWith('#')) return false;
  return currentPath === path;
};

