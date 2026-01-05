import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    document.title = 'Student Dashboard';
    
    // Load user data from localStorage
    const userProfile = localStorage.getItem('studentProfile');
    if (userProfile) {
      setUserData(JSON.parse(userProfile));
    }

    // Demo stats
    setStats({
      sessionsBooked: 3,
      testsCompleted: 2,
      recommendations: 5
    });
  }, []);

  const updateProfile = (field, value) => {
    const newData = { ...userData, [field]: value };
    setUserData(newData);
    localStorage.setItem('studentProfile', JSON.stringify(newData));
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Student Dashboard</h1>
        
        {userData ? (
          <div>
            <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
              <div style={{flex: 1, minWidth: '300px'}}>
                <h3>Profile</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={userData.name || ''}
                    onChange={(e) => updateProfile('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userData.email || ''}
                    onChange={(e) => updateProfile('email', e.target.value)}
                  />
                </div>
              </div>
              
              <div style={{flex: 1, minWidth: '300px'}}>
                <h3>Quick Stats</h3>
                <div className="grid">
                  <div className="card">
                    <h4>{stats.sessionsBooked}</h4>
                    <p>Sessions Booked</p>
                  </div>
                  <div className="card">
                    <h4>{stats.testsCompleted}</h4>
                    <p>Tests Completed</p>
                  </div>
                  <div className="card">
                    <h4>{stats.recommendations}</h4>
                    <p>Career Matches</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid" style={{marginTop: '2rem'}}>
              <Link to="/my-sessions" className="card" style={{textDecoration: 'none'}}>
                <h3>My Sessions</h3>
                <p>View upcoming and past counseling sessions</p>
              </Link>
              <Link to="/career-test" className="card" style={{textDecoration: 'none'}}>
                <h3>Take Career Test</h3>
                <p>Discover your perfect career path</p>
              </Link>
              <Link to="/counseling" className="card" style={{textDecoration: 'none'}}>
                <h3>Book New Session</h3>
                <p>Schedule counseling with experts</p>
              </Link>
            </div>
          </div>
        ) : (
          <p>Welcome! Please complete your profile.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
