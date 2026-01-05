import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ✅ CRITICAL: Check if user registered FIRST
    const userProfile = localStorage.getItem('userProfile');
    
    if (userProfile) {
      // ✅ SUCCESS: Set login state IMMEDIATELY
      localStorage.setItem('isLoggedIn', 'true');
      
      setRedirecting(true);
      
      // ✅ IMMEDIATE REDIRECT - NO DELAY NEEDED
      setTimeout(() => {
        console.log('🔄 REDIRECTING TO STUDENT DASHBOARD');
        navigate('/admin-dashboard', { replace: true });
      }, 500); // Very short delay for success message
      
    } else {
      setLoading(false);
      setErrors({ email: 'Please register first!' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  if (redirecting) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        padding: '2rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
          maxWidth: '480px',
          width: '100%'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '20px',
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'spin 1s linear infinite'
          }}>
            ✅
          </div>
          <h2 style={{ color: '#059669', fontSize: '1.8rem', marginBottom: '1rem' }}>
            Login Successful!
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        padding: '3rem 2.5rem',
        borderRadius: '24px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
        background: 'white'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#1f2937',
            marginBottom: '0.5rem',
            fontWeight: 800
          }}>
            Sign In
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Access your career dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontWeight: 600,
              color: '#1f2937'
            }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                background: loading ? '#f9fafb' : 'white'
              }}
            />
            {errors.email && (
              <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontWeight: 600,
              color: '#1f2937'
            }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: errors.password ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                background: loading ? '#f9fafb' : 'white'
              }}
            />
            {errors.password && (
              <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.25rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '16px',
              background: loading 
                ? '#9CA3AF' 
                : 'linear-gradient(135deg, #0D9488, #14B8A6)',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 20px 40px rgba(13,148,136,0.4)'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280', margin: 0 }}>
            No account? <Link to="/register" style={{ color: '#0D9488', fontWeight: 600 }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
