import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

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
          fee: '₹4-12L',  // ADDED
          image: 'https://cdni.iconscout.com/illustration/premium/thumb/online-science-class-illustration-svg-download-png-10851608.png'
        },
        { 
          id: 2, 
          name: 'MBA Marketing', 
          duration: '2 years', 
          rating: 4.6,
          salary: '₹8-18LPA',
          fee: '₹10-25L',  // ADDED
          image: 'https://cdni.iconscout.com/illustration/premium/thumb/business-partner-illustration-svg-download-png-4778112.png'
        },
        { 
          id: 3, 
          name: 'B.Sc Data Science', 
          duration: '3 years', 
          rating: 4.9,
          salary: '₹15-30LPA',
          fee: '₹3-8L',  // ADDED
          image: 'https://static.vecteezy.com/system/resources/thumbnails/000/146/161/small/free-data-science-vector-illustrations.jpg'
        },
        { 
          id: 4, 
          name: 'BA Psychology', 
          duration: '3 years', 
          rating: 4.7,
          salary: '₹6-15LPA',
          fee: '₹2-6L',  // ADDED
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

      {/* Clean Courses Grid */}
      <section className="card" style={{padding: '3rem'}}>
        <h2 style={{textAlign: 'center', color: 'var(--teal)', fontSize: '2.2rem', marginBottom: '2.5rem'}}>
          Popular Courses
        </h2>
        
        <div className="grid">
          {courses.map(course => (
            <div key={course.id} className="card" style={{padding: '2rem', transition: 'all 0.3s ease'}}>
              {/* Course Image */}
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
              
              {/* Info Row */}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <div style={{color: 'var(--teal)', fontWeight: 600}}>
                  ⏱ {course.duration}
                </div>
                <div style={{color: '#fbbf24', fontSize: '1.2rem'}}>
                  {'★'.repeat(Math.floor(course.rating))}{'☆'.repeat(5 - Math.floor(course.rating))}
                </div>
              </div>
              
              {/* Salary Badge */}
              <div style={{
                background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                textAlign: 'center',
                fontWeight: 700,
                marginBottom: '0.8rem',
                fontSize: '1rem'
              }}>
              </div>

              {/* FEE BADGE - ONLY ADDITION */}
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
            Salary:  {course.fee}
              </div>
              
              <Link to="/counseling" className="btn btn-full">
                Explore Course
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="card" style={{textAlign: 'center', padding: '3rem', marginTop: '4rem'}}>
        <h2 style={{color: 'var(--teal)', marginBottom: '1rem'}}>
          Ready to Get Started?
        </h2>
        <p style={{color: 'var(--gray-600)', fontSize: '1.2rem', marginBottom: '2rem'}}>
          Choose your next step toward your dream career
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/career-test" className="btn"> Career Test</Link>
          <Link to="/counseling" className="btn btn-secondary"> Counseling</Link>
          <Link to="/career-paths" className="btn btn-secondary"> All Courses</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
