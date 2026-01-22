import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [user, setUser] = useState(null); // Simulate login state
  const location = useLocation();

  useEffect(() => {
    // Simulate user login check
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const handleOnlineStatus = () => setOnlineStatus(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/career-test', label: 'Career Test' },
    { path: '/counseling', label: 'Counseling' },
    { path: '/career-paths', label: 'Courses' },
    { path: '/study-tips', label: 'Study Tips' },
  { path: '/admission-process', label: 'Admission Process' },
  { path: '/events', label: 'Academic Events' }
  ];

  const handleLogin = () => {
    // Simulate login
    localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email: 'john@example.com' }));
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo + CareerGuide */}
        <Link to="/" className="logo" style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.8rem'}}>
          <img 
            src="https://png.pngtree.com/png-vector/20250408/ourmid/pngtree-global-education-logo-with-graduation-cap-and-book-png-image_15929049.png" 
            alt="CareerGuide"
            style={{
              width: '40px',
              height: '40px',
            }}
          />
          <span style={{fontWeight: '800', color: 'var(--teal)'}}>CareerGuide</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          {navItems.map(item => (
            <Link 
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                color: 'var(--gray-900)',
                textDecoration: 'none'
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth + Status Section */}
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          {/* Online Status */}
          <div style={{
            padding: '8px 12px',
            background: onlineStatus ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            borderRadius: '20px',
            color: onlineStatus ? '#10b981' : '#ef4444',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            {onlineStatus ? 'Live' : 'Offline'}
          </div>

          {/* User Profile or Auth Buttons */}
          {user ? (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '700'
                }}>
                  {/* {user.name.charAt(0)} */}
                </div>
                <span style={{fontWeight: '500'}}>{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '12px 20px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/register"
                className="btn"
                style={{
                  padding: '10px 20px',
                  fontSize: '0.95rem',
                  background: 'transparent',
                  color: 'var(--teal)',
                  border: '2px solid var(--teal)',
                  fontWeight: '600'
                }}
              >
                Register
              </Link>
              <Link 
                to="/login"
                className="btn"
                style={{
                  padding: '10px 20px',
                  fontSize: '0.95rem',
                  background: 'var(--teal)',
                  color: 'white',
                  fontWeight: '600'
                }}
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="btn" 
          style={{
            padding: '12px 16px',
            fontSize: '0.95rem',
            background: 'var(--teal)',
            color: 'white',
            display: 'none'
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1.5rem 0',
          boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
        }}>
          <nav style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 2rem'}}>
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                style={{
                  padding: '1rem 1rem',
                  borderRadius: '12px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  color: 'var(--gray-900)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            {user ? (
              <>
                <div style={{
                  padding: '1.5rem 1rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '700'
                  }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{fontWeight: '600'}}>{user.name}</div>
                    <div style={{fontSize: '0.85rem', color: 'var(--gray-600)'}}>{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{
                    margin: '0 2rem 1rem',
                    padding: '1rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" style={{
                  margin: '0 2rem 0.5rem',
                  padding: '1rem',
                  background: 'var(--teal)',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '12px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }} onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
                <Link to="/login" style={{
                  margin: '0 2rem 1rem',
                  padding: '1rem',
                  background: 'transparent',
                  color: 'var(--teal)',
                  border: '2px solid var(--teal)',
                  textAlign: 'center',
                  borderRadius: '12px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }} onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
