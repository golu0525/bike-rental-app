import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { authApi } from '../api/auth.api';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // if already logged in, redirect away
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authApi.login(credentials);
      // update auth context/state
      login(response.data.token, response.data.user);
      navigate(response.data.user.role === 'ADMIN' ? '/admin' : '/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">
          Welcome <span className="text-primary">Back</span>
        </h2>
        <p className="text-center text-muted mb-4">Ready to hit the road again?</p>

        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <AlertCircle size={20} className="me-2" />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <Mail size={20} />
              </span>
              <input
                id="email"
                type="email"
                required
                className="form-control"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <Lock size={20} />
              </span>
              <input
                id="password"
                type="password"
                required
                className="form-control"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-3 small text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="fw-bold text-decoration-none">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
