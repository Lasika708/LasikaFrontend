// Centralized route configuration
export const routes = {
  // Public routes
  home: '/',
  services: '/#services',
  projects: '/#projects',
  clients: '/#clients',
  contact: '/#contact',
  about: '/#about',
  
  // Admin routes
  admin: {
    dashboard: '/admin',
    projects: '/admin/projects',
    clients: '/admin/clients',
    contacts: '/admin/contacts',
    newsletter: '/admin/newsletter',
  },
};

// Navigation items for header
export const navItems = [
  { label: 'HOME', path: routes.home, type: 'route' },
  { label: 'SERVICES', path: routes.services, type: 'hash' },
  { label: 'PROJECTS', path: routes.projects, type: 'hash' },
  { label: 'CLIENTS', path: routes.clients, type: 'hash' },
  { label: 'ADMIN', path: routes.admin.dashboard, type: 'route' },
];

// Admin navigation items
export const adminNavItems = [
  { label: 'Dashboard', path: routes.admin.dashboard, icon: '📊' },
  { label: 'Projects', path: routes.admin.projects, icon: '📁' },
  { label: 'Clients', path: routes.admin.clients, icon: '👥' },
  { label: 'Contact Submissions', path: routes.admin.contacts, icon: '📧' },
  { label: 'Newsletter Subscribers', path: routes.admin.newsletter, icon: '📬' },
];

