import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Dashboard } from './pages/Dashboard';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { IdeaDetails } from './pages/IdeaDetails';
import { IdeaQuantification } from './pages/IdeaQuantification';
import { NotFound } from './pages/NotFound';

export default function App() {
  // In a real app, this would come from an auth context
  const isManager = false;
  
  const handleLogout = () => {
    // In a real app, this would clear the auth token and redirect to login
    console.log('Logging out...');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header 
          username="John Doe"
          email="john@xebia.com"
          notificationCount={2}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={isManager ? <ManagerDashboard /> : <Dashboard />} />
          <Route path="/idea/:ideaId" element={<IdeaDetails />} />
          <Route path="/quantify/:ideaId" element={<IdeaQuantification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}