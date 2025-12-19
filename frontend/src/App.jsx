import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectsPage from './pages/admin/ProjectsPage';
import ClientsPage from './pages/admin/ClientsPage';
import ContactsPage from './pages/admin/ContactsPage';
import NewsletterPage from './pages/admin/NewsletterPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminLayout>
              <ProjectsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <AdminLayout>
              <ClientsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <AdminLayout>
              <ContactsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/newsletter"
          element={
            <AdminLayout>
              <NewsletterPage />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
