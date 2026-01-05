import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudyTips = () => {
  const [tips, setTips] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [activeTip, setActiveTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Study Tips - CareerGuide';
    
    const loadTips = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const allTips = [
        {
          id: 1,
          title: 'Daily Study Schedule',
          description: 'Create a fixed daily study schedule and stick to it consistently. Consistency beats intensity.',
          icon: 'https://cdn-icons-png.flaticon.com/512/133/133673.png',
          category: 'Planning'
        },
        {
          id: 2,
          title: 'Active Recall',
          description: 'Test yourself regularly instead of passive re-reading. This strengthens memory retention.',
          icon: 'https://cdn-icons-png.flaticon.com/512/1042/1042331.png',
          category: 'Memory'
        },
        {
          id: 3,
          title: 'Pomodoro Technique',
          description: 'Study 25 minutes, break 5 minutes. Repeat 4 times then take 15-30 minute break.',
          icon: 'https://cdn-icons-png.flaticon.com/512/4643/4643084.png',
          category: 'Productivity'
        },
        {
          id: 4,
          title: 'Previous Year Papers',
          description: 'Practice last 10 years question papers. Understand exam pattern and time management.',
          icon: 'https://cdn-icons-png.flaticon.com/512/3522/3522698.png',
          category: 'Practice'
        },
        {
          id: 5,
          title: 'Teach to Learn',
          description: 'Explain concepts to friends or family. Teaching reveals gaps in your understanding.',
          icon: 'https://cdn-icons-png.flaticon.com/512/3079/3079329.png',
          category: 'Understanding'
        },
        {
          id: 6,
          title: 'Hydration & Sleep',
          description: 'Drink 3L water daily. Sleep 7-8 hours. Brain needs water and rest to function optimally.',
          icon: 'https://cdn-icons-png.flaticon.com/512/1146/11468568.png',
          category: 'Health'
        },
        {
          id: 7,
          title: 'Mind Maps',
          description: 'Create visual mind maps connecting concepts. Great for visual learners and revision.',
          icon: 'https://cdn-icons-png.flaticon.com/512/573/573686.png',
          category: 'Visual'
        },
        {
          id: 8,
          title: 'SMART Goals',
          description: 'Set Specific, Measurable, Achievable, Relevant, Time-bound goals for every study session.',
          icon: 'https://cdn-icons-png.flaticon.com/512/5380/5380027.png',
          category: 'Goals'
        },
        {
          id: 9,
          title: 'No Phone Zone',
          description: 'Turn off notifications during study. Phone distractions reduce retention by 40%.',
          icon: 'https://cdn-icons-png.flaticon.com/512/2276/2276878.png',
          category: 'Focus'
        },
        {
          id: 10,
          title: 'Spaced Repetition',
          description: 'Review material at increasing intervals: Day 1, 3, 7, 14, 30 for permanent retention.',
          icon: 'https://cdn-icons-png.flaticon.com/512/484/484662.png',
          category: 'Retention'
        }
      ];
      
      setTips(allTips);
      setLoading(false);
    };

    loadTips();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading" style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <div className="spinner" style={{width: '60px', height: '60px', margin: '0 auto 2rem'}}></div>
            <div style={{fontSize: '1.2rem', color: 'var(--gray-600)'}}>Loading study strategies...</div>
          </div>
        </div>
      </div>
    );
  }

  const visibleTips = showMore ? tips : tips.slice(0, 5);

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="card" style={{textAlign: 'center', padding: '4rem 2rem', marginBottom: '4rem'}}>
        <h1 style={{color: 'var(--teal)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1rem'}}>
          Master Your Study Game
        </h1>
        <p style={{fontSize: '1.3rem', color: 'var(--gray-600)', maxWidth: '700px', margin: '0 auto 3rem'}}>
          Proven techniques used by IIT toppers, NEET rankers, and exam champions
        </p>
        <div style={{
          background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(13,148,136,0.2)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <img 
            src="https://romebusinessschool.com/wp-content/uploads/2023/10/adwefdgv.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Student studying"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: '280px',
              objectFit: 'cover',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </section>

      {/* Tips Grid */}
      <section className="card" style={{padding: '3rem 2rem'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h2 style={{color: 'var(--teal)', fontSize: '2.5rem', marginBottom: '1rem'}}>
            Top 10 Study Strategies
          </h2>
          <p style={{color: 'var(--gray-600)', fontSize: '1.2rem'}}>
            {showMore ? 'All 10 techniques unlocked' : 'Showing top 5 of 10 techniques'}
          </p>
        </div>

        <div className="grid" style={{gap: '2rem'}}>
          {visibleTips.map((tip) => (
            <div 
              key={tip.id}
              className="card"
              style={{
                padding: '2.5rem 2rem',
                transition: 'all 0.3s ease',
                borderRadius: '24px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: activeTip === tip.id ? '0 25px 50px rgba(13,148,136,0.2)' : '0 20px 40px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={() => setActiveTip(tip.id)}
              onMouseLeave={() => setActiveTip(null)}
            >
              {/* Icon & Category */}
              <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem'}}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(13,148,136,0.3)'
                }}>
                  <img 
                    src={tip.icon} 
                    alt={tip.title}
                    style={{width: '32px', height: '32px'}}
                  />
                </div>
                <div>
                  <div style={{
                    background: `rgba(13,148,136,0.1)`,
                    color: 'var(--teal)',
                    padding: '0.3rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'inline-block'
                  }}>
                    {tip.category}
                  </div>
                </div>
              </div>

              {/* Tip Content */}
              <h3 style={{
                fontSize: '1.6rem',
                color: 'var(--gray-900)',
                marginBottom: '1rem',
                fontWeight: 800
              }}>
                {tip.title}
              </h3>
              
              <p style={{
                color: 'var(--gray-700)',
                lineHeight: 1.6,
                fontSize: '1.1rem',
                marginBottom: '2rem'
              }}>
                {tip.description}
              </p>

              {/* Quick Stats */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem',
                background: 'rgba(13,148,136,0.05)',
                borderRadius: '16px',
                marginBottom: '1.5rem'
              }}>
                <div style={{fontSize: '0.95rem', color: 'var(--gray-600)'}}>
                  Used by IIT/NEET toppers
                </div>
                <div style={{
                  background: 'var(--teal)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  #1 Technique
                </div>
              </div>

              <Link 
                to="/counseling" 
                className="btn btn-full"
                style={{
                  fontWeight: 600,
                  padding: '16px 24px'
                }}
              >
                Get Personalized Plan
              </Link>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {tips.length > 5 && (
          <div style={{textAlign: 'center', marginTop: '4rem'}}>
            <button 
              className="btn" 
              onClick={() => setShowMore(!showMore)}
              style={{
                padding: '18px 40px',
                fontSize: '1.1rem',
                background: showMore ? '#6b7280' : 'var(--teal)',
                border: 'none'
              }}
            >
              {showMore ? 'Show Less ' : 'Show All 10 Tips'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudyTips;
