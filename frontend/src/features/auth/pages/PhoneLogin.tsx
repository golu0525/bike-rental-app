import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { authApi } from '../api/auth.api';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { Phone, Key, Send } from 'lucide-react';

const phoneRegex = /^\+[1-9]\d{1,14}$/;

const PhoneLogin: React.FC = () => {
  const [step, setStep] = useState<'enter-phone' | 'enter-code'>('enter-phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!phoneRegex.test(phone)) {
      setError('Phone number must be in international format starting with +');
      return;
    }
    setLoading(true);
    try {
      await authApi.requestOtp(phone);
      setMessage('OTP sent - please check your messages');
      setStep('enter-code');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const resp = await authApi.verifyOtp(phone, code);
      login(resp.data.token, resp.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 px-3">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login with Phone</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        {step === 'enter-phone' && (
          <Form onSubmit={handleRequest}>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone number</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Phone size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  placeholder="+911234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? 'Sending...' : <>Send OTP <Send size={16} /></>}
            </Button>
          </Form>
        )}

        {step === 'enter-code' && (
          <Form onSubmit={handleVerify}>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Enter OTP</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Key size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </Form>
        )}

        <div className="text-center mt-3">
          <Link to="/login">Use email/password instead</Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
