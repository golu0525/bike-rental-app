import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from '../features/bikes/pages/LandingPage';
import AboutUs from '../features/bikes/pages/AboutUs';
import TestimonialsPage from '../features/bikes/pages/TestimonialsPage';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import UserDashboard from '../features/dashboard/pages/UserDashboard';
import AdminDashboard from '../features/dashboard/pages/AdminDashboard';

export const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/testimonials', element: <TestimonialsPage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <UserDashboard /> },
  { path: '/admin', element: <AdminDashboard /> },
];

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
