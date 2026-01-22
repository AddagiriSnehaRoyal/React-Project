import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourses = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setCourses([
        { 
          id: 1, 
          name: 'B.Tech Computer Science', 
          duration: '4 years', 
          rating: 4.8,
          salary: '₹12-25LPA',
          fee: '₹4-12L',
          image: 'https://cdni.iconscout.com/illustration/premium/thumb/online-science-class-illustration-svg-download-png-10851608.png'
        },
        { 
          id: 2, 
          name: 'MBA Marketing', 
          duration: '2 years', 
          rating: 4.6,
          salary: '₹8-18LPA',
          fee: '₹10-25L',
          image: 'https://cdni.iconscout.com/illustration/premium/thumb/business-partner-illustration-svg-download-png-4778112.png'
        },
        { 
          id: 3, 
          name: 'B.Sc Data Science', 
          duration: '3 years', 
          rating: 4.9,
          salary: '₹15-30LPA',
          fee: '₹3-8L',
          image: 'https://static.vecteezy.com/system/resources/thumbnails/000/146/161/small/free-data-science-vector-illustrations.jpg'
        },
        { 
          id: 4, 
          name: 'BA Psychology', 
          duration: '3 years', 
          rating: 4.7,
          salary: '₹6-15LPA',
          fee: '₹2-6L',
          image: 'https://img.freepik.com/premium-vector/brain-with-connecting-lines-icons-representing-innovation-strategy-success_657438-51684.jpg?w=3600'
        }
      ]);
      setLoading(false);
    };

    fetchCourses();
    document.title = 'CareerGuide - Home';

    const handleOnlineStatus = () => setOnlineStatus(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          Loading your career options...
        </div>
      </div>
    );
  }

  const statsData = [
    { value: '25K+', label: 'Students Trained', color: '#0d9488' },
    { value: '95%', label: 'Placement Rate', color: '#10b981' },
    { value: '15K+', label: 'Global Alumni', color: '#f59e0b' },
    { value: '220+', label: 'Expert Faculty', color: '#0891b2' },
    { value: '52+', label: 'Programs Offered', color: '#dc2626' }
  ];

  const tabs = [
    { id: 'overview', label: 'Institution' },
    { id: 'campus', label: 'Campus' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'vision', label: 'Vision 2030' }
  ];

  const content = {
    overview: (
      <div className="grid" style={{gap: '3rem'}}>
        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {statsData.map((stat, i) => (
            <div key={i} style={{textAlign: 'center'}}>
              <div style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 900,
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{fontSize: '0.95rem', color: '#6b7280', fontWeight: 500}}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="card" style={{padding: '3rem'}}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h3 style={{fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#111827', marginBottom: '1rem'}}>
              Our Mission
            </h3>
            <p style={{fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto'}}>
              Transforming lives through education that bridges academia and industry, creating leaders 
              who shape the future with innovation and integrity.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            background: 'rgba(13,148,136,0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(13,148,136,0.2)'
          }}>
            <div style={{fontWeight: 600, color: '#0d9488'}}>Innovation-Driven Learning</div>
            <div style={{fontWeight: 600, color: '#10b981'}}>95% Industry Placement</div>
            <div style={{fontWeight: 600, color: '#f59e0b'}}>Global Alumni Network</div>
          </div>
        </div>
      </div>
    ),

    campus: (
      <div className="grid" style={{gap: '2.5rem'}}>
        <div className="card" style={{padding: '3rem', textAlign: 'center'}}>
          <h3 style={{fontSize: '2rem', color: '#0d9488', marginBottom: '1rem'}}>
            50+ Acres World-Class Campus
          </h3>
          <p style={{fontSize: '1.2rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto 2rem'}}>
            State-of-the-art infrastructure designed for holistic student development
          </p>
        </div>
        {[
          {
            title: 'Advanced Research Labs',
            desc: 'AI/ML, Robotics, Biotech, Cybersecurity labs with ₹10Cr industry-grade equipment',
            stats: ['50+ Labs', '24/7 Access']
          },
          {
            title: 'Digital Library',
            desc: '2 Lakh+ Books, 10K+ Journals, Global Research Databases',
            stats: ['24/7 Digital Access', 'Global Journals']
          },
          {
            title: 'Sports Academy',
            desc: 'Olympic-size Swimming, International Cricket Ground, 10+ Indoor Courts',
            stats: ['50 Acres Sports', 'Pro Coaching']
          },
          {
            title: 'Cultural Complex',
            desc: '1000-Seat Auditorium, Open Air Theatre, Media Production Studio',
            stats: ['1000+ Capacity', 'Pro Recording']
          }
        ].map((facility, i) => (
          <div key={i} className="card" style={{padding: '2.5rem'}}>
            <h4 style={{fontSize: '1.4rem', color: '#111827', marginBottom: '1rem'}}>
              {facility.title}
            </h4>
            <p style={{color: '#4b5563', lineHeight: '1.7', marginBottom: '1.5rem'}}>
              {facility.desc}
            </p>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              {facility.stats.map((s, j) => (
                <div key={j} style={{
                  background: 'rgba(13,148,136,0.1)',
                  color: '#0d9488',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),

    leadership: (
      <div className="grid" style={{gap: '3rem'}}>
        <div className="card" style={{padding: '3rem', textAlign: 'center'}}>
          <h3 style={{fontSize: '2.2rem', color: '#0d9488', marginBottom: '1rem'}}>
            Visionary Leadership
          </h3>
          <p style={{fontSize: '1.2rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto'}}>
            Guided by industry pioneers with decades of global experience
          </p>
        </div>
        {[
          {
            name: 'Dr. Rajesh Kumar, PhD',
            role: 'Founder & Chancellor',
            exp: 'Google, Microsoft | 35+ Years',
            color: '#0d9488'
          },
          {
            name: 'Dr. Priya Sharma, MD',
            role: 'Pro-Vice Chancellor',
            exp: 'AIIMS, Harvard | 28+ Years',
            color: '#10b981'
          },
          {
            name: 'Prof. Anil Gupta',
            role: 'Dean Academics',
            exp: 'IIT Delhi, NASA | 25+ Years',
            color: '#0891b2'
          }
        ].map((leader, i) => (
          <div key={i} className="card" style={{padding: '2.5rem'}}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: `linear-gradient(135deg, ${leader.color}, ${leader.color}80)`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                VP
              </div>
              <div style={{flex: 1}}>
                <h4 style={{fontSize: '1.3rem', color: '#111827', marginBottom: '0.5rem'}}>
                  {leader.name}
                </h4>
                <div style={{
                  background: `linear-gradient(135deg, ${leader.color}, ${leader.color}80)`,
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  {leader.role}
                </div>
                <p style={{color: '#4b5563'}}>
                  {leader.exp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),

    achievements: (
      <div className="grid" style={{gap: '2.5rem'}}>
        <div className="card" style={{padding: '3rem', textAlign: 'center'}}>
          <h3 style={{fontSize: '2.5rem', color: '#0d9488', marginBottom: '1rem'}}>
            Our Proud Achievements
          </h3>
        </div>
        {[
          {
            title: 'NIRF #1 Engineering',
            subtitle: 'National Rankings 2025',
            gradient: '135deg, #10b981, rgba(16,185,129,0.4)'
          },
          {
            title: '98.7% Placement Record',
            subtitle: 'Highest Package ₹52 LPA',
            gradient: '135deg, #f59e0b, rgba(245,158,11,0.4)'
          },
          {
            title: '15K+ Global Alumni',
            subtitle: 'Fortune 500 Leaders',
            gradient: '135deg, #0d9488, rgba(13,148,136,0.3)'
          },
          {
            title: '50+ Industry Partners',
            subtitle: 'Google, Microsoft, TCS',
            gradient: '135deg, #0891b2, rgba(8,145,178,0.4)'
          }
        ].map((achievement, i) => (
          <div key={i} className="card" style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            background: `linear-gradient(${achievement.gradient})`,
            color: 'white',
            borderRadius: '24px'
          }}>
            <h4 style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              marginBottom: '0.5rem'
            }}>
              {achievement.title}
            </h4>
            <p style={{fontSize: '1.1rem', opacity: 0.95}}>
              {achievement.subtitle}
            </p>
          </div>
        ))}
      </div>
    ),

    vision: (
      <div className="card" style={{padding: '4rem 3rem'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h3 style={{fontSize: '2.8rem', color: '#0d9488', marginBottom: '1rem'}}>
            Our Vision 2030
          </h3>
          <p style={{fontSize: '1.3rem', color: '#6b7280'}}>
            Becoming the global leader in AI-powered, industry-integrated education
          </p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem'}}>
          {[
            'AI & Quantum Computing Centers',
            'Global Campus Exchange Program',
            '100% Industry Placement Guarantee',
            'Metaverse Learning Environments',
            'Sustainability Innovation Hub'
          ].map((goal, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.5rem 2rem',
              background: 'rgba(13,148,136,0.05)',
              borderRadius: '20px',
              border: i === 2 ? '2px solid #0d9488' : '1px solid rgba(13,148,136,0.2)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: i === 2 ? '#0d9488' : 'rgba(13,148,136,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: i === 2 ? 'white' : '#0d9488'
              }}>
                {i + 1}
              </div>
              <span style={{fontSize: '1.1rem', fontWeight: i === 2 ? 700 : 500}}>
                {goal}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="container">
      {/* Clean Hero */}
      <section className="card" style={{textAlign: 'center', padding: '4rem 2rem', marginBottom: '4rem'}}>
        <h1 style={{color: 'var(--teal)', fontSize: '3rem', marginBottom: '1.5rem'}}>
          Welcome to CareerGuide
        </h1>
        <p style={{fontSize: '1.3rem', color: 'var(--gray-600)', maxWidth: '700px', margin: '0 auto 2.5rem'}}>
          Find your perfect career path with our smart tests and expert counseling
        </p>
        
        <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/career-test" className="btn" style={{padding: '16px 32px'}}>
            Take Career Test
          </Link>
          <Link to="/counseling" className="btn btn-secondary" style={{padding: '16px 32px'}}>
            Book Counseling
          </Link>
        </div>
        
        <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'inline-block'}}>
          <span style={{color: onlineStatus ? '#10b981' : '#ef4444', fontWeight: '600'}}>
            {onlineStatus ? ' Live - Ready to help!' : ' Offline'}
          </span>
        </div>
      </section>

      {/* Simple Stats Row */}
      <section style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
        <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
          <div style={{fontSize: '2.5rem', color: 'var(--teal)', marginBottom: '1rem'}}><img src="https://www.nicepng.com/png/full/121-1215004_graduation-icon-png-image-college-student-icon-png.png" width="70px"/></div>
          <div style={{fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)'}}>12,450+</div>
          <div style={{color: 'var(--gray-600)'}}>Students Guided</div>
        </div>
        <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
          <div style={{fontSize: '2.5rem', color: '#10b981', marginBottom: '1rem'}}><img src="https://png.pngtree.com/png-clipart/20230924/original/pngtree-silhouette-icon-of-graph-with-arrow-depicting-business-performance-on-bar-png-image_12675079.png" width="80px"/></div>
          <div style={{fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)'}}>92%</div>
          <div style={{color: 'var(--gray-600)'}}>Success Rate</div>
        </div>
        <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
          <div style={{fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem'}}><img src="https://cdn-icons-png.flaticon.com/512/67/67840.png" width="80px"/></div>
          <div style={{fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)'}}>250+</div>
          <div style={{color: 'var(--gray-600)'}}>Courses Listed</div>
        </div>
      </section>

      {/* COMPLETE AboutUs SECTION - Full Information */}
      <section className="card" style={{padding: '4rem 2rem', marginBottom: '4rem'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h2 style={{color: 'var(--teal)', fontSize: 'clamp(2.2rem, 6vw, 3rem)', marginBottom: '1rem'}}>
            About CareerGuide Institution
          </h2>
          <p style={{fontSize: '1.3rem', color: 'var(--gray-600)', maxWidth: '800px', margin: '0 auto'}}>
            Excellence in education since 1995 with world-class infrastructure and 95% placement record
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`btn ${activeTab === tab.id ? '' : 'btn-secondary'}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 28px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '50px',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, var(--teal), #10b981)' 
                  : 'rgba(13,148,136,0.08)',
                color: activeTab === tab.id ? 'white' : 'var(--teal)',
                border: activeTab === tab.id ? 'none' : '2px solid rgba(13,148,136,0.2)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{content[activeTab]}</div>
      </section>

      {/* Clean Courses Grid */}
      <section className="card" style={{padding: '3rem', marginBottom: '4rem'}}>
        <h2 style={{textAlign: 'center', color: 'var(--teal)', fontSize: '2.2rem', marginBottom: '2.5rem'}}>
          Popular Courses
        </h2>
        
        <div className="grid">
          {courses.map(course => (
            <div key={course.id} className="card" style={{padding: '2rem', transition: 'all 0.3s ease'}}>
              <div className="image-container" style={{marginBottom: '1.5rem', height: '160px'}}>
                <img 
                  src={course.image}
                  alt={course.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
              
              <h3 style={{fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--gray-900)'}}>
                {course.name}
              </h3>
              
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <div style={{color: 'var(--teal)', fontWeight: 600}}>
                  ⏱ {course.duration}
                </div>
                <div style={{color: '#fbbf24', fontSize: '1.2rem'}}>
                  {'★'.repeat(Math.floor(course.rating))}{'☆'.repeat(5 - Math.floor(course.rating))}
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, var(--teal), rgba(13,148,136,0.8))',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                textAlign: 'center',
                fontWeight: 700,
                marginBottom: '0.8rem',
                fontSize: '1rem'
              }}>
                {course.salary}
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                textAlign: 'center',
                fontWeight: 700,
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                Fee: {course.fee}
              </div>
              
              <Link to="/counseling" className="btn btn-full">
                Explore Course
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="card" style={{textAlign: 'center', padding: '4rem 2rem'}}>
        <h2 style={{color: 'var(--teal)', marginBottom: '1rem', fontSize: '2.5rem'}}>
          Ready to Get Started?
        </h2>
        <p style={{color: 'var(--gray-600)', fontSize: '1.3rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto'}}>
          Choose your next step toward your dream career with India's #1 career guidance platform
        </p>
        <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/career-test" className="btn" style={{padding: '18px 36px', fontSize: '1.1rem'}}>
            Take Career Test
          </Link>
          <Link to="/counseling" className="btn btn-secondary" style={{padding: '18px 36px', fontSize: '1.1rem'}}>
            Book Counseling
          </Link>
          <Link to="/career-paths" className="btn btn-secondary" style={{padding: '18px 36px', fontSize: '1.1rem'}}>
            Explore All Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
``