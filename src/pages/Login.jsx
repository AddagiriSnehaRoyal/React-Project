import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ CRITICAL: Check login state on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // ✅ FIXED: Check userProfile BEFORE login
    const userProfile = localStorage.getItem('userProfile');
    
    if (userProfile) {
      // ✅ SUCCESS: Set login state IMMEDIATELY
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email); // Store current email
      
      setSuccess(true);
      
      // ✅ IMMEDIATE REDIRECT - 1.5s success screen
      setTimeout(() => {
        console.log('✅ REDIRECTING TO DASHBOARD');
        navigate('/admin-dashboard', { replace: true });
      }, 1500);
      
    } else {
      setLoading(false);
      setErrors({ general: 'Please complete registration first!' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear specific error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        padding: '2rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '4rem 3rem',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
          maxWidth: '500px',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            width: '90px',
            height: '90px',
            background: 'linear-gradient(135deg, #10b981, #34d399)',
            borderRadius: '24px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 20px 40px rgba(16,185,129,0.4)',
            animation: 'bounce 0.6s ease-out'
          }}>
            ✅
          </div>
          <h1 style={{ 
            color: '#059669', 
            fontSize: '2.5rem', 
            marginBottom: '1.5rem',
            fontWeight: 900
          }}>
            Welcome Back!
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.2rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Login successful! Redirecting to your dashboard...
          </p>
          <div style={{
            width: '100%',
            height: '6px',
            background: '#e5e7eb',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '60%',
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              borderRadius: '3px',
              animation: 'progress 1.5s linear forwards'
            }} />
          </div>
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
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        padding: '3.5rem 2.5rem',
        borderRadius: '28px',
        boxShadow: '0 35px 70px rgba(0,0,0,0.12)',
        background: 'white',
        border: '1px solid rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Gradient top bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #0d9488, #10b981, #f59e0b)'
        }} />
        
        <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            color: '#1f2937',
            marginBottom: '0.75rem',
            fontWeight: 900,
            letterSpacing: '-0.02em'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.15rem' }}>
            Sign in to your career dashboard
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.875rem',
              fontWeight: 600,
              color: '#1f2937',
              fontSize: '1rem'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              autoComplete="email"
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '14px',
                fontSize: '1rem',
                background: loading ? '#f9fafb' : 'white',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#ef4444' : '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && (
              <span style={{ 
                color: '#ef4444', 
                fontSize: '0.875rem', 
                marginTop: '0.5rem', 
                display: 'block',
                fontWeight: 500
              }}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.875rem',
              fontWeight: 600,
              color: '#1f2937',
              fontSize: '1rem'
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
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                border: errors.password ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '14px',
                fontSize: '1rem',
                background: loading ? '#f9fafb' : 'white',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? '#ef4444' : '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.password && (
              <span style={{ 
                color: '#ef4444', 
                fontSize: '0.875rem', 
                marginTop: '0.5rem', 
                display: 'block',
                fontWeight: 500
              }}>
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.375rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 700,
              borderRadius: '16px',
              background: loading 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading 
                ? '0 10px 20px rgba(0,0,0,0.1)' 
                : '0 25px 50px rgba(13,148,136,0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {loading ? (
              <>
                <span style={{ opacity: 0.8 }}>Signing you in</span>
                <span style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginLeft: '1rem'
                }} />
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          paddingTop: '2.5rem',
          borderTop: '1px solid #f1f5f9',
          marginTop: '2.5rem'
        }}>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#0d9488', 
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '1.05rem'
              }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.15); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        * { box-sizing: border-box; }
        
        @media (max-width: 480px) {
          div[style*="padding: '3.5rem 2.5rem'"] {
            padding: 2.5rem 1.5rem !important;
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
