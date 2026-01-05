import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentForms, setRecentForms] = useState([]);

  useEffect(() => {
    document.title = 'Admin Dashboard';
    
    setStats({
      totalStudents: 1245,
      pendingRequests: 23,
      totalSessions: 156,
      coursesListed: 45
    });

    const savedForms = localStorage.getItem('counselingSubmissions');
    if (savedForms) {
      const allForms = JSON.parse(savedForms);
      setRecentForms(allForms.slice(0, 5));
    }
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Dashboard</h1>
        
        <div className="grid">
          <div className="card">
            <h2 style={{color: '#1e3c72'}}>{stats.totalStudents}</h2>
            <p>Total Students</p>
          </div>
          <div className="card">
            <h2 style={{color: '#f59e0b'}}>{stats.pendingRequests}</h2>
            <p>Pending Requests</p>
          </div>
          <div className="card">
            <h2 style={{color: '#10b981'}}>{stats.totalSessions}</h2>
            <p>Total Sessions</p>
          </div>
          <div className="card">
            <h2 style={{color: '#3b82f6'}}>{stats.coursesListed}</h2>
            <p>Courses Listed</p>
          </div>
        </div>

        <div style={{marginTop: '3rem'}}>
          <h3>Recent Counseling Requests</h3>
          <div className="grid">
            {recentForms.map(form => (
              <div key={form.id} className="card">
                <h4>{form.name}</h4>
                <p>{form.email} | {form.phone}</p>
                <p><strong>Course:</strong> {form.course}</p>
                <p><small>{form.date}</small></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
