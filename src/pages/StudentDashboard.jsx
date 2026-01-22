import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    sessionsBooked: 0,
    testsCompleted: 0,
    recommendations: 0,
    progress: 0
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // ✅ SINGLE useEffect - Runs ONCE only
  useEffect(() => {
    document.title = 'Student Dashboard - CareerGuide';
    
    // Load user data
    try {
      const userProfile = localStorage.getItem('studentProfile') || localStorage.getItem('userProfile');
      if (userProfile) {
        const parsedData = JSON.parse(userProfile);
        setUserData(parsedData);
      } else {
        // Demo data if no profile
        const demoData = {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 9876543210',
          stream: 'Science (PCM)',
          board: 'CBSE',
          percentage: '85%',
          careerGoal: 'Software Engineering'
        };
        setUserData(demoData);
        localStorage.setItem('studentProfile', JSON.stringify(demoData));
      }
    } catch (e) {
      console.log('Loading demo profile');
    }

    // Set stats
    setStats({
      sessionsBooked: 3,
      testsCompleted: 2,
      recommendations: 12,
      progress: 65
    });

    setLoading(false);
  }, []);

  const updateProfile = (field, value) => {
    const newData = { ...userData, [field]: value };
    setUserData(newData);
    localStorage.setItem('studentProfile', JSON.stringify(newData));
  };

  const saveProfile = () => {
    localStorage.setItem('studentProfile', JSON.stringify(userData));
    setEditing(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          padding: '3rem 2rem', background: 'white', borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.1)', textAlign: 'center'
        }}>
          <div style={{
            width: '60px', height: '60px', border: '4px solid #e5e7eb',
            borderTop: '4px solid #0d9488', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 2rem'
          }} />
          <h3 style={{ color: '#1f2937', margin: 0 }}>Loading Dashboard</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem'
    }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                background: 'linear-gradient(135deg, #0d9488, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 0.5rem 0',
                fontWeight: 800
              }}>
                Welcome Back, {userData?.name?.split(' ')[0] || 'Student'}!
              </h1>
              <p style={{ color: '#6b7280', margin: 0, fontSize: '1.15rem' }}>
                Your career journey progress: {stats.progress}%
              </p>
            </div>
            <button 
              onClick={() => setEditing(!editing)}
              style={{
                padding: '1rem 2rem',
                background: editing ? '#ef4444' : 'linear-gradient(135deg, #0d9488, #10b981)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {editing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
        </header>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Profile & Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
          }}>
            {/* Profile Card */}
            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.6)'
            }}>
              <h2 style={{ 
                margin: '0 0 2rem 0', 
                color: '#1f2937', 
                fontSize: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem'
              }}>
                 My Profile
              </h2>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name || ''}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    disabled={!editing}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: editing ? '2px solid #0d9488' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      background: editing ? 'white' : '#f9fafb',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData?.email || ''}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      disabled={!editing}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        border: editing ? '2px solid #0d9488' : '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: editing ? 'white' : '#f9fafb'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={userData?.phone || ''}
                      onChange={(e) => updateProfile('phone', e.target.value)}
                      disabled={!editing}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        border: editing ? '2px solid #0d9488' : '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: editing ? 'white' : '#f9fafb'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Stream
                    </label>
                    <input
                      type="text"
                      value={userData?.stream || ''}
                      onChange={(e) => updateProfile('stream', e.target.value)}
                      disabled={!editing}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        border: editing ? '2px solid #0d9488' : '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: editing ? 'white' : '#f9fafb'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
                      12th % 
                    </label>
                    <input
                      type="text"
                      value={userData?.percentage || ''}
                      onChange={(e) => updateProfile('percentage', e.target.value)}
                      disabled={!editing}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        border: editing ? '2px solid #0d9488' : '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: editing ? 'white' : '#f9fafb'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ 
                margin: '0 0 2.5rem 0', 
                color: '#1f2937', 
                fontSize: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem'
              }}>
                 Your Progress
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {[
                  { value: stats.sessionsBooked, label: 'Sessions Booked', color: '#10b981', icon: '💬' },
                  { value: stats.testsCompleted, label: 'Tests Done', color: '#3b82f6', icon: '📝' },
                  { value: stats.recommendations, label: 'Career Matches', color: '#f59e0b', icon: '⭐' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    textAlign: 'center', padding: '2rem 1rem'
                  }}>
                    <div style={{
                      width: '72px', height: '72px',
                      background: `${stat.color}20`,
                      borderRadius: '20px',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 1rem',
                      fontSize: '1.8rem', color: stat.color
                    }}>
                      {stat.icon}
                    </div>
                    <h3 style={{
                      fontSize: '2.5rem', color: stat.color,
                      margin: '0 0 0.5rem 0', fontWeight: 800
                    }}>
                      {stat.value}
                    </h3>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#1f2937', fontWeight: 600 }}>Journey Progress</span>
                  <span style={{ color: '#6b7280' }}>{stats.progress}%</span>
                </div>
                <div style={{
                  height: '12px', background: '#e5e7eb',
                  borderRadius: '6px', overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', width: `${stats.progress}%`,
                    background: 'linear-gradient(90deg, #0d9488, #10b981)',
                    borderRadius: '6px', transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'My Sessions',
                desc: 'View upcoming and past counseling sessions',
                // icon: '💬',
                link: '/my-sessions',
                color: '#10b981'
              },
              {
                title: 'Career Test',
                desc: 'Take our advanced aptitude test',
                // icon: '📝',
                link: '/career-test',
                color: '#3b82f6'
              },
              {
                title: 'Book Session',
                desc: 'Schedule 1:1 counseling with experts',
                // icon: '📅',
                link: '/counseling',
                color: '#f59e0b'
              },
              {
                title: 'My Recommendations',
                desc: 'View personalized career suggestions',
                // icon: '⭐',
                link: '/recommendations',
                color: '#8b5cf6'
              }
            ].map((action, i) => (
              <Link
                key={i}
                to={action.link}
                style={{
                  textDecoration: 'none',
                  background: 'white',
                  padding: '2.5rem 2rem',
                  borderRadius: '24px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  width: '64px', height: '64px',
                  background: `${action.color}20`,
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.75rem',
                  marginBottom: '1.5rem', color: action.color
                }}>
                  {action.icon}
                </div>
                <h3 style={{
                  color: '#1f2937', margin: '0 0 0.75rem 0',
                  fontSize: '1.5rem', fontWeight: 700
                }}>
                  {action.title}
                </h3>
                <p style={{
                  color: '#6b7280', margin: 0,
                  fontSize: '1rem', lineHeight: '1.6'
                }}>
                  {action.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {editing && (
          <div style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            background: 'linear-gradient(135deg, #0d9488, #10b981)',
            color: 'white', padding: '1rem 2rem',
            borderRadius: '50px', fontWeight: 600,
            cursor: 'pointer', boxShadow: '0 20px 40px rgba(13,148,136,0.4)',
            zIndex: 1000
          }}
          onClick={saveProfile}
        >
          💾 Save All Changes
        </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
