import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdmissionProcess = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ progress: 0, applications: 0 });

  useEffect(() => {
    document.title = 'Admission Process 2026 - CareerGuide';
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ progress: 60, applications: 12450 });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'timeline', label: 'Admission Timeline' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'documents', label: 'Documents'},
    { id: 'fees', label: 'Fee Structure'}
  ];

  const steps = [
    { 
      id: 1, 
      title: 'Online Application', 
      desc: 'Fill detailed form with academic records & course preferences',
      duration: '5-10 mins',
      status: 'completed',
      // icon: '📝',
      color: '#0d9488'
    },
    { 
      id: 2, 
      title: 'Entrance Test', 
      desc: 'CGAT or JEE/NEET/State CET (online/proctored)',
      duration: '90 mins',
      status: 'completed', 
      // icon: '📚',
      color: '#10b981'
    },
    { 
      id: 3, 
      title: 'Document Verification', 
      desc: 'Upload & verify all required documents',
      duration: '2-3 days',
      status: 'completed',
      // icon: '📄',
      color: '#f59e0b'
    },
    { 
      id: 4, 
      title: 'Counseling Session', 
      desc: 'Personalized 1:1 career counseling',
      duration: '30 mins',
      status: 'pending',
      // icon: '💬',
      color: '#0891b2'
    },
    { 
      id: 5, 
      title: 'Fee Payment', 
      desc: 'Secure payment & get admission letter',
      duration: 'Instant',
      status: 'pending',
      // icon: '💳',
      color: '#dc2626'
    }
  ];

  return (
    <div className="container" style={{position: 'relative'}}>
      {/* Hero Section - SAME THEME */}
      <section className="card" style={{
        padding: 'clamp(4rem, 10vw, 7rem) clamp(2rem, 6vw, 4rem)',
        textAlign: 'center',
        marginBottom: 'clamp(3rem, 8vw, 5rem)',
        background: `linear-gradient(135deg, 
          rgba(13,148,136,0.95) 0%, 
          rgba(16,185,129,0.9) 50%,
          rgba(13,148,136,0.85) 100%)`,
        color: 'white',
        borderRadius: 'clamp(20px, 5vw, 36px)',
        position: 'relative',
        transform: `translateY(${Math.min(scrollY * 0.3, 25)}px)`,
        boxShadow: '0 35px 80px rgba(13,148,136,0.4)'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #10b981, #f59e0b, #0d9488)'
        }}/>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          letterSpacing: '-0.02em'
        }}>
          2026 Admissions Open
        </h1>
        <p style={{
          fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
          maxWidth: 'min(95vw, 800px)',
          margin: '0 auto clamp(2rem, 5vw, 3rem)',
          opacity: 0.95,
          lineHeight: 1.6
        }}>
          Complete your journey in 5 simple steps • 12,450+ applications received
        </p>
        <div style={{
          display: 'flex', gap: 'clamp(1rem, 3vw, 1.5rem)',
          justifyContent: 'center', flexWrap: 'wrap'
        }}>
          <Link to="/apply" className="btn" style={{
            padding: 'clamp(1.1rem, 3vw, 1.3rem) clamp(2.5rem, 6vw, 4rem)',
            fontSize: 'clamp(1.05rem, 2.8vw, 1.2rem)',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255,255,255,0.4)',
            color: 'white'
          }}>
            Start Application
          </Link>
          <Link to="/counseling" className="btn" style={{
            padding: 'clamp(1.1rem, 3vw, 1.3rem) clamp(2.5rem, 6vw, 4rem)',
            fontSize: 'clamp(1.05rem, 2.8vw, 1.2rem)',
            background: 'white', color: '#0d9488', fontWeight: 700
          }}>
            Free Counseling
          </Link>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="card" style={{
        padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(2rem, 6vw, 3rem)',
        marginBottom: 'clamp(2rem, 6vw, 4rem)',
        borderRadius: 'clamp(16px, 4vw, 28px)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          display: 'flex', gap: 'clamp(0.75rem, 2vw, 1.25rem)',
          justifyContent: 'center', flexWrap: 'wrap'
        }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: 'clamp(12px, 3vw, 20px) clamp(1.5rem, 4vw, 2.5rem)',
                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                fontWeight: 600,
                borderRadius: 'clamp(20px, 4vw, 50px)',
                background: activeTab === tab.id ? 
                  'linear-gradient(135deg, #0d9488, #10b981)' : 'rgba(13,148,136,0.08)',
                color: activeTab === tab.id ? 'white' : '#0d9488',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(13,148,136,0.2)',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <span style={{fontSize: 'clamp(1.1rem, 3vw, 1.4rem)'}}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'timeline' && (
        <section className="card" style={{padding: 'clamp(3rem, 8vw, 5rem) clamp(2rem, 6vw, 4rem)'}}>
          <div style={{textAlign: 'center', marginBottom: 'clamp(2.5rem, 7vw, 4rem)'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#111827',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              5-Step Admission Process
            </h2>
            <div style={{
              width: '100%', maxWidth: 'min(600px, 90vw)', height: '10px',
              background: '#e5e7eb', borderRadius: '5px', margin: '0 auto 1rem',
              overflow: 'hidden', position: 'relative'
            }}>
              <div style={{
                width: `${stats.progress}%`, height: '100%',
                background: 'linear-gradient(90deg, #0d9488, #10b981)',
                borderRadius: '5px', transition: 'width 1s ease'
              }}/>
            </div>
            <p style={{color: '#6b7280', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)'}}>
              {stats.progress}% Complete • {steps.filter(s => s.status === 'completed').length}/5 Steps
            </p>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vw, 2.5rem)'}}>
            {steps.map((step, i) => (
              <div key={step.id} style={{
                display: 'flex', gap: 'clamp(1.25rem, 4vw, 2rem)',
                padding: 'clamp(2rem, 5vw, 3rem)', alignItems: 'flex-start',
                background: step.status === 'completed' ? 
                  `linear-gradient(135deg, rgba(13,148,136,0.08), rgba(16,185,129,0.04))` : '#f9fafb',
                borderRadius: 'clamp(16px, 4vw, 24px)',
                border: step.status === 'completed' ? '2px solid rgba(13,148,136,0.25)' : '1px solid #e5e7eb',
                position: 'relative', transition: 'all 0.4s ease'
              }}>
                <div style={{
                  position: 'absolute', top: 'clamp(1rem, 3vw, 1.5rem)', right: 'clamp(1.5rem, 4vw, 2rem)',
                  width: 'clamp(14px, 3.5vw, 20px)', height: 'clamp(14px, 3.5vw, 20px)',
                  background: step.status === 'completed' ? '#10b981' : '#d1d5db',
                  borderRadius: '50%', border: '4px solid white',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                }}/>
                
                <div style={{
                  width: 'clamp(65px, 16vw, 85px)', height: 'clamp(65px, 16vw, 85px)',
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}80)`,
                  borderRadius: 'clamp(14px, 3.5vw, 22px)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                  flexShrink: 0, boxShadow: `0 20px 40px ${step.color}30`
                }}>
                  {step.icon}
                </div>
                
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem'}}>
                    <div style={{
                      width: 'clamp(32px, 8vw, 42px)', height: 'clamp(32px, 8vw, 42px)',
                      background: step.status === 'completed' ? '#10b981' : '#d1d5db',
                      color: 'white', borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 700
                    }}>
                      {i + 1}
                    </div>
                    <h3 style={{
                      fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                      color: step.status === 'completed' ? step.color : '#111827',
                      fontWeight: 800, margin: 0
                    }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{
                    color: '#4b5563', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                    lineHeight: 1.7, marginBottom: '1.5rem'
                  }}>
                    {step.desc}
                  </p>
                  <div style={{display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center'}}>
                    <div style={{
                      background: 'rgba(13,148,136,0.12)', color: step.color,
                      padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 1.75rem)',
                      borderRadius: 'clamp(10px, 2.5vw, 25px)', fontWeight: 600,
                      fontSize: 'clamp(0.9rem, 2.2vw, 1rem)'
                    }}>
                      ⏱ {step.duration}
                    </div>
                    <span style={{
                      color: step.status === 'completed' ? '#10b981' : '#9ca3af',
                      fontWeight: 600, fontSize: 'clamp(0.95rem, 2.3vw, 1.05rem)'
                    }}>
                      {step.status === 'completed' ? ' Completed' : ' Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'eligibility' && (
        <section className="grid" style={{gap: 'clamp(2rem, 5vw, 3rem)'}}>
          {[
            { title: 'B.Tech Engineering', criteria: ['10+2 PCM 60%', 'JEE Main/State CET', 'Age 17-25'] },
            { title: 'MBBS/BDS Medical', criteria: ['10+2 PCB 50%', 'NEET UG', 'Medical Fitness'] },
            { title: 'MBA/PGDM', criteria: ['Graduation 50%', 'CAT/MAT/CMAT', 'GD/PI'] },
            { title: 'B.Sc/BA Programs', criteria: ['10+2 50%', 'Institute Test', 'Counseling'] }
          ].map((program, i) => (
            <div key={i} className="card" style={{
              padding: 'clamp(2.5rem, 6vw, 4rem)', borderLeft: `5px solid #f4f8f7`,
              background: 'rgba(13,148,136,0.03)'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', color: '#e4efee',
                marginBottom: 'clamp(1.25rem, 3.5vw, 2rem)', fontWeight: 700
              }}>
                {program.title}
              </h3>
              <ul style={{padding: 0, margin: 0, display: 'grid', gap: '1rem'}}>
                {program.criteria.map((criteria, j) => (
                  <li key={j} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    color: '#c5d2e6', fontSize: 'clamp(1rem, 2.6vw, 1.15rem)'
                  }}>
                    <span style={{color: '#ffffff', fontWeight: 700, marginTop: '0.3rem'}}>•</span>
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Documents & Fees Tabs */}
      {activeTab === 'documents' && (
        <section className="card" style={{padding: 'clamp(3rem, 8vw, 5rem) clamp(2rem, 6vw, 4rem)'}}>
          <h2 style={{
            textAlign: 'center', fontSize: 'clamp(2rem, 6vw, 2.8rem)',
            color: '#111827', marginBottom: 'clamp(2rem, 5vw, 3rem)'
          }}>
            Required Documents
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 95vw), 1fr))',
            gap: 'clamp(1.25rem, 3.5vw, 2rem)'
          }}>
            {[
              '10th & 12th Marksheets', 'Transfer Certificate', 'Character Certificate',
              'Category Certificate', 'Aadhar Card/Passport', '6 Photos', 'Medical Certificate'
            ].map((doc, i) => (
              <div key={i} style={{
                padding: 'clamp(1.5rem, 4vw, 2.25rem) clamp(1.75rem, 4.5vw, 2.5rem)',
                background: 'rgba(13,148,136,0.06)', borderRadius: 'clamp(14px, 3.5vw, 22px)',
                borderLeft: '4px solid #0d9488'
              }}>
                <div style={{
                  color: '#0d9488', fontWeight: 600,
                  fontSize: 'clamp(1rem, 2.6vw, 1.1rem)'
                }}>
                  {doc}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'fees' && (
        <section className="grid" style={{gap: 'clamp(2rem, 5vw, 3rem)'}}>
          {[
            { name: 'B.TECH', semester: '₹1.25L', annual: '₹2.5L', total: '₹10L' },
            { name: 'MBBS', semester: '₹7.5L', annual: '₹15L', total: '₹82.5L' },
            { name: 'MBA', semester: '₹1.6L', annual: '₹3.2L', total: '₹6.4L' },
            { name: 'BSC', semester: '₹30K', annual: '₹60K', total: '₹1.8L' }
          ].map((course, i) => (
            <div key={i} className="card" style={{
              padding: 'clamp(2.5rem, 6vw, 4rem)', textAlign: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 4vw, 1.95rem)', color: '#0d9488',
                marginBottom: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800
              }}>
                {course.name}
              </h3>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: 'clamp(1rem, 3vw, 1.5rem)'
              }}>
                <div><div style={{fontSize: 'clamp(1.5rem, 4.5vw, 2.25rem)', fontWeight: 900, color: '#10b981'}}>{course.semester}</div><div style={{color: '#6b7280', fontSize: '0.9rem'}}>Semester</div></div>
                <div><div style={{fontSize: 'clamp(1.5rem, 4.5vw, 2.25rem)', fontWeight: 900, color: '#f59e0b'}}>{course.annual}</div><div style={{color: '#6b7280', fontSize: '0.9rem'}}>Annual</div></div>
                <div><div style={{fontSize: 'clamp(1.5rem, 4.5vw, 2.25rem)', fontWeight: 900, color: '#111827'}}>{course.total}</div><div style={{color: '#6b7280', fontSize: '0.9rem'}}>Total</div></div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Final CTA - SAME THEME */}
      <section className="card" style={{
        padding: 'clamp(4rem, 10vw, 6rem) clamp(2rem, 6vw, 4rem)',
        margin: 'clamp(4rem, 10vw, 6rem) 0',
        textAlign: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: 'clamp(20px, 5vw, 36px)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(13,148,136,0.15)'
      }}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #0d9488, #10b981, #f59e0b)'}}/>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 6.5vw, 3.5rem)', color: '#111827',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: 900
        }}>
          Ready to Start? 12,450+ Students Already Applied!
        </h2>
        <p style={{
          fontSize: 'clamp(1.15rem, 3.2vw, 1.45rem)', color: '#4b5563',
          marginBottom: 'clamp(2.5rem, 6vw, 4rem)', maxWidth: 'min(95vw, 700px)',
          margin: '0 auto clamp(2.5rem, 6vw, 4rem) auto'
        }}>
          Admissions Open • Limited Seats • Apply Before March 15th
        </p>
        <div style={{
          display: 'flex', gap: 'clamp(1.25rem, 3.5vw, 2rem)',
          justifyContent: 'center', flexWrap: 'wrap'
        }}>
          <Link to="/apply" className="btn" style={{
            padding: 'clamp(1.25rem, 3.5vw, 1.5rem) clamp(3rem, 7vw, 4.5rem)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            background: 'linear-gradient(135deg, #0d9488, #10b981)',
            boxShadow: '0 30px 60px rgba(13,148,136,0.4)', color: 'white'
          }}>
            Apply Now → 
          </Link>
          <Link to="/counseling" className="btn btn-secondary" style={{
            padding: 'clamp(1.25rem, 3.5vw, 1.5rem) clamp(3rem, 7vw, 4.5rem)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            border: '2px solid #0d9488', color: '#0d9488', background: 'transparent'
          }}>
            Talk to Counselor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdmissionProcess;
