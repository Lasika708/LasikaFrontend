import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './config/routes';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import LandingPage from './pages/landing/LandingPage';

// Lazy load admin pages for code splitting (keep LandingPage loaded immediately)
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ProjectsPage = lazy(() => import('./pages/admin/ProjectsPage'));
const ClientsPage = lazy(() => import('./pages/admin/ClientsPage'));
const ContactsPage = lazy(() => import('./pages/admin/ContactsPage'));
const NewsletterPage = lazy(() => import('./pages/admin/NewsletterPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
        {/* Public Routes - Load immediately for faster initial render */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Routes - Lazy loaded for better performance */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="clients"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ClientsPage />
              </Suspense>
            }
          />
          <Route
            path="contacts"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ContactsPage />
              </Suspense>
            }
          />
          <Route
            path="newsletter"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NewsletterPage />
              </Suspense>
            }
          />
          {/* Redirect /admin to /admin/dashboard */}
          <Route path="dashboard" element={<Navigate to={routes.admin.dashboard} replace />} />
        </Route>

        {/* Redirect old admin routes to new structure */}
        <Route path="/admin/dashboard" element={<Navigate to={routes.admin.dashboard} replace />} />
        
        {/* 404 Page */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
