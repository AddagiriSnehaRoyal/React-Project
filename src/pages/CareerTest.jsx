import { useState } from 'react';

const CareerTest = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which activity do you enjoy the most?",
      options: [
        "Solving logical or technical problems",
        "Creating designs, art, or content", 
        "Helping and guiding people",
        "Planning, organizing, and leading tasks"
      ]
    },
    {
      id: 2,
      question: "Which subject do you like the most?",
      options: [
        "Mathematics or Computer Science",
        "Art, Design, or Literature",
        "Biology or Psychology",
        "Business or Economics"
      ]
    },
    {
      id: 3,
      question: "In a group project, what role do you naturally take?",
      options: [
        "Building and creating software",
        "Analyzing data and finding patterns",
        "Designing user experiences",
        "Managing projects and teams"
      ]
    },
    {
      id: 4,
      question: "How do you usually solve problems?",
      options: [
        "By logically breaking them down",
        "By thinking creatively and innovatively",
        "By discussing with others",
        "By making quick decisions and acting"
      ]
    },
    {
      id: 5,
      question: "What type of work environment do you prefer?",
      options: [
        "Quiet and focused",
        "Flexible and creative",
        "Collaborative and people-oriented",
        "Fast-paced and competitive"
      ]
    },
    {
      id: 6,
      question: "What motivates you the most in a career?",
      options: [
        "Solving complex challenges",
        "Expressing creativity",
        "Helping others succeed",
        "Leadership and achievement"
      ]
    },
    {
      id: 7,
      question: "Which skill best describes you?",
      options: [
        "Logical thinking",
        "Creativity and imagination",
        "Communication and empathy",
        "Decision-making and leadership"
      ]
    },
    {
      id: 8,
      question: "How do you prefer to learn new things?",
      options: [
        "Step-by-step with clear logic",
        "Hands-on experimentation",
        "Through discussion and examples",
        "With goals and deadlines"
      ]
    },
    {
      id: 9,
      question: "Which career option sounds most exciting?",
      options: [
        "Software Developer / Engineer",
        "UI/UX Designer or Content Creator",
        "Teacher, Counselor, or Healthcare Professional",
        "Manager or Entrepreneur"
      ]
    },
    {
      id: 10,
      question: "Your ideal job would allow you to:",
      options: [
        "Work on technical challenges",
        "Create and innovate freely",
        "Make a positive impact on people",
        "Lead teams and drive results"
      ]
    }
  ];

  const calculateResult = () => {
    // Improved scoring logic for 10 questions
    const scores = { 
      tech: 0,      // index 0
      creative: 0,  // index 1  
      people: 0,    // index 2
      leadership: 0 // index 3
    };
    
    Object.values(answers).forEach(answerIndex => {
      if (answerIndex === 0) scores.tech++;
      else if (answerIndex === 1) scores.creative++;
      else if (answerIndex === 2) scores.people++;
      else scores.leadership++;
    });

    const maxScore = Math.max(...Object.values(scores));
    const bestFit = Object.keys(scores).find(key => scores[key] === maxScore);

    const careers = {
      tech: " Software Engineering / Full Stack Development",
      creative: " UI/UX Design / Product Design / Digital Marketing",
      people: " Healthcare / Psychology / Teaching / Counseling",
      leadership: " Business Management / Entrepreneurship / Product Management"
    };

    return {
      career: careers[bestFit],
      score: maxScore,
      type: bestFit
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions answered
    if (Object.keys(answers).length !== 10) {
      alert('Please answer all 10 questions for accurate results!');
      return;
    }

    setLoading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const finalResult = calculateResult();
    setResult(finalResult);
    setLoading(false);
    
    // Save to localStorage
    localStorage.setItem('latestCareerTest', JSON.stringify({
      result: finalResult,
      date: new Date().toLocaleDateString(),
      answers
    }));
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const progressPercentage = (Object.keys(answers).length / 10) * 100;

  return (
    <div className="container">
      <div className="card">
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1>Career Aptitude Test</h1>
          <p style={{color: 'var(--gray-600)', fontSize: '18px'}}>
            Answer all 10 questions to discover your perfect career
          </p>
          
          {/* Progress Bar */}
          <div style={{
            background: 'var(--gray-200)',
            height: '8px',
            borderRadius: '4px',
            margin: '24px 0',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, var(--teal), var(--teal-light))',
              height: '100%',
              width: `${progressPercentage}%`,
              transition: 'width 0.3s ease',
              borderRadius: '4px'
            }}></div>
          </div>
          <div style={{color: 'var(--gray-600)', fontSize: '14px'}}>
            {Object.keys(answers).length}/10 questions answered
          </div>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit}>
            {questions.map(q => (
              <div key={q.id} className="form-group">
                <label style={{
                  fontWeight: '700', 
                  marginBottom: '20px', 
                  display: 'block',
                  fontSize: '18px',
                  color: 'var(--gray-900)'
                }}>
                  Q{q.id}. {q.question}
                </label>
                
                <div style={{display: 'grid', gap: '16px'}}>
                  {q.options.map((option, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: `2px solid ${answers[q.id] === index ? 'var(--teal)' : 'var(--gray-200)'}`,
                        background: answers[q.id] === index ? 'rgba(13,148,136,0.1)' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '16px'
                      }}
                      onClick={() => handleAnswer(q.id, index)}
                    >
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={index}
                        checked={answers[q.id] === index}
                        onChange={() => handleAnswer(q.id, index)}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '16px',
                          accentColor: 'var(--teal)'
                        }}
                      />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <button 
              type="submit" 
              className="btn btn-full"
              disabled={Object.keys(answers).length !== 10 || loading}
              style={{
                fontSize: '18px',
                padding: '20px',
                marginTop: '20px'
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{width: '24px', height: '24px', marginRight: '12px', borderWidth: '2px'}}></div>
                  Analyzing your career profile...
                </>
              ) : (
                ' Get My Personalized Career Results'
              )}
            </button>
          </form>
        ) : (
          <div style={{textAlign: 'center'}}>
            <div style={{
              background: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
              color: 'white',
              padding: '4rem 2rem',
              borderRadius: '20px',
              margin: '2rem 0',
              boxShadow: '0 25px 50px -12px rgba(13,148,136,0.4)'
            }}>
              <div style={{fontSize: '4rem', marginBottom: '1.5rem'}}><img src="https://png.pngtree.com/png-vector/20220729/ourmid/pngtree-champion-award-medal-icon-png-image_6091841.png" width="120px"/></div>
              <h2 style={{fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800'}}>
                Perfect Match Found!
              </h2>
              <h3 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>
                {result.career}
              </h3>
              <div style={{
                background: 'rgba(255,255,255,0.3)',
                padding: '1rem 2rem',
                borderRadius: '12px',
                display: 'inline-block',
                backdropFilter: 'blur(10px)'
              }}>
                <strong>Confidence Score:</strong> {Math.round((result.score / 10) * 100)}%
              </div>
            </div>

            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button 
                className="btn" 
                style={{padding: '16px 32px'}}
                onClick={() => {
                  localStorage.setItem('careerRecommendation', JSON.stringify(result));
                  alert(' Result saved to your profile!');
                }}
              >
                 Save to Profile
              </button>
              <button 
                className="btn btn-secondary"
                style={{padding: '16px 32px'}}
                onClick={() => {setResult(null); setAnswers({});}}
              >
                 Retake Test
              </button>
            </div>

            <div style={{marginTop: '40px', textAlign: 'left', maxWidth: '600px', margin: '40px auto 0'}}>
              <h4 style={{marginBottom: '16px', color: 'var(--teal)', textAlign: 'center'}}>
                Next Steps:
              </h4>
              <ul className="bullet-list" style={{textAlign: 'left'}}>
                <li>Book a counseling session to explore this career</li>
                <li>Check recommended courses and colleges</li>
                <li>Review your detailed career report</li>
                <li>Connect with professionals in this field</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTest;
