import { useState, useEffect } from 'react';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    document.title = 'My Sessions';
    
    // Demo sessions
    setSessions([
      {
        id: 1,
        title: 'Career Counseling - B.Tech CS',
        date: '2025-01-15',
        time: '03:00 PM',
        status: 'Upcoming',
        counselor: 'Dr. Rajesh Kumar'
      },
      {
        id: 2,
        title: 'Aptitude Test Review',
        date: '2025-01-10',
        time: '11:00 AM',
        status: 'Completed',
        counselor: 'Ms. Priya Sharma'
      },
      {
        id: 3,
        title: 'Course Selection Guidance',
        date: '2025-01-05',
        time: '02:30 PM',
        status: 'Completed',
        counselor: 'Prof. Anil Gupta'
      }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>My Counseling Sessions</h1>
        
        <div className="grid">
          {sessions.map(session => (
            <div key={session.id} className="card">
              <h3>{session.title}</h3>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Counselor:</strong> {session.counselor}</p>
              <span style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                background: session.status === 'Upcoming' ? '#fef3c7' : '#d1fae5',
                color: session.status === 'Upcoming' ? '#92400e' : '#065f46'
              }}>
                {session.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
