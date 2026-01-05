import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    class10: '',
    class12: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain 1 uppercase letter';
    else if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain 1 number';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter valid 10-digit phone number';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms & conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const userProfile = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      class10: formData.class10,
      class12: formData.class12,
      userType: isStudent ? 'student' : 'admin',
      joined: new Date().toLocaleDateString()
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('isLoggedIn', 'true');

    setSuccess(true);
    setTimeout(() => {
      navigate(isStudent ? '/student-dashboard' : '/admin-dashboard');
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="container" style={{minHeight: '100vh', padding: '2rem 1rem'}}>
      <div className="card" style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '3rem 2.5rem',
        borderRadius: '24px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
          <div style={{
            width: '72px',
            height: '72px',
            background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
            borderRadius: '20px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 15px 35px rgba(13,148,136,0.3)'
          }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" 
              alt="User"
              style={{width: '36px', height: '36px'}}
            />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            color: 'var(--gray-900)',
            marginBottom: '0.5rem',
            fontWeight: 800
          }}>
            Create Account
          </h1>
          <p style={{color: 'var(--gray-600)', fontSize: '1.1rem'}}>
            Join {isStudent ? '12K+ students' : 'professional counselors'} on CareerGuide
          </p>
        </div>

        {/* User Type Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(248,250,252,0.8)',
          border: '2px solid rgba(13,148,136,0.2)',
          borderRadius: '16px',
          padding: '4px',
          marginBottom: '2rem'
        }}>
          <button 
            type="button"
            onClick={() => setIsStudent(true)}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              background: isStudent ? 'var(--teal)' : 'transparent',
              color: isStudent ? 'white' : 'var(--gray-700)',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Student Account
          </button>
          <button 
            type="button"
            onClick={() => setIsStudent(false)}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              background: !isStudent ? 'var(--teal)' : 'transparent',
              color: !isStudent ? 'white' : 'var(--gray-700)',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Admin Account
          </button>
        </div>

        {success && (
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(16,185,129,0.3)'
          }}>
            Account created successfully! Redirecting to your dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group" style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: errors.name ? '2px solid #ef4444' : '2px solid rgba(13,148,136,0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'rgba(255,255,255,0.9)'
              }}
            />
            {errors.name && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group" style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: errors.email ? '2px solid #ef4444' : '2px solid rgba(13,148,136,0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'rgba(255,255,255,0.9)'
              }}
            />
            {errors.email && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group" style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: errors.phone ? '2px solid #ef4444' : '2px solid rgba(13,148,136,0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'rgba(255,255,255,0.9)'
              }}
            />
            {errors.phone && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>{errors.phone}</span>}
          </div>

          {/* Password */}
          <div className="form-group" style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
              Password *
            </label>
            <div style={{position: 'relative'}}>
              <input
                type={showPassword.password ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 1.25rem',
                  border: errors.password ? '2px solid #ef4444' : '2px solid rgba(13,148,136,0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255,255,255,0.9)'
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--gray-500)'
                }}
              >
                {showPassword.password ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group" style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
              Confirm Password *
            </label>
            <div style={{position: 'relative'}}>
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 1.25rem',
                  border: errors.confirmPassword ? '2px solid #ef4444' : '2px solid rgba(13,148,136,0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255,255,255,0.9)'
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--gray-500)'
                }}
              >
                {showPassword.confirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>{errors.confirmPassword}</span>}
          </div>

          {/* Student Fields */}
          {isStudent && (
            <>
              <div className="form-group" style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
                  Class 10th % 
                </label>
                <input
                  type="number"
                  name="class10"
                  value={formData.class10}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="e.g. 85.5"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(13,148,136,0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.9)'
                  }}
                />
              </div>
              <div className="form-group" style={{marginBottom: '2rem'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--gray-900)'}}>
                  Class 12th % 
                </label>
                <input
                  type="number"
                  name="class12"
                  value={formData.class12}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="e.g. 92.3"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(13,148,136,0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.9)'
                  }}
                />
              </div>
            </>
          )}

          {/* Terms & Conditions */}
          <div className="form-group" style={{marginBottom: '2rem'}}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              fontSize: '0.95rem',
              color: 'var(--gray-700)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                style={{
                  marginTop: '0.3rem',
                  width: '18px',
                  height: '18px'
                }}
              />
              <span style={{flex: 1}}>
                I agree to CareerGuide's <Link to="/terms" style={{color: 'var(--teal)', fontWeight: 600}}>Terms of Service</Link> and{' '}
                <Link to="/privacy" style={{color: 'var(--teal)', fontWeight: 600}}>Privacy Policy</Link>
              </span>
            </label>
            {errors.termsAccepted && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>{errors.termsAccepted}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.25rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '16px',
              background: loading ? '#6b7280' : 'linear-gradient(135deg, var(--teal), var(--teal-light))',
              border: 'none',
              boxShadow: '0 15px 35px rgba(13,148,136,0.3)',
              transition: 'all 0.3s ease',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Account...' : `Create ${isStudent ? 'Student' : 'Admin'} Account`}
          </button>
        </form>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <p style={{color: 'var(--gray-600)', margin: 0}}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: 'var(--teal)',
              fontWeight: 700,
              textDecoration: 'none'
            }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
