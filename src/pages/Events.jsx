import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    document.title = 'Academic Events & Notices';
    
    // Sample data - replace with API call later
    setEvents([
      // Upcoming Events
      {
        id: 1,
        type: 'upcoming',
        title: 'Engineering Entrance Exam 2026',
        date: 'Feb 15, 2026',
        time: '10:00 AM - 1:00 PM',
        venue: 'Main Auditorium',
        description: 'Online + Offline exam for B.Tech admissions'
      },
      {
        id: 2,
        type: 'upcoming',
        title: 'Medical Admission Counseling',
        date: 'Feb 20, 2026',
        time: '2:00 PM - 5:00 PM',
        venue: 'Conference Hall A',
        description: 'NEET counseling and guidance session'
      },
      
      // Past Achievements
      {
        id: 3,
        type: 'past',
        title: 'Freshers Welcome 2025',
        date: 'Aug 20, 2025',
        image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e751?w=400&fit=crop',
        description: 'Annual welcome ceremony for new students'
      },
      {
        id: 4,
        type: 'past',
        title: 'Annual Sports Meet 2025',
        date: 'Mar 10, 2025',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&fit=crop',
        description: 'Inter-department sports championship'
      },

      // Notice Board
      {
        id: 5,
        type: 'notice',
        title: 'Admission Last Date Extended',
        date: 'Jan 25, 2026',
        priority: 'high',
        description: 'Final deadline for UG & PG applications'
      },
      {
        id: 6,
        type: 'notice',
        title: 'Fee Payment Window Open',
        date: 'Jan 20 - Feb 5, 2026',
        priority: 'medium',
        description: 'Semester fee payment through online portal'
      }
    ]);
  }, []);

  const upcomingEvents = events.filter(e => e.type === 'upcoming');
  const pastEvents = events.filter(e => e.type === 'past');
  const notices = events.filter(e => e.type === 'notice');

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#10b981';
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="card" style={{textAlign: 'center', padding: '4rem 2rem', marginBottom: '3rem'}}>
        <h1 style={{fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'var(--teal)', marginBottom: '1rem'}}>
          Academic Events & Notices
        </h1>
        <p style={{fontSize: '1.3rem', color: 'var(--gray-600)', maxWidth: '700px', margin: '0 auto'}}>
          Stay updated with campus events, achievements, and important announcements
        </p>
      </section>

      {/* Tab Navigation */}
      <div className="card" style={{padding: '2rem', marginBottom: '3rem'}}>
        <div style={{
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <button 
            className={`btn ${activeTab === 'upcoming' ? '' : 'btn-secondary'}`} 
            onClick={() => setActiveTab('upcoming')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '12px'
            }}
          >
            Upcoming Events
          </button>
          <button 
            className={`btn ${activeTab === 'past' ? '' : 'btn-secondary'}`} 
            onClick={() => setActiveTab('past')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '12px'
            }}
          >
            Past Achievements
          </button>
          <button 
            className={`btn ${activeTab === 'notice' ? '' : 'btn-secondary'}`} 
            onClick={() => setActiveTab('notice')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '12px'
            }}
          >
            Notice Board
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid" style={{gap: '2rem'}}>
        {activeTab === 'upcoming' && upcomingEvents.map(event => (
          <div key={event.id} className="card" style={{
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem'}}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                📅
              </div>
              <div>
                <h3 style={{fontSize: '1.8rem', color: 'var(--gray-900)', margin: '0 0 0.5rem 0'}}>
                  {event.title}
                </h3>
                <div style={{color: 'var(--gray-600)', fontSize: '1.1rem'}}>
                  📍 {event.venue} | 🕒 {event.time}
                </div>
                <div style={{color: 'var(--gray-500)', marginTop: '1rem'}}>{event.description}</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <Link to="/contact-us" className="btn" style={{flex: 1}}>Register Now</Link>
              <Link to="/admission-process" className="btn btn-secondary" style={{flex: 1}}>Learn More</Link>
            </div>
          </div>
        ))}

        {activeTab === 'past' && pastEvents.map(event => (
          <div key={event.id} className="card" style={{
            padding: '0',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              height: '220px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={event.image} 
                alt={event.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(255,255,255,0.95)',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontWeight: '700',
                color: 'var(--teal)'
              }}>
                🏆 Achievement
              </div>
            </div>
            <div style={{padding: '2rem'}}>
              <h3 style={{fontSize: '1.6rem', marginBottom: '0.5rem'}}>{event.title}</h3>
              <p style={{color: 'var(--gray-600)', marginBottom: '1rem'}}>{event.date}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}

        {activeTab === 'notice' && notices.map(event => (
          <div key={event.id} className="card" style={{
            padding: '2.5rem',
            borderLeft: `6px solid ${getPriorityColor(event.priority)}`,
            background: event.priority === 'high' ? 'rgba(239,68,68,0.05)' : 'rgba(16,185,129,0.05)'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              <div style={{
                width: '50px',
                height: '50px',
                background: getPriorityColor(event.priority),
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '700'
              }}>
                📢
              </div>
              <div>
                <h3 style={{color: 'var(--gray-900)', margin: 0}}>{event.title}</h3>
                <p style={{color: getPriorityColor(event.priority), fontWeight: '600', margin: '0.25rem 0 0 0'}}>
                  {event.date}
                </p>
              </div>
            </div>
            <p style={{color: 'var(--gray-700)', lineHeight: '1.6'}}>{event.description}</p>
          </div>
        ))}
      </div>

      {/* Registration CTA */}
      {activeTab === 'upcoming' && (
        <div style={{textAlign: 'center', marginTop: '4rem'}}>
          <Link to="/contact-us" className="btn" style={{
            padding: '18px 40px',
            fontSize: '1.1rem'
          }}>
            📝 Registration/Contact Form
          </Link>
        </div>
      )}
    </div>
  );
};

export default Events;
