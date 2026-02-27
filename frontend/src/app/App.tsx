import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';
import { AppRoutes } from './routes';
import { AuthProvider } from '../shared/hooks/useAuth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
