import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Initial data - NO useEffect needed
  const [stats] = useState({
    totalStudents: 1245,
    pendingRequests: 23,
    totalSessions: 156,
    coursesListed: 45,
    revenueToday: 24500,
    conversionRate: 23.4
  });

  const [recentForms, setRecentForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ONLY ONE useEffect - Runs ONCE
  useEffect(() => {
    // Set title
    document.title = 'Admin Dashboard - CareerGuide';
    
    // Load forms ONCE
    try {
      const savedForms = localStorage.getItem('counselingSubmissions');
      if (savedForms) {
        const parsedForms = JSON.parse(savedForms);
        setRecentForms(parsedForms.slice(0, 5));
      }
    } catch (e) {
      console.log('No forms found');
    }
    
    setLoading(false);
  }, []); // ✅ EMPTY ARRAY = ONE TIME ONLY

  // ✅ Stable hover handlers - NO new functions
  const handleCardHover = (enter) => (e) => {
    if (enter) {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
    }
  };

  const handleActionHover = (color) => (enter) => (e) => {
    if (enter) {
      e.target.style.borderColor = color;
      e.target.style.background = color + '10';
      e.target.style.color = color;
    } else {
      e.target.style.borderColor = '#e5e7eb';
      e.target.style.background = 'transparent';
      e.target.style.color = '#374151';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          padding: '3rem 2rem', background: 'white', borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center'
        }}>
          <div style={{
            width: '56px', height: '56px', border: '3px solid #e5e7eb',
            borderTop: '3px solid #0d9488', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem'
          }} />
          <h3 style={{ color: '#1f2937', margin: '0 0 0.5rem 0' }}>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', padding: '2rem', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
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

      {/* Header */}
      <header style={{
        maxWidth: '1400px', margin: '0 auto 3rem', padding: '2rem 0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: '#1f2937',
              margin: '0 0 0.5rem 0', fontWeight: 800
            }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '1.1rem' }}>
              12,450+ students • 23 pending requests today
            </p>
          </div>
          <Link to="/counseling" style={{
            padding: '1rem 2rem', background: 'linear-gradient(135deg, #0d9488, #10b981)',
            color: 'white', textDecoration: 'none', borderRadius: '12px', fontWeight: 600
          }}>
            + New Session
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Stats - NO INTERACTIVE HOVERS */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem', marginBottom: '3rem'
        }}>
          {[
            { value: stats.totalStudents.toLocaleString(), label: 'Total Students', color: '#10b981' },
            { value: stats.pendingRequests, label: 'Pending Requests', color: '#f59e0b' },
            { value: stats.totalSessions, label: 'Total Sessions', color: '#3b82f6' },
            { value: stats.coursesListed, label: 'Active Courses', color: '#8b5cf6' },
            { value: `₹${stats.revenueToday.toLocaleString()}`, label: 'Today Revenue', color: '#ef4444'},
            { value: `${stats.conversionRate}%`, label: 'Conversion', color: '#06b6d4'}
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white', padding: '2rem', borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', background: `${stat.color}20`,
                  borderRadius: '12px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.25rem', color: stat.color
                }}>
                  {stat.icon}
                </div>
                <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
                  {stat.label}
                </p>
              </div>
              <h2 style={{
                fontSize: '2.5rem', color: stat.color, margin: '0 0 0.25rem 0',
                fontWeight: 800, lineHeight: 1
              }}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Recent Forms Table */}
        <div style={{
          background: 'white', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden', marginBottom: '2rem'
        }}>
          <div style={{ padding: '2.5rem' }}>
            <h3 style={{ 
              margin: '0 0 2rem 0', fontSize: '1.8rem', color: '#1f2937', 
              display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}>
               Recent Requests ({recentForms.length})
            </h3>
            
            {recentForms.length === 0 ? (
              <div style={{ 
                textAlign: 'center', padding: '4rem 2rem', color: '#9ca3af' 
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📭</div>
                <h4 style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>
                  No recent requests
                </h4>
                <p style={{ margin: 0 }}>Forms will appear here when submitted</p>
              </div>
            ) : (
              <div style={{ 
                background: '#f8fafc', borderRadius: '12px', maxHeight: '400px', 
                overflowY: 'auto'
              }}>
                {recentForms.map((form, i) => (
                  <div key={i} style={{
                    padding: '1.75rem 2rem', borderBottom: '1px solid #f1f5f9',
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '1rem', alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>
                        {form.name}
                      </h4>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                        {form.email}
                      </p>
                    </div>
                    <div style={{ fontWeight: 600, color: '#374151' }}>
                      {form.course}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      {form.date}
                    </div>
                    <div style={{
                      padding: '0.375rem 1rem', background: '#fef3c7',
                      color: '#d97706', borderRadius: '20px', fontSize: '0.8rem',
                      fontWeight: 600, width: 'fit-content'
                    }}>
                      PENDING
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
