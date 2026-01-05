import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CareerPaths = () => {
  const [careerPaths, setCareerPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Career Paths - CareerGuide';
    
    const loadCareerPaths = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCareerPaths([
        { 
          id: 1, 
          title: 'Engineering', 
          salary: '₹12-25L', 
          demand: 'Very High',
          image: 'https://png.pngtree.com/thumb_back/fh260/background/20240717/pngtree-web-design-homepage-concept-on-computer-display-with-copy-space-beside-image_15879675.jpg?w=400&fit=crop',
          skills: ['Python', 'JavaScript', 'React', 'AWS'],
          growth: '25%'
        },
        { 
          id: 2, 
          title: 'Data Science', 
          salary: '₹15-30L', 
          demand: 'High',
          image: 'https://plus.unsplash.com/premium_photo-1664297950425-99a968926a74?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D?w=400&fit=crop',
          skills: ['Python', 'Machine Learning', 'SQL', 'Power BI'],
          growth: '35%'
        },
        { 
          id: 3, 
          title: 'Digital Marketing', 
          salary: '₹6-15L', 
          demand: 'High',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&fit=crop',
          skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
          growth: '20%'
        },
        { 
          id: 4, 
          title: 'Cybersecurity', 
          salary: '₹10-22L', 
          demand: 'Very High',
          image: 'https://img.freepik.com/premium-vector/cyber-security-theme_23-2148543866.jpg?w=400&fit=crop',
          skills: ['Ethical Hacking', 'Network Security', 'SIEM', 'CISSP'],
          growth: '30%'
        },
        { 
          id: 5, 
          title: 'Product Manager', 
          salary: '₹18-35L', 
          demand: 'Medium',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&fit=crop',
          skills: ['Agile', 'UX Research', 'Roadmapping', 'Jira', 'communication', 'leadership'],
          growth: '22%'
        }
      ]);
      setLoading(false);
    };

    loadCareerPaths();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading" style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <div className="spinner" style={{width: '60px', height: '60px', margin: '0 auto 2rem'}}></div>
            <div style={{fontSize: '1.2rem', color: 'var(--gray-600)'}}>Loading career opportunities...</div>
          </div>
        </div>
      </div>
    );
  }

  const getDemandColor = (demand) => {
    const colors = {
      'Very High': '#10b981',
      'High': '#059669', 
      'Medium': '#f59e0b',
      'Low': '#6b7280'
    };
    return colors[demand] || '#6b7280';
  };

  return (
    <div className="container">
      {/* Hero Header */}
      <section className="card" style={{textAlign: 'center', padding: '4rem 2rem', marginBottom: '4rem'}}>
        <h1 style={{color: 'var(--teal)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1rem'}}>
          Explore Top Career Paths
        </h1>
        <p style={{fontSize: '1.3rem', color: 'var(--gray-600)', maxWidth: '700px', margin: '0 auto 3rem'}}>
          Discover trending careers with real salary data, market demand, and essential skills
        </p>
        <Link to="/counseling" className="btn" style={{padding: '18px 40px', fontSize: '1.1rem'}}>
          Get Expert Counseling
        </Link>
      </section>

      {/* Career Cards Grid */}
      <section className="card" style={{padding: '3rem 2rem'}}>
        <div className="grid" style={{gap: '2.5rem'}}>
          {careerPaths.map((path) => (
            <div 
              key={path.id} 
              className="card" 
              style={{
                padding: '0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden'
              }}
            >
              {/* Career Image */}
              <div style={{
                height: '220px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={path.image}
                  alt={path.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.95)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontWeight: 700,
                  color: getDemandColor(path.demand),
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {path.demand} Demand
                </div>
              </div>

              {/* Content */}
              <div style={{padding: '2.5rem 2rem'}}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: 'var(--gray-900)',
                  margin: '0 0 1rem 0',
                  fontWeight: 800,
                  lineHeight: 1.3
                }}>
                  {path.title}
                </h3>
                
                <div style={{
                  color: getDemandColor(path.demand),
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  Annual Job Growth: {path.growth}
                </div>

                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, var(--teal), rgba(13,148,136,0.8))',
                    color: 'white',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem'}}>
                      {path.salary}
                    </div>
                    <div style={{fontSize: '0.85rem', opacity: 0.95}}>Avg Salary</div>
                  </div>
                  
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, rgba(16,185,129,0.8))',
                    color: 'white',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem'}}>
                      {path.growth}
                    </div>
                    <div style={{fontSize: '0.85rem', opacity: 0.95}}>Growth Rate</div>
                  </div>
                </div>

                {/* Skills */}
                <div style={{marginBottom: '2.5rem'}}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--gray-900)',
                    marginBottom: '1rem'
                  }}>
                    Required Skills
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem'}}>
                    {path.skills.map((skill, index) => (
                      <span 
                        key={index}
                        style={{
                          background: 'rgba(13,148,136,0.1)',
                          color: 'var(--teal)',
                          padding: '0.5rem 1.25rem',
                          borderRadius: '25px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          border: '1px solid rgba(13,148,136,0.2)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                  <Link 
                    to="/counseling" 
                    className="btn" 
                    style={{
                      flex: 1,
                      padding: '16px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, var(--teal), var(--teal-light))'
                    }}
                  >
                    Book Counseling
                  </Link>
                  <a 
                    href="https://www.lpu.in/blog/best-career-options-after-12th-top-career-choices-opportunities/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary" 
                    style={{
                      flex: 1,
                      padding: '16px',
                      fontSize: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerPaths;
